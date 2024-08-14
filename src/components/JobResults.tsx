import React from "react";
import JobList from "./JobList";
import prisma from "@/lib/prisma";
import { JobFilterType } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import JobNotFound from "./JobNotFound";
import PaginationComponent from "./Pagination";
import Link from "next/link";

interface Props {
  filterValues: JobFilterType;
  page?: number;
}

const JobResults = async ({ filterValues, page = 1 }: Props) => {
  const { query, type, location, remote } = filterValues;
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  // Populate the count for pagination
  const countPromise = prisma.job.count({ where });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="flex grow flex-col gap-2">
      {jobs?.map((job) => (
        <Link key={job.id} href={`/jobs/${job?.slug}`} passHref legacyBehavior>
          <a target="_blank">
            <JobList job={job} />
          </a>
        </Link>
      ))}
      {jobs.length === 0 && <JobNotFound />}
      {
        /* Pagination goes here */
        jobs.length > 0 && (
          <PaginationComponent
            currentPage={page}
            totalPages={Math.ceil(count / jobsPerPage)}
            filterValues={filterValues}
          />
        )
      }
    </div>
  );
};

export default JobResults;

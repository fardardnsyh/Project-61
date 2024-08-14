import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { JobFilterType } from "@/lib/validation";
import { Metadata } from "next";
import React from "react";

interface Props {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ query, type, location, remote }: JobFilterType) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? "Remote jobs"
        : "Available jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { query, type, location, remote },
}: Props): Metadata {
  return {
    title: `${getTitle({
      query,
      type,
      location,
      remote: remote === "true",
    })} | Jobify`,
  };
}

export default async function Home({
  searchParams: { query, type, location, remote, page },
}: Props) {
  const filterValues: JobFilterType = {
    query,
    type,
    location,
    remote: remote === "true" ? true : false,
  };
  return (
    <main className="my-10 space-y-10 px-2 md:px-20 w-full">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {query || location || type || remote
            ? getTitle(filterValues)
            : "Discover Your Next Career Move"}
        </h1>
        <p className="text-muted-foreground">
          Explore a world of opportunities. <br /> Find the perfect fit for your
          skills and aspirations with our curated selection of job listings.
        </p>
      </div>
      <section className="flex w-full flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}

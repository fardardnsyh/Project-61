import JobList from "@/components/JobList";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
        Admin Dashboard
      </h1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unapprovedJobs?.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
            <JobList job={job} />
          </Link>
        ))}
        {unapprovedJobs?.length === 0 && (
          <p className="text-muted-foreground text-center mt-2">No unapproved jobs found.</p>
        )}
      </section>
    </main>
  );
}

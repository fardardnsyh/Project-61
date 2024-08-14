import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cities } from "@/lib/cities-list";
import { jobTypes } from "@/lib/job-types";
import Select from "./ui/select";
import { JobFilterType, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";

interface Props {
  defaultValues: JobFilterType;
}

//Server action to handle form submission. Redirects the user to the filtered jobs page with query params for filtering.
async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { query, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

const JobFilterSidebar = ({ defaultValues }: Props) => {
  return (
    <aside className="top-24 h-fit rounded-lg border bg-background p-4 md:sticky md:w-[260px]">
      {/* passing key to rerender form and reset default values on url change otherwise it persists the default values*/}
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input
              name="query"
              id="query"
              defaultValue={defaultValues?.query}
              placeholder="Job title, Company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues?.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues?.location || ""}
            >
              <option value="">All locations</option>
              {cities?.map((city, i) => (
                <option
                  key={i}
                  value={`${city.name}, ${city.state}, ${city.country}`}
                >
                  {city.name}, {city.state}, {city.country}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              defaultChecked={defaultValues?.remote}
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <SubmitButton className="w-full">Filter Jobs</SubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;

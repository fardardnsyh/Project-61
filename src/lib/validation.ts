import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredField = z.string().min(1, "Required");

const numericRequiredField = requiredField.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "File must be an image")
  .refine((file) => {
    return !file || file.size < 1024 * 1024;
  }, "File size must be less than 1MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().email().optional().or(z.literal("")),
    applicationUrl: z.string().url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Either email or application URL is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredField.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) => {
      return (
        !data.locationType || data.locationType === "remote" || data.location
      );
    },
    {
      message: "Location is required",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredField.max(100),
    type: requiredField.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    experience: z.string().max(100),
    companyName: requiredField.max(100),
    companyLogoUrl: companyLogoSchema,
    description: z.string().max(3000),
    salary: numericRequiredField.max(9, "Salary can't be more than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export const jobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterType = z.infer<typeof jobFilterSchema>;
export type CreateJobType = z.infer<typeof createJobSchema>;

"use server";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogoUrl,
    experience,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogo: string | undefined = undefined;

  if (companyLogoUrl) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogoUrl.name)}`,
      companyLogoUrl,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogo = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl: companyLogo,
      experience,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: false,
    },
  });

  redirect("/job-submitted");
}

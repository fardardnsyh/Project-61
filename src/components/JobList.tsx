"use client";
import { Job } from "@prisma/client";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import companyLogoPlaceholderLight from "@/assets/company-logo-placeholder-light.png";
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  Layers3,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { formatSalary, relativeDate } from "@/lib/utils";
import Badge from "./Badge";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  job: Job;
}

const JobList = ({
  job: {
    title,
    description,
    slug,
    type,
    companyName,
    location,
    locationType,
    salary,
    experience,
    companyLogoUrl,
    applicationEmail,
    applicationUrl,
    approved,
    createdAt,
    updatedAt,
  },
}: Props) => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    // Determine the current theme based on the system theme and user-selected theme
    setCurrentTheme((theme === "system" ? systemTheme : theme) as string);
  }, [systemTheme, theme]);

  // Define the image source based on the theme mode
  const imageSrc =
    currentTheme === "dark"
      ? companyLogoPlaceholderLight
      : companyLogoPlaceholder;

  return (
    <article className="flex cursor-pointer gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || imageSrc}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Layers3 size={16} className="shrink-0" />
            {experience ?? "Experience NA"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatSalary(salary)}
          </p>
          <p className="flex items-center gap-1.5 text-sm sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(updatedAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={16} />
          {relativeDate(updatedAt)}
        </span>
      </div>
    </article>
  );
};

export default JobList;

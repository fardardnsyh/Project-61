"use client";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import companyLogoPlaceholderLight from "@/assets/company-logo-placeholder-light.png";
import { useTheme } from "next-themes";

interface Props {}

const JobNotFound = (props: Props) => {
  const { theme, systemTheme } = useTheme();
  // Determine the current theme based on the system theme and user-selected theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  // Define the image source based on the theme mode
  const imageSrc =
    currentTheme === "dark"
      ? companyLogoPlaceholderLight
      : companyLogoPlaceholder;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Image
        src={imageSrc}
        alt={`logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-semibold text-foreground">
          No jobs found!
        </h3>
        <p className="text-sm text-muted-foreground">
          Try refining your search criteria.
        </p>
      </div>
    </div>
  );
};

export default JobNotFound;

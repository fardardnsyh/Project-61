import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(salary: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(salary);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

// create slug from title and replace whitespace with hyphen and remove special characters from string
export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}
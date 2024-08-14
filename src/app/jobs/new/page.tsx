import CreateNewJobForm from "@/components/CreateNewJobForm";
import { Metadata } from "next";
import React from "react";

interface Props {}

export const metadata: Metadata = {
  title: "Post New Job",
  description: "Create a new job",
};

const Page = (props: Props) => {
  return <CreateNewJobForm />;
};

export default Page;

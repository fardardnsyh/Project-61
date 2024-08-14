"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

const SubmitButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return <LoadingButton {...props} type="submit" loading={pending} />;
};

export default SubmitButton;

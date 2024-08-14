"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {}

const error = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-grow items-center justify-center">
      <div className="flex flex-col gap-8 rounded-lg bg-background p-8 text-center shadow-xl">
        <p className="text-primary">Oops! Something bad happened.</p>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default error;

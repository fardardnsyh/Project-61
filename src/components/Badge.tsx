import React from "react";

interface Props {
  children: React.ReactNode;
}

const Badge = ({ children }: Props) => {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
};

export default Badge;

"use client";

import { JobFilterType } from "@/lib/validation";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterType;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  filterValues: { query, type, location, remote },
}: Props) => {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  };

  // Determine the number of pagination links to show based on screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  
  return (
    totalPages > 1 && (
      <Pagination className="overflow-hidden pt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={generatePageLink(currentPage - 1)}
              className={`${currentPage === 1 ? "pointer-events-none" : ""}`}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => {
              if (isMobile) {
                if (page === 1 || page === totalPages || page === currentPage)
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={generatePageLink(page)}
                        isActive={currentPage === page}
                        className={`${
                          currentPage === page ? "pointer-events-none" : ""
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
              } else {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={generatePageLink(page)}
                      isActive={currentPage === page}
                      className={`${
                        currentPage === page ? "pointer-events-none" : ""
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            },
          )}
          <PaginationItem>
            <PaginationNext
              href={generatePageLink(currentPage + 1)}
              className={`${
                currentPage === totalPages ? "pointer-events-none" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
};

export default PaginationComponent;

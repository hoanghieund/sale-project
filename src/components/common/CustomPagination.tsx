// src/components/common/CustomPagination.tsx

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

/**
 * @interface CustomPaginationProps
 * @description Defines the props for the CustomPagination component.
 */
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * @component CustomPagination
 * @description Reusable pagination component for the entire application.
 * @param {CustomPaginationProps} props - The component's props.
 * @returns {JSX.Element | null} JSX element of the CustomPagination component or null if no pagination.
 */
const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // If there is only 1 page or no page, do not display pagination
  if (totalPages <= 1) {
    return null;
  }

  // Function to create pagination items based on total pages and current page
  const renderPaginationItems = () => {
    const items = [];
    // Add Previous button
    items.push(
      <PaginationItem key="previous">
        <PaginationPrevious
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );

    // Logic to display page number buttons
    if (totalPages <= 7) {
      // Display all pages if total pages are less than or equal to 7
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Logic to display pages with ellipses if total pages are greater than 7
      // Always display page 1
      items.push(
        <PaginationItem key="page-1">
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Display ellipsis if current page is greater than 3
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      // Display 2 pages around the current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 3;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Display ellipsis if current page is less than totalPages - 2
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      // Always display the last page
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Pagination>
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;

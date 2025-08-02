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
 * @description Định nghĩa các props cho component CustomPagination.
 */
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * @component CustomPagination
 * @description Component phân trang tái sử dụng cho toàn bộ ứng dụng.
 * @param {CustomPaginationProps} props - Các props của component.
 * @returns {JSX.Element | null} Element JSX của component CustomPagination hoặc null nếu không có phân trang.
 */
const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Nếu chỉ có 1 trang hoặc không có trang nào, không hiển thị phân trang
  if (totalPages <= 1) {
    return null;
  }

  // Hàm tạo các mục phân trang dựa trên tổng số trang và trang hiện tại
  const renderPaginationItems = () => {
    const items = [];
    // Thêm nút Previous
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

    // Logic hiển thị các nút số trang
    if (totalPages <= 7) {
      // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng 7
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
      // Logic hiển thị các trang với dấu ba chấm nếu tổng số trang lớn hơn 7
      // Luôn hiển thị trang 1
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

      // Hiển thị dấu ba chấm nếu trang hiện tại lớn hơn 3
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      // Hiển thị 2 trang xung quanh trang hiện tại
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

      // Hiển thị dấu ba chấm nếu trang hiện tại nhỏ hơn totalPages - 2
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      // Luôn hiển thị trang cuối cùng
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

    // Thêm nút Next
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

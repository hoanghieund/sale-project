// src/features/users/home/components/AllProductsSection.tsx

import ProductCardSimple from '@/components/common/ProductCardSimple';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Product } from '@/types';
import React from 'react';

/**
 * @interface AllProductsSectionProps
 * @description Định nghĩa các props cho component AllProductsSection.
 */
interface AllProductsSectionProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * @component AllProductsSection
 * @description Component React hiển thị danh sách tất cả sản phẩm và điều khiển phân trang.
 * @param {AllProductsSectionProps} props - Các props của component.
 * @returns {JSX.Element} Element JSX của component AllProductsSection.
 */
const AllProductsSection: React.FC<AllProductsSectionProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
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
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
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
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tất Cả Sản Phẩm</h2>
        {/* Lưới hiển thị sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>

        {/* Khu vực phân trang */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>{renderPaginationItems()}</PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export { AllProductsSection };

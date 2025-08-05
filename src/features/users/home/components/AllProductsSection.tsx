// src/features/users/home/components/AllProductsSection.tsx

import CustomPagination from "@/components/common/CustomPagination";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product } from "@/types";
import React from "react";

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
  // Component phân trang đã được tách thành CustomPagination

  return (
    <section className="py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Khám Phá Toàn Bộ Sản Phẩm - Mua Sắm Trực Tuyến Dễ Dàng</h2>
        {/* Lưới hiển thị sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>

        {/* Khu vực phân trang */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-12"
        />
      </div>
    </section>
  );
};

export { AllProductsSection };

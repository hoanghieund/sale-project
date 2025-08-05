// src/features/users/home/components/AllProductsSection.tsx

import CustomPagination from "@/components/common/CustomPagination";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product } from "@/types";
import React from "react";

/**
 * @interface AllProductsSectionProps
 * @description Defines the props for the AllProductsSection component.
 */
interface AllProductsSectionProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * @component AllProductsSection
 * @description React component displaying a list of all products and pagination controls.
 * @param {AllProductsSectionProps} props - The component's props.
 * @returns {JSX.Element} The JSX element of the AllProductsSection component.
 */
const AllProductsSection: React.FC<AllProductsSectionProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Pagination component has been extracted into CustomPagination

  return (
    <section className="py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore All Products - Easy Online Shopping</h2>
        {/* Product display grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination area */}
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

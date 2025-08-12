/**
 * @file Component TopSellingProducts hiển thị danh sách các sản phẩm bán chạy nhất.
 * Sử dụng shadcn/ui Card components để trình bày thông tin sản phẩm.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types"; // Import interface Product
import React from "react";

/**
 * @interface TopSellingProductsProps
 * @description Props cho component TopSellingProducts.
 * @property {Product[]} products - Danh sách các sản phẩm bán chạy nhất.
 */
interface TopSellingProductsProps {
  products: Product[];
}

/**
 * @function TopSellingProducts
 * @description Component hiển thị danh sách các sản phẩm bán chạy nhất.
 * @param {TopSellingProductsProps} props - Props của component.
 * @returns {JSX.Element} Component TopSellingProducts.
 */
export const TopSellingProducts: React.FC<TopSellingProductsProps> = ({
  products,
}) => {
  /**
   * @function formatCurrency
   * @description Định dạng giá trị số thành định dạng tiền tệ Việt Nam Đồng.
   * @param {number} value - Giá trị số cần định dạng.
   * @returns {string} Chuỗi tiền tệ đã định dạng.
   */
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Top selling products</CardTitle>
        <CardDescription>Highest revenue products</CardDescription>
      </CardHeader>
      {/* Giữ min-w-0 để tránh tràn ngang trên màn hình nhỏ */}
      <CardContent className="min-w-0">
        <div className="space-y-4">
          {products.map((product, index) => (
            // Stack theo cột trên mobile, chuyển thành hàng từ sm trở lên
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
            >
              <div className="flex-shrink-0">
                {/* Số thứ tự sản phẩm */}
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {/* Tên sản phẩm */}
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.title}
                </p>
                {/* Items sold from BE */}
                <p className="text-sm text-gray-500 truncate">
                  Sold: {typeof product.totalProductSold === "number" ? product.totalProductSold : 0}
                </p>
              </div>
              <div className="text-right">
                {/* Revenue from BE: sumPriceByOrders */}
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(Number(product.sumPriceByOrders || 0))}
                </p>
                <p className="text-xs text-gray-500">Revenue (BE)</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

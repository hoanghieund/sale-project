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
import { TopProductItem } from "@/types";
import { formatCurrencyUSD } from "@/utils/formatters";
import React from "react";

/**
 * @interface TopSellingProductsProps
 * @description Props cho component TopSellingProducts.
 * @property {TopProductItem[]} products - Danh sách các sản phẩm bán chạy nhất (đầu vào từ BE)
 */
interface TopSellingProductsProps {
  products: TopProductItem[];
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
              key={product.productId}
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
                {/* Items sold từ BE (unitsSold) */}
                <p className="text-sm text-gray-500 truncate">
                  Sold:{" "}
                  {typeof product.unitsSold === "number"
                    ? product.unitsSold
                    : 0}
                </p>
              </div>
              <div className="text-right">
                {/* Doanh thu đã thanh toán từ BE: revenuePaid */}
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrencyUSD(Number(product.revenuePaid ?? 0))}
                </p>
                <p className="text-xs text-gray-500">Revenue (paid)</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

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
import { DollarSign, Package } from "lucide-react"; // Icon minh hoạ
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
    // Card với đổ bóng nhẹ + hover để tăng độ nổi khối, không đổi logic
    <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Top selling products</CardTitle>
        <CardDescription>Highest revenue products</CardDescription>
      </CardHeader>
      {/* Giữ min-w-0 để tránh tràn ngang trên màn hình nhỏ */}
      <CardContent className="min-w-0">
        {products.length === 0 ? (
          // Empty state tinh gọn
          <div className="h-20 flex items-center justify-center text-sm text-muted-foreground">
            No top products yet
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {products.map((product, index) => (
              // Stack theo cột trên mobile, chuyển thành hàng từ sm trở lên
              <div
                key={product.productId}
                className="group py-3 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 rounded-md px-2 -mx-2 hover:bg-primary/5 transition-colors"
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
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                  </div>
                  {/* Items sold từ BE (unitsSold) */}
                  <div className="mt-0.5 flex items-center text-xs text-muted-foreground">
                    <Package className="h-3 w-3 mr-1 text-emerald-600" />
                    <span className="truncate">
                      Sold:{" "}
                      {typeof product.unitsSold === "number"
                        ? product.unitsSold
                        : 0}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {/* Doanh thu đã thanh toán từ BE: revenuePaid */}
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm font-semibold text-emerald-600">
                      {formatCurrencyUSD(Number(product.revenuePaid ?? 0))}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Revenue (paid)
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

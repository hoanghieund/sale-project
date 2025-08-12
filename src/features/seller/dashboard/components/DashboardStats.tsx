/**
 * @file Component DashboardStats hiển thị các số liệu thống kê chính trên Dashboard của Seller.
 * Bao gồm tổng sản phẩm, tổng danh mục, sản phẩm hết hàng, doanh thu ước tính, lượt xem và tỷ lệ chuyển đổi.
 * Sử dụng shadcn/ui Card và Badge components.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types"; // Import interface DashboardStats
import { formatCurrencyUSD } from "@/utils/formatters";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import React from "react";

/**
 * @interface DashboardStatsProps
 * @description Props cho component DashboardStats.
 * @property {DashboardStats} stats - Đối tượng chứa các số liệu thống kê.
 */
interface DashboardStatsProps {
  stats: DashboardStats;
}

/**
 * @function DashboardStatsComponent
 * @description Component hiển thị các thẻ số liệu thống kê.
 * @param {DashboardStatsProps} props - Props của component.
 * @returns {JSX.Element} Component DashboardStats.
 */
export const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({
  stats,
}) => {
  /**
   * @function formatNumber
   * @description Định dạng giá trị số thành chuỗi số có dấu phân cách hàng nghìn.
   * @param {number} value - Giá trị số cần định dạng.
   * @returns {string} Chuỗi số đã định dạng.
   */
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  // Mảng thẻ số liệu: chỉ dùng dữ liệu từ BE
  const statCards = [
    {
      title: "Total products",
      value: formatNumber(stats.totalProducts),
      description: "Active products",
      icon: Package,
    },
    {
      title: "Total orders",
      value: formatNumber(stats.totalOrders ?? 0),
      description: "All orders",
      icon: ShoppingCart,
    },
    {
      title: "Total revenue",
      value: formatCurrencyUSD(stats.totalRevenue ?? 0),
      icon: DollarSign,
    },
    // Optional từ BE
    ...(typeof stats.totalItemsSold === "number"
      ? [
          {
            title: "Items sold",
            value: formatNumber(stats.totalItemsSold),
            description: "Total items sold",
            icon: Package,
          },
        ]
      : []),
    ...(typeof stats.averageOrderValue === "number"
      ? [
          {
            title: "Average order value",
            value: formatCurrencyUSD(stats.averageOrderValue),
            icon: DollarSign,
          },
        ]
      : []),
    ...(typeof stats.conversionRate === "number"
      ? [
          {
            title: "Conversion rate",
            value: `${stats.conversionRate}%`,
            icon: ShoppingCart,
          },
        ]
      : []),
  ];

  /**
   * Chọn màu nhấn theo từng thẻ để làm nổi bật các mục quan trọng
   * - Revenue: nhấn mạnh (viền trái + màu xanh lục)
   * - Orders: icon xanh dương
   * - Items sold: icon xanh lục
   * - Conversion rate: cam
   */
  const getAccent = (title: string) => {
    switch (title) {
      case "Total revenue":
        return {
          ring: "border-l-4 border-emerald-600",
          iconColor: "text-emerald-600",
          valueColor: "text-emerald-600",
        } as const;
      case "Total orders":
        return { iconColor: "text-blue-600" } as const;
      case "Items sold":
        return { iconColor: "text-emerald-600" } as const;
      case "Conversion rate":
        return {
          iconColor: "text-orange-600",
          valueColor: "text-orange-600",
        } as const;
      default:
        return {} as const;
    }
  };

  return (
    <div className="grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        // Áp dụng màu nhấn theo từng thẻ
        const accent = getAccent(stat.title);
        return (
          <Card
            className={`bg-white shadow-sm hover:shadow-lg transition-shadow ${accent.ring ?? ""}`}
            key={index}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {/* Icon trong vòng tròn nền để nhấn nhẹ */}
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon
                  className={`h-4 w-4 ${accent.iconColor ?? "text-muted-foreground"}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${accent.valueColor ?? ""}`}>
                {stat.value}
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

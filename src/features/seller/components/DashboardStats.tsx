/**
 * @file Component DashboardStats hiển thị các số liệu thống kê chính trên Dashboard của Seller.
 * Bao gồm tổng sản phẩm, tổng danh mục, sản phẩm hết hàng, doanh thu ước tính, lượt xem và tỷ lệ chuyển đổi.
 * Sử dụng shadcn/ui Card và Badge components.
 */

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/seller"; // Import interface DashboardStats
import {
  AlertTriangle,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react";
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
export const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
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

  /**
   * @function formatNumber
   * @description Định dạng giá trị số thành chuỗi số có dấu phân cách hàng nghìn.
   * @param {number} value - Giá trị số cần định dạng.
   * @returns {string} Chuỗi số đã định dạng.
   */
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  // Mảng chứa cấu hình cho từng thẻ số liệu thống kê
  const statCards = [
    {
      title: "Tổng sản phẩm",
      value: formatNumber(stats.totalProducts),
      description: "Sản phẩm đang bán",
      icon: Package,
      trend: "up", // Xu hướng (tăng/giảm)
      trendValue: "+12%", // Giá trị xu hướng
    },
    {
      title: "Tổng danh mục",
      value: formatNumber(stats.totalCategories),
      description: "Danh mục sản phẩm",
      icon: ShoppingCart,
      trend: "up",
      trendValue: "+5%",
    },
    {
      title: "Sản phẩm hết hàng",
      value: formatNumber(stats.outOfStockProducts),
      description: "Cần nhập thêm",
      icon: AlertTriangle,
      trend: "down",
      trendValue: "-8%",
      isWarning: true, // Đánh dấu là cảnh báo
    },
    {
      title: "Doanh thu ước tính",
      value: formatCurrency(stats.estimatedRevenue),
      description: "Theo giá bán",
      icon: DollarSign,
      trend: "up",
      trendValue: "+23%",
    },
    {
      title: "Lượt xem",
      value: formatNumber(stats.totalViews),
      description: "Tổng lượt xem",
      icon: Eye,
      trend: "up",
      trendValue: "+15%",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: `${stats.conversionRate}%`,
      description: "Tỷ lệ mua hàng",
      icon: Users,
      trend: "up",
      trendValue: "+3%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center space-x-1">
                {/* Icon xu hướng */}
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                {/* Giá trị xu hướng */}
                <span className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.trendValue}
                </span>
              </div>
            </div>
            {/* Hiển thị badge cảnh báo nếu có */}
            {stat.isWarning && (
              <Badge variant="destructive" className="mt-2">
                Cảnh báo
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "@/types";

/**
 * DashboardCharts
 * Show main charts for Seller Dashboard.
 * - Line: Daily revenue (revenueTrend)
 * - Bar: Revenue by top products (topSellingProducts)
 */
export interface DashboardChartsProps {
  stats: DashboardStats; // Dữ liệu tổng hợp từ API
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ stats }) => {
  // Normalize data to arrays to avoid undefined
  const trend = stats.revenueTrend ?? [];
  // Chuẩn hoá dữ liệu top sản phẩm cho BarChart (giữ nguyên logic dữ liệu)
  const topProducts = (stats.topSellingProducts ?? []).slice(0, 6).map(p => ({
    name: p.title,
    revenue: Number(p.revenuePaid ?? 0),
    unitsSold: typeof p.unitsSold === "number" ? p.unitsSold : 0,
  }));

  return (
    // Responsive: 1 cột trên mobile, 2 cột từ lg trở lên để tận dụng không gian màn hình rộng
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily revenue chart */}
      <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Daily revenue</CardTitle>
          <CardDescription>Recent trend</CardDescription>
        </CardHeader>
        {/* Responsive height: slightly lower on mobile to reduce vertical scroll */}
        <CardContent className="min-w-0 h-64 sm:h-72">
          {trend.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              No revenue data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trend}
                margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(v: any) =>
                    new Intl.NumberFormat("vi-VN").format(Number(v))
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top products by revenue (Bar) */}
      <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Top products by revenue</CardTitle>
          <CardDescription>Highest grossing items</CardDescription>
        </CardHeader>
        <CardContent className="min-w-0 h-64 sm:h-72">
          {topProducts.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              No top product data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} hide={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(v: any) =>
                    new Intl.NumberFormat("vi-VN").format(Number(v))
                  }
                />
                {/* Bar hiển thị doanh thu đã thanh toán */}
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

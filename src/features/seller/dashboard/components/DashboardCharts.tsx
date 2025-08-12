import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats, Product } from "@/types";

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

  // Product revenue from backend data (sumPriceByOrders)
  const topRevenue = (stats.topSellingProducts ?? [])
    .filter((p: Product) => typeof p.sumPriceByOrders === "number")
    .map((p: Product) => ({
      name: p.title,
      revenue: Math.round((p.sumPriceByOrders as number) || 0),
    }));

  return (
    // Responsive: 1 cột trên mobile, 2 cột từ lg trở lên để tận dụng không gian màn hình rộng
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily revenue chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Daily revenue</CardTitle>
          <CardDescription>Last 7 days trend</CardDescription>
        </CardHeader>
        {/* Responsive height: slightly lower on mobile to reduce vertical scroll */}
        <CardContent className="min-w-0 h-64 sm:h-72 lg:h-80">
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
        </CardContent>
      </Card>

      {/* Top products by revenue */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Top products by revenue</CardTitle>
          <CardDescription>Backend revenue</CardDescription>
        </CardHeader>
        {/* Responsive height + min-w-0 to avoid overflow with long product names */}
        <CardContent className="min-w-0 h-64 sm:h-72 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topRevenue}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(v: any) =>
                  new Intl.NumberFormat("vi-VN").format(Number(v))
                }
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

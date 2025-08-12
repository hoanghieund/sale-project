import React from "react";
import {
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

  return (
    // Responsive: 1 cột trên mobile, 2 cột từ lg trở lên để tận dụng không gian màn hình rộng
    <div className="grid grid-cols-1 gap-6">
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
    </div>
  );
};

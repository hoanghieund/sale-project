import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats, Product } from "@/features/seller/types";

/**
 * DashboardCharts
 * Hiển thị các biểu đồ chính trong trang Dashboard của Seller.
 * - Biểu đồ đường: Doanh thu theo ngày (revenueTrend)
 * - Biểu đồ cột: Doanh thu ước tính theo Top sản phẩm (topSellingProducts)
 */
export interface DashboardChartsProps {
  stats: DashboardStats; // Dữ liệu tổng hợp từ API
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ stats }) => {
  // Chuẩn hoá dữ liệu để chắc chắn có mảng rỗng thay vì undefined
  const trend = stats.revenueTrend ?? [];

  // Tính doanh thu ước tính cho top sản phẩm (price * stock)
  const topRevenue = (stats.topSellingProducts ?? []).map((p: Product) => ({
    name: p.name,
    revenue: Math.round(p.price * p.stock),
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Biểu đồ Doanh thu theo ngày */}
      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo ngày</CardTitle>
          <CardDescription>Xu hướng doanh thu 7 ngày gần nhất</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: any) => new Intl.NumberFormat("vi-VN").format(Number(v))} />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Biểu đồ doanh thu theo Top sản phẩm */}
      <Card>
        <CardHeader>
          <CardTitle>Top sản phẩm theo doanh thu</CardTitle>
          <CardDescription>Ước tính: giá × tồn kho</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topRevenue} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: any) => new Intl.NumberFormat("vi-VN").format(Number(v))} />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

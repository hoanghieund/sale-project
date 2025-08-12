/**
 * @file Trang Dashboard (Dashboard Page) cho module Seller.
 * Hiển thị số liệu tổng quan và chuỗi thời gian theo khoảng ngày/groupBy.
 * Tích hợp 2 API:
 *  - GET /api/shop/stats/overview?fromDate&toDate&groupBy
 *  - GET /api/shop/stats/timeseries?fromDate&toDate&groupBy
 */

import { Input } from "@/components/ui/input"; // Input date
import { Label } from "@/components/ui/label"; // Nhãn control
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Chọn groupBy
import { DashboardCharts } from "@/features/seller/dashboard/components/DashboardCharts";
import { DashboardStatsComponent } from "@/features/seller/dashboard/components/DashboardStats";
import { TopSellingProducts } from "@/features/seller/dashboard/components/TopSellingProducts";
import { DashboardStats, StatsGroupBy } from "@/types"; // Types
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner"; // dùng sonner chuẩn ESM
import { dashboardService } from "../services/dashboardService";

// Thông báo lỗi chuẩn hoá
const notifyError = (message: string) => {
  try {
    toast.error("Error", { description: message });
  } catch (_) {
    console.error("Dashboard error:", message);
  }
};

/**
 * @function formatDate
 * @description Chuẩn hoá Date -> YYYY-MM-DD cho API.
 */
const formatDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/**
 * @function DashboardPage
 * @description Component trang Dashboard của Seller.
 */
const DashboardPage: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const sevenDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6); // 7 ngày gần nhất (bao gồm hôm nay)
    return d;
  }, []);

  // Bộ lọc gọi API: fromDate, toDate, groupBy
  const [filters, setFilters] = useState<{
    fromDate: string;
    toDate: string;
    groupBy: StatsGroupBy;
  }>({
    fromDate: formatDate(sevenDaysAgo),
    toDate: formatDate(today),
    groupBy: "day",
  });

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * @function fetchStats
     * @description Gọi 2 API (overview + timeseries) và hợp nhất thành DashboardStats cho UI hiện tại.
     */
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [overview, series, topProducts] = await Promise.all([
          dashboardService.getOverviewStats(filters),
          dashboardService.getTimeSeriesStats(filters),
          dashboardService.getTopProductsStats({
            fromDate: filters.fromDate,
            toDate: filters.toDate,
            limit: 10,
          }),
        ]);

        // Map dữ liệu về DashboardStats để tái sử dụng UI cũ
        // Ưu tiên các trường "Paid" từ backend mới; fallback về trường cũ nếu có
        const mapped: DashboardStats = {
          totalProducts: overview.totalProducts ?? 0,
          totalOrders: overview.totalOrdersPaid ?? overview.totalOrders ?? 0,
          totalRevenue: overview.totalRevenuePaid ?? overview.totalRevenue ?? 0,
          pendingOrders: overview.pendingOrders ?? 0,
          // Chỉ sử dụng dữ liệu từ BE: ưu tiên API top-products cho danh sách bán chạy
          topProducts: overview.topProducts ?? [],
          topSellingProducts:
            (Array.isArray(topProducts) && topProducts.length > 0
              ? topProducts
              : overview.topSellingProducts ?? overview.topProducts ?? []),
          // Các trường bổ sung từ BE nếu có
          totalItemsSold: overview.totalItemsSold ?? undefined,
          averageOrderValue: overview.averageOrderValue ?? undefined,
          conversionRate: overview.conversionRate ?? undefined,
          totalCategories: overview.totalCategories ?? undefined,
          recentOrders: overview.recentOrders ?? [],
          revenueTrend:
            series?.map(p => ({
              date: p.label ?? p.date,
              revenue: p.revenuePaid ?? p.revenue ?? 0,
            })) ?? [],
        };

        setStats(mapped);
      } catch (err: any) {
        const msg = err?.message || "Failed to load dashboard stats.";
        setError(msg);
        notifyError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [filters]);

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">
      {/* Filters: date range & groupBy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="fromDate">From date</Label>
          <Input
            id="fromDate"
            type="date"
            value={filters.fromDate}
            onChange={e =>
              setFilters(s => ({ ...s, fromDate: e.target.value }))
            }
          />
        </div>
        <div>
          <Label htmlFor="toDate">To date</Label>
          <Input
            id="toDate"
            type="date"
            value={filters.toDate}
            onChange={e => setFilters(s => ({ ...s, toDate: e.target.value }))}
          />
        </div>
        <div>
          <Label>Group by</Label>
          <Select
            value={filters.groupBy}
            onValueChange={v =>
              setFilters(s => ({ ...s, groupBy: v as StatsGroupBy }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">By day</SelectItem>
              <SelectItem value="week">By week</SelectItem>
              <SelectItem value="month">By month</SelectItem>
              <SelectItem value="year">By year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {stats ? (
        <>
          {/* Hàng 1: Stats tổng quan */}
          <DashboardStatsComponent stats={stats} />

          {/* Hàng 2: Biểu đồ doanh thu & top sản phẩm */}
          <DashboardCharts stats={stats} />

          {/* Hàng 3: Danh sách top sản phẩm chi tiết */}
          <div className="min-w-0">
            <TopSellingProducts products={stats.topSellingProducts ?? []} />
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No dashboard data to display.
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

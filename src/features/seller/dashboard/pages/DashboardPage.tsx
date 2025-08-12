/**
 * @file Trang Dashboard (Dashboard Page) cho module Seller.
 * Hiển thị số liệu tổng quan và chuỗi thời gian theo khoảng ngày/groupBy.
 * Tích hợp 2 API:
 *  - GET /api/shop/stats/overview?fromDate&toDate&groupBy
 *  - GET /api/shop/stats/timeseries?fromDate&toDate&groupBy
 */

import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button"; // Nút trigger DateRange
import { Calendar } from "@/components/ui/calendar"; // Calendar shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Bọc UI Filters
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Popover bọc Calendar
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
import { Calendar as CalendarIcon } from "lucide-react"; // Icon lịch
import React, { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker"; // Date range type
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

  // UI state cho DateRange (shadcn Calendar)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    // Sync ngay với giá trị khởi tạo của filters để hiển thị đúng trên nút
    from: new Date(sevenDaysAgo),
    to: new Date(today),
  });
  // Responsive: số tháng hiển thị (mobile 1, desktop 2)
  const [calendarMonths, setCalendarMonths] = useState<number>(2);
  useEffect(() => {
    // Theo dõi breakpoint để đổi số tháng hiển thị của calendar
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCalendarMonths(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /**
   * Helper: chuyển Date -> YYYY-MM-DD (local) an toàn timezone
   * Tránh lệch ngày do UTC khi serialize ISO.
   */
  const toYMD = (d: Date) => {
    const tz = d.getTimezoneOffset() * 60000; // ms offset
    return new Date(d.getTime() - tz).toISOString().slice(0, 10);
  };

  // Sync UI calendar khi filters đổi (ví dụ: có reset ngoài)
  useEffect(() => {
    setDateRange({
      from: filters.fromDate ? new Date(filters.fromDate) : undefined,
      to: filters.toDate ? new Date(filters.toDate) : undefined,
    });
  }, [filters.fromDate, filters.toDate]);

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
          // Chỉ sử dụng dữ liệu từ BE: ưu tiên API top-products cho danh sách bán chạy
          topProducts: overview.topProducts ?? [],
          topSellingProducts:
            Array.isArray(topProducts) && topProducts.length > 0
              ? topProducts
              : [],
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
      {/* Filters: bọc trong Card để giao diện gọn gàng hơn, không đổi logic */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date range: dùng shadcn Calendar + Popover, chiếm 2 cột trên desktop */}
            <div className="md:col-span-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                      <span>
                        {filters.fromDate} → {filters.toDate}
                      </span>
                    ) : dateRange?.from ? (
                      <span>{filters.fromDate}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        Pick a date range
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={range => {
                      // Cập nhật UI + filters theo range chọn
                      setDateRange(range);
                      setFilters(s => ({
                        ...s,
                        fromDate: range?.from ? toYMD(range.from) : s.fromDate,
                        toDate: range?.to ? toYMD(range.to) : s.toDate,
                      }));
                    }}
                    numberOfMonths={calendarMonths}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
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
        </CardContent>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <>
          <EmptyStateDisplay />
        </>
      ) : stats ? (
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

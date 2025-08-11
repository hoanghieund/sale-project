/**
 * @file Trang Dashboard (Dashboard Page) cho module Seller.
 * Hiển thị các số liệu thống kê tổng quan về gian hàng và danh sách sản phẩm bán chạy nhất.
 * Sử dụng DashboardStatsComponent và TopSellingProducts components.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCharts } from "@/features/seller/dashboard/components/DashboardCharts";
import { DashboardStatsComponent } from "@/features/seller/dashboard/components/DashboardStats";
import { TopSellingProducts } from "@/features/seller/dashboard/components/TopSellingProducts";
import { sellerAPI } from "@/features/seller/services/seller";
import { DashboardStats } from "@/types"; // Import DashboardStats interface
import React, { useEffect, useState } from "react"; // Thêm useState
import { toast } from "sonner";

/**
 * @function DashboardPage
 * @description Component trang Dashboard của Seller.
 * @returns {JSX.Element} Trang Dashboard.
 */
const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null); // State cho dữ liệu dashboard
  const [loading, setLoading] = useState(true); // State cho trạng thái loading
  const [error, setError] = useState<string | null>(null); // State cho lỗi

  useEffect(() => {
    /**
     * @function fetchDashboardStats
     * @description Hàm lấy số liệu thống kê dashboard từ API.
     */
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const statsData = await sellerAPI.getDashboardStats();
        setStats(statsData);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải số liệu dashboard.");
        toast.error("Lỗi", {
          description: err.message || "Không thể tải số liệu dashboard.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <p>Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <>
      {stats ? (
        <>
          {/* Hàng 1: Stats tổng quan (giữ gọn, dùng component sẵn có) */}
          <DashboardStatsComponent stats={stats} />

          {/* Hàng 2: Biểu đồ doanh thu & top sản phẩm */}
          <DashboardCharts stats={stats} />

          {/* Hàng 3: Danh sách top sản phẩm chi tiết (bên cạnh charts bar đã tổng quan) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopSellingProducts products={stats.topSellingProducts} />
            {/* Slot bên phải có thể thêm biểu đồ/summary khác sau */}
            <Card>
              <CardHeader>
                <CardTitle>Gợi ý</CardTitle>
                <CardDescription>
                  Thêm các widget khác ở đây khi cần
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Không có dữ liệu dashboard để hiển thị.
        </div>
      )}
    </>
  );
};

export default DashboardPage;

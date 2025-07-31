import { SellerDashboardStats } from "@/types";
import { useEffect, useState } from "react";

/**
 * SellerDashboard - Trang dashboard chính cho seller
 * Hiển thị thống kê tổng quan về shop và hoạt động bán hàng
 */
const SellerDashboard = () => {
  const [stats, setStats] = useState<SellerDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch seller dashboard stats from API
    // Tạm thời sử dụng mock data
    const mockStats: SellerDashboardStats = {
      totalProducts: 156,
      totalOrders: 1250,
      totalRevenue: 45600000,
      pendingOrders: 12,
      monthlyRevenue: [2500000, 3200000, 4100000, 3800000, 4500000, 5200000],
      topProducts: [],
      recentOrders: []
    };

    setStats(mockStats);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không thể tải dữ liệu</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Seller</h1>
          <p className="text-gray-600">Quản lý cửa hàng và theo dõi hiệu suất bán hàng</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-new text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="font-semibold">Thêm sản phẩm</div>
            </div>
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold">Quản lý đơn hàng</div>
            </div>
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🏪</div>
              <div className="font-semibold">Cài đặt shop</div>
            </div>
          </button>
          <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Báo cáo</div>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="text-3xl">🛒</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đơn hàng chờ xử lý</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Doanh thu 6 tháng gần đây</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {stats.monthlyRevenue.map((revenue, index) => {
                const maxRevenue = Math.max(...stats.monthlyRevenue);
                const height = (revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-blue-500 w-full rounded-t"
                      style={{ height: `${height}%` }}
                      title={formatCurrency(revenue)}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">T{index + 7}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">#DH{String(index + 1).padStart(4, '0')}</p>
                    <p className="text-sm text-gray-600">Khách hàng {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(299000 * (index + 1))}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Chờ xử lý
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-new hover:text-blue-800 text-sm font-medium">
              Xem tất cả đơn hàng →
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quản lý nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/seller/products"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium">Quản lý sản phẩm</p>
                <p className="text-sm text-gray-600">Thêm, sửa, xóa sản phẩm</p>
              </div>
            </a>
            <a
              href="/seller/orders"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium">Quản lý đơn hàng</p>
                <p className="text-sm text-gray-600">Xử lý đơn hàng, vận chuyển</p>
              </div>
            </a>
            <a
              href="/seller/shop"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">🏪</span>
              <div>
                <p className="font-medium">Cài đặt cửa hàng</p>
                <p className="text-sm text-gray-600">Thông tin, chính sách shop</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

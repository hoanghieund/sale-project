import { SellerDashboardStats } from "@/types";
import { useEffect, useState } from "react";

/**
 * SellerDashboard - Main dashboard page for sellers
 * Displays an overview of the shop and sales activities
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
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Unable to load data</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your store and track sales performance</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-new text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="font-semibold">Add Product</div>
            </div>
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold">Manage Orders</div>
            </div>
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🏪</div>
              <div className="font-semibold">Shop Settings</div>
            </div>
          </button>
          <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Reports</div>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="text-3xl">🛒</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
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
                <p className="text-sm text-gray-600">Pending Orders</p>
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
            <h3 className="text-lg font-semibold mb-4">Revenue Last 6 Months</h3>
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
                    <p className="text-sm text-gray-600">Customer {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(299000 * (index + 1))}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-new hover:text-blue-800 text-sm font-medium">
              View all orders →
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/seller/products"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium">Manage Products</p>
                <p className="text-sm text-gray-600">Add, edit, delete products</p>
              </div>
            </a>
            <a
              href="/seller/orders"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium">Manage Orders</p>
                <p className="text-sm text-gray-600">Process orders, shipping</p>
              </div>
            </a>
            <a
              href="/seller/shop"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">🏪</span>
              <div>
                <p className="font-medium">Store Settings</p>
                <p className="text-sm text-gray-600">Shop information, policies</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

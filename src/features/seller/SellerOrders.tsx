import { Order } from "@/types";
import { useEffect, useState } from "react";

/**
 * SellerOrders - Order management page for sellers
 * Displays a list of orders and allows order processing
 */
const SellerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // TODO: Fetch seller orders from API
    // Tạm thời sử dụng mock data
    setOrders([]);
    setLoading(false);
  }, []);

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    // TODO: Update order status via API
    console.log("Update order status:", orderId, newStatus);
  };

  const handleViewOrderDetail = (orderId: string) => {
    // TODO: Navigate to order detail page or open modal
    console.log("View order detail:", orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Confirmation";
      case "confirmed":
        return "Confirmed";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Process and track customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Confirmation</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-purple-600">15</p>
              </div>
              <div className="text-3xl">🚚</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">156</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending Confirmation</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-gray-400">Orders will appear here when customers place orders</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                        <div className="text-sm text-gray-500">ID: {order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.createdAt.toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewOrderDetail(order.id)}
                            className="text-new hover:text-blue-900"
                          >
                            View
                          </button>
                          {order.status === "pending" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, "confirmed")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                          )}
                          {order.status === "confirmed" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Process
                            </button>
                          )}
                          {order.status === "processing" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Ship
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {orders.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bgnewtext-white rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrders;

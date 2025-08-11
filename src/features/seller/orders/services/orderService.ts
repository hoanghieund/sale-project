import { Axios } from "@/api/Axios";
import { OrderStatus } from "@/types";

export const orderService = {
  /**
   * @method getOrdersByShop
   * @description Fetch shop's orders with optional filters.
   * Used for the "all" tab (status optional) or searching by code/date.
   * @param {Object} [filters] - Optional filters.
   * @param {string} [filters.code] - Order code to search by.
   * @param {string} [filters.fromDate] - Start date (YYYY-MM-DD).
   * @param {string} [filters.toDate] - End date (YYYY-MM-DD).
   * @param {number} [filters.page] - Current page (base-0).
   * @param {number} [filters.size] - Page size.
   * @param {number} [filters.status] - Order status (optional).
   * @returns {Promise<any>} Orders list response.
   */
  getOrdersByShop: async (filters?: {
    code?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    size?: number;
    status?: number;
  }) => {
    // Build query string dynamically for optional params
    const params = new URLSearchParams();
    if (filters?.code) params.set("code", filters.code);
    if (filters?.fromDate) params.set("fromDate", filters.fromDate);
    if (filters?.toDate) params.set("toDate", filters.toDate);
    if (typeof filters?.page === "number")
      params.set("page", String(filters.page));
    if (typeof filters?.size === "number")
      params.set("size", String(filters.size));
    if (typeof filters?.status === "number")
      params.set("status", String(filters.status));

    // Do not hardcode defaults; only send params if provided
    const qs = params.toString();
    return Axios.get(`/api/shop/orders${qs ? `?${qs}` : ""}`);
  },
  /**
   * @method updateOrderStatus
   * @description Update an order's status.
   * @param {number} orderId - Order ID.
   * @param {number} newStatus - New status value.
   * @returns {Promise<any>} Updated order.
   */
  updateOrderStatus: async (orderId: number, newStatus: OrderStatus) => {
    return Axios.patch(`/api/shop/orders/${orderId}/status`, {
      status: newStatus,
    });
  },
  /**
   * @method getOrderDetail
   * @description Get order detail information.
   * @param {number} orderId - Order ID.
   * @returns {Promise<any>} Order detail response.
   */
  getOrderDetail: async (orderId: number) => {
    return Axios.get(`/api/shop/orders/${orderId}`);
  },
};

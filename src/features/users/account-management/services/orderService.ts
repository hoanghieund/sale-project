import { Axios } from "@/api/Axios";

export const orderService = {
  /**
   * Retrieves the list of orders for a user.
   * @param userId - User ID.
   * @returns Promise with the list of orders.
   */
  getOrdersByUser: async (userId: number) => {
    return await Axios.get(`/api/order/getAllOrderByUser?id=${userId}`);
  },

  /**
   * Retrieves the list of orders for a user by status.
   * @param userId - User ID.
   * @param status - Status of the order.
   * @returns Promise with the list of orders.
   */
  getOrdersByUserAndStatus: async (userId: number, status: number) => {
    return await Axios.get(
      `/api/order/getAllOrderByUserIdAndStatus?status=${status}&id=${userId}`
    );
  },

  /**
   * Cancels an order by order ID.
   * @param orderId - Order ID to cancel.
   * @returns Promise with the cancellation result.
   */
  cancelOrder: async (orderId: number) => {
    return await Axios.patch(`/api/user/cancel_order/${orderId}`);
  },
};

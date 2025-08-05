import { Axios } from '@/api/Axios';
import { Order } from '@/types';

export const orderService = {
  /**
   * Lấy danh sách đơn hàng của người dùng.
   * @param userId - ID của người dùng.
   * @returns Promise với danh sách đơn hàng.
   */
  getOrdersByUser: async (userId: number): Promise<Order[]> => {
    return await Axios.get(`/api/order/getByUser?id=${userId}`);
  },

  /**
   * Lấy danh sách đơn hàng của người dùng theo trạng thái.
   * @param userId - ID của người dùng.
   * @param status - Trạng thái của đơn hàng.
   * @returns Promise với danh sách đơn hàng.
   */
  getOrdersByUserAndStatus: async (userId: number, status: number): Promise<Order[]> => {
    return await Axios.get(`/api/order/getAllByUserIdAndStatus?status=${status}&id=${userId}`);
  },
};

/**
 * Order Service
 * @module orderService
 */

import { Axios } from '@/api/Axios';
import { Order } from '@/features/users/account-management/types/order';

/**
 * @interface GetOrdersByUserParams
 * @description Tham số cho hàm getOrdersByUser.
 */
interface GetOrdersByUserParams {
  userId: string;
}

/**
 * @function getOrdersByUser
 * @description Lấy danh sách đơn hàng của một người dùng từ API.
 * @param {GetOrdersByUserParams} params - Đối tượng chứa ID người dùng.
 * @returns {Promise<Order[]>} Một Promise chứa mảng các đối tượng Order.
 * @throws {Error} Nếu có lỗi xảy ra trong quá trình gọi API.
 */
export const getOrdersByUser = async ({ userId }: GetOrdersByUserParams): Promise<Order[]> => {
  return await Axios.get(`/api/order/getByUser?id=${userId}`);
};
import { Axios } from "@/api/Axios";

export const orderService = {
  /**
   * thanh toán đơn hàng
   * @param orderData - Thông tin đơn hàng
   * @returns Promise với thông tin đơn hàng
   */
  checkout: (orderData: any) => {
    return Axios.post(`/api/order/order`, orderData);
  },
};

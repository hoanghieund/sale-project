import { Axios } from "@/api/Axios";

export const orderService = {
  /**
   * Handles order checkout
   * @param orderData - Order information
   * @returns Promise với thông tin đơn hàng
   */
  checkout: (orderData: any) => {
    return Axios.post(`/api/order/create-paypal-order`, orderData);
  },
};

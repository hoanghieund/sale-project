// src/features/users/product-detail/services/productDetailService.ts
import { Axios } from "@/api/Axios";

export const productDetailService = {
  /**
   * Lấy thông tin chi tiết sản phẩm theo ID
   * @param productId ID của sản phẩm
   * @returns Promise chứa thông tin sản phẩm
   */
  getProductById: async (productId: string) => {
    return Axios.get(`/api/public/product/${productId}`);
  },
};

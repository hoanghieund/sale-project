import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * Lấy danh sách sản phẩm nổi bật
   * @returns Promise với danh sách sản phẩm
   */
  getFeaturedProducts: () => {
    return Axios.get(`/api/public/product/getRandomProduct`);
  },
};
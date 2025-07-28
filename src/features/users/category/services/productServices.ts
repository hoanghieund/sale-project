import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo categoryId
   * @param categoryId - ID của danh mục
   * @returns Promise với danh sách sản phẩm
   */
  getProductsByCategoryId: (categoryId: number) => {
    return Axios.get(`/api/public/product/getByCategoryId/${categoryId}`);
  },
};
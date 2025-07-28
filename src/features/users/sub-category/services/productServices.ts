import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo subcategoryId
   * @param subcategoryId - ID của danh mục
   * @returns Promise với danh sách sản phẩm
   */
  getProductsBySubCategoryId: (subcategoryId: number) => {
    return Axios.get(`/api/public/product/getBySubCategoryId/${subcategoryId}`);
  },
};

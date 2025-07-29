import { Axios } from "@/api/Axios";

export const subcategoryService = {
  /**
   * Lấy danh sách sản phẩm theo categoryId
   * @returns Promise với danh sách sản phẩm
   */
  getSubcategoryById: async (id: number) => {
    return Axios.get(`/api/public/category/findById/${id}`);
  }
};

import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy thông tin danh mục theo id
   * @param id - Slug của danh mục
   * @returns Promise với thông tin danh mục và các danh mục con
   */
  getCategoryById: (id: string) => {
    return Axios.get(`/api/public/category/getCategoryByParent/${id}`);
  },
};
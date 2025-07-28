import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy thông tin danh mục theo slug
   * @param slug - Slug của danh mục
   * @returns Promise với thông tin danh mục và các danh mục con
   */
  getCategoryBySlug: (slug: string) => {
    return Axios.get(`/api/public/category/getBySlug/${slug}`);
  },
};
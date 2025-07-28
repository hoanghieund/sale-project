import { Axios } from "@/api/Axios";
import { Category } from "@/types";

export const subcategoryService = {
  /**
   * Lấy thông tin danh mục con theo slug
   * @param slug - Slug của danh mục con
   * @returns Promise với thông tin danh mục con
   */
  getSubcategoryBySlug: async (slug: string): Promise<Category> => {
    return await Axios.get(`/categories/slug/${slug}`);
  },
};

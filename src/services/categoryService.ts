import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy danh mục tree
   * @returns Promise với danh sách danh mục
   */
  getAllCategory: () => {
    return Axios.get(`/api/public/category/get_tree_category`);
  },

  /**
   * Lấy danh mục gợi ý con
   * @returns Promise với thông tin danh mục
   */
  getSuggestCategoryChild: () => {
    return Axios.get(`/api/public/category/get-all-child-category-suggest`);
  },
};

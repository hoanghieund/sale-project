import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy danh sách danh mục
   * @param pageIndex - Trang hiện tại
   * @param pageSize - Số lượng danh mục trên một trang
   * @returns Promise với danh sách danh mục
   */
  getCategories: (pageIndex, pageSize) => {
    return Axios.get(`/api/public/category/getAll/${pageIndex}/${pageSize}`);
  },

  /**
   * Lấy danh mục tree
   * @param pageIndex - Trang hiện tại
   * @param pageSize - Số lượng danh mục trên một trang
   * @returns Promise với danh sách danh mục
   */
  getCategoryTree: (pageIndex, pageSize) => {
    return Axios.get(`/api/public/category/get_tree_category/${pageIndex}/${pageSize}`);
  },

  /**
   * Lấy danh mục gợi ý
   * @returns Promise với thông tin danh mục
   */
  getSuggestCategory: () => {
    return Axios.get(`/api/public/getSuggestCategory`);
  },
};

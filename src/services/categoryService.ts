import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy danh mục tree
   * @param pageIndex - Trang hiện tại
   * @param pageSize - Số lượng danh mục trên một trang
   * @returns Promise với danh sách danh mục
   */
  getAllCategory: (pageIndex, pageSize) => {
    return Axios.get(
      `/api/public/category/get_tree_category/${pageIndex}/${pageSize}`
    );
  },

  /**
   * Lấy danh mục gợi ý
   * @param pageIndex - Trang hiện tại
   * @param pageSize - Số lượng danh mục trên một trang
   * @returns Promise với thông tin danh mục
   */
  getSuggestCategory: (pageIndex, pageSize) => {
    return Axios.get(
      `/api/public/category/get_tree_category_suggets/${pageIndex}/${pageSize}`
    );
  },
};

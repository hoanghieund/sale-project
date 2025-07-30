import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Lấy danh mục tree
   * @param pageIndex - Trang hiện tại
   * @param pageSize - Số lượng danh mục trên một trang
   * @returns Promise với danh sách danh mục
   */
  getAllCategory: (pageIndex, pageSize) => {
    return Axios.get(`/api/public/category/getAll/${pageIndex}/${pageSize}`);
  },

  /**
   * Lấy danh mục gợi ý
   * @returns Promise với thông tin danh mục
   */
  getSuggestCategory: () => {
    return Axios.get(`/api/public/getSuggestCategory`);
  },
};

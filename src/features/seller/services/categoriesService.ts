import { Axios } from "@/api/Axios";

export const categoriesService = {
  /**
   * @method getCategories
   * @description Lấy danh sách tất cả các danh mục của gian hàng.
   * @returns {Promise<Category[]>} Danh sách các danh mục.
   */
  getCategories: async () => {
    return Axios.get("/categories");
  },
};

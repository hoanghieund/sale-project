import { Axios } from "@/api/Axios";
import { Category } from "@/types";

export const categoriesService = {
  /**
   * @method getCollections
   * @description Lấy danh sách tất cả các danh mục của gian hàng với các tùy chọn lọc và phân trang.
   * @param {Object} params - Các tham số tùy chọn: page, size
   * @returns {Promise<any>} Danh sách các danh mục và thông tin phân trang.
   */
  getCollections: async params => {
    return Axios.get("/api/collections", params);
  },

  /**
   * @method getCollectionById
   * @description Lấy thông tin chi tiết của một danh mục theo ID.
   * @param {string} id - ID của danh mục cần lấy.
   * @returns} Thông tin danh mục.
   */
  getCollectionById: async (id: string) => {
    return Axios.get(`/api/collections/${id}`);
  },

  /**
   * @method createCollection
   * @param {Object} data - Dữ liệu danh mục cần tạo.
   * @param {string} data.name - Tên danh mục.
   * @param {string} data.categoryId - ID của danh mục cha.
   * @returns} Thông tin danh mục đã tạo.
   */
  createCollection: async (data: { name: string; categoryId: number }) => {
    return Axios.post("/api/collections", data);
  },

  /**
   * @method updateCollection
   * @param {string} id - ID của danh mục cần cập nhật.
   * @param {Object} data - Dữ liệu danh mục cần tạo.
   * @param {string} data.name - Tên danh mục.
   * @param {string} data.categoryId - ID của danh mục cha.
   * @returns} Thông tin danh mục đã được cập nhật.
   */
  updateCollection: async (
    id: string,
    data: { name: string; categoryId: number }
  ) => {
    return Axios.put(`/api/collections/${id}`, data);
  },

  /**
   * @method deleteCollection
   * @param {string} id - ID của danh mục cần xóa.
   * @returns
   */
  deleteCollection: async (id: string) => {
    return Axios.del(`/api/collections/${id}`);
  },

  /**
   * @method getTreeCategory
   * @description Lấy danh sách tất cả các danh mục của gian hàng với các tùy chọn lọc và phân trang.
   * @param {number} page - Số trang hiện tại.
   * @param {number} size - Số lượng danh mục trên mỗi trang.
   * @returns {Promise<any>} Danh sách các danh mục và thông tin phân trang.
   */
  getTreeCategory: async (page: number, size: number): Promise<Category[]> => {
    return Axios.get(`/api/public/category/get_tree_category/${page}/${size}`);
  },
};

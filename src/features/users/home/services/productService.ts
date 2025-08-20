import { Axios } from "@/api/Axios";
import { Product } from "@/types";

export const productService = {
  /**
   * Lấy danh sách sản phẩm nổi bật
   * @returns Promise với danh sách sản phẩm
   */
  getFeaturedProducts: () => {
    return Axios.get(`/api/public/product/getRandomProduct`);
  },
  /**
   * Lấy danh sách sản phẩm giảm giá
   * @returns Promise với một mảng các đối tượng Product
   */
  getDiscountedProducts: (): Promise<Product[]> => {
    // Đây là một ví dụ, bạn cần thay thế bằng API endpoint thực tế để lấy sản phẩm giảm giá
    const today = new Date().toISOString().split("T")[0]; // Định dạng yyyy-MM-dd
    return Axios.get(`/api/public/product/getProductIsFlashSaleHomePage`, {
      today,
    });
  },

  /**
   * Lấy danh sách tất cả sản phẩm có phân trang.
   * @param page - Số trang hiện tại.
   * @param size - Số lượng sản phẩm trên mỗi trang.
   * @returns Promise với một đối tượng chứa danh sách Product và tổng số sản phẩm.
   */
  getAllProductsWithPagination: (page: number, size: number) => {
    return Axios.get(`/api/public/product/getAll?page=${page}&size=${size}`);
  },
};

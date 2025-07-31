// src/features/users/product-detail/services/productDetailService.ts
import { Axios } from "@/api/Axios";

export const productDetailService = {
  /**
   * Lấy thông tin chi tiết sản phẩm theo ID
   * @param productId ID của sản phẩm
   * @returns Promise chứa thông tin sản phẩm
   */
  getProductById: async (productId: string) => {
    return Axios.get(`/api/public/product/${productId}`);
  },

  /**
   * Lấy danh sách đánh giá sản phẩm theo ID sản phẩm
   * @param productId ID của sản phẩm
   * @returns Promise chứa danh sách đánh giá
   */
  getReviewsByProductId: async (productId: number) => {
    return Axios.get(`/api/public/comment/getPageCommentParent/10/${productId}`);
  },

  /**
   * Gửi đánh giá mới cho sản phẩm
   * @param productId ID của sản phẩm
   * @param reviewData Dữ liệu đánh giá (rating, comment)
   * @returns Promise chứa kết quả gửi đánh giá
   */
  submitReview: async (productId: string, reviewData: { star: number; content: string }) => {
    return Axios.post(`/api/private/reviews/product/${productId}`, reviewData);
  },
};

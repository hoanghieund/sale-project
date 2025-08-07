// src/features/users/product-detail/services/productDetailService.ts
import { Axios } from "@/api/Axios";

export const productDetailService = {
  /**
   * Fetches product details by ID
   * @param productId Product ID
   * @returns Promise containing product information
   */
  getProductBySlug: async (slug: string) => {
    return Axios.get(`/api/public/product/slug/${slug}`);
  },

  /**
   * Fetches product reviews by product ID
   * @param productId Product ID
   * @returns Promise containing a list of reviews
   */
  getReviewsByProductId: async (productId: number) => {
    return Axios.get(
      `/api/public/comment/getPageCommentParent/10/${productId}`
    );
  },

  /**
   * Submits a new review for a product
   * @param productId Product ID
   * @param reviewData Review data (rating, comment)
   * @returns Promise containing the review submission result
   */
  submitReview: async (payload: FormData) => {
    return Axios.post(`/api/public/comment/create`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * thích sản phẩm
   * @param productId - ID của sản phẩm
   * @returns Promise với thông tin sản phẩm
   */
  likeProduct: (productId: number) => {
    return Axios.get(`/api/interactive/interactive/${productId}`);
  },

  /**
   * bỏ thích sản phẩm
   * @param productId - ID của sản phẩm
   * @returns Promise với thông tin sản phẩm
   */
  unlikeProduct: (productId: number) => {
    return Axios.get(`/api/interactive/deInteractive/${productId}`);
  },
};

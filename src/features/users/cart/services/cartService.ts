import { Axios } from "@/api/Axios";

export const cartService = {

  /**
   * Lấy thông tin giỏ hàng hiện tại của người dùng.
   * @returns Promise chứa danh sách các mặt hàng trong giỏ hàng.
   */
  getCart: () => {
    return Axios.get(`/api/cart/findAll`)
  },

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần cập nhật.
   * @param quantity - Số lượng mới của sản phẩm.
   * @returns Promise chứa thông tin giỏ hàng sau khi cập nhật.
   */
  updateCartItemQuantity: (itemId: string, quantity: number) => {
    return Axios.get(`/api/cart/changeQuantity/${itemId}/${quantity}`)
  },

  /**
   * Xóa một sản phẩm khỏi giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần xóa.
   * @returns Promise chứa thông tin giỏ hàng sau khi xóa.
   */
  removeCartItem: (itemId: string) => {
    return Axios.del(`/api/cart/remove/${itemId}`)
  },

};

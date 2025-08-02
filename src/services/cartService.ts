import { Axios } from "@/api/Axios";

export const cartService = {
  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param productSkusDTO - Đối tượng chứa ID của sản phẩm
   * @param userID - ID của người dùng
   * @param quantity - Số lượng sản phẩm muốn thêm
   * @returns Promise với thông tin giỏ hàng sau khi thêm
   */
  addToCart: (productSkusDTO: { id: number }, quantity: number, userID: number) => {
    return Axios.post(`/api/cart/add`, {
      productSkusDTO,
      userID,
      quantity
    });
  },

  /**
   * Lấy thông tin giỏ hàng hiện tại của người dùng.
   * @param userId - ID của người dùng.
   * @returns Promise chứa danh sách các mặt hàng trong giỏ hàng.
   */
  getCart: (userId: number) => {
    return Axios.get(`/api/cart/${userId}`)
  },

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần cập nhật.
   * @param quantity - Số lượng mới của sản phẩm.
   * @returns Promise chứa thông tin giỏ hàng sau khi cập nhật.
   */
  updateCartItemQuantity: (itemId: string, quantity: number) => {
    return Axios.put(`/api/cart/update-quantity`, {
      itemId,
      quantity,
    })
  },

  /**
   * Xóa một sản phẩm khỏi giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần xóa.
   * @returns Promise chứa thông tin giỏ hàng sau khi xóa.
   */
  removeCartItem: (itemId: string) => {
    return Axios.del(`/api/cart/remove/${itemId}`)
  },

  /**
   * Áp dụng mã giảm giá cho giỏ hàng.
   * @param couponCode - Mã giảm giá cần áp dụng.
   * @returns Promise chứa thông tin mã giảm giá đã áp dụng.
   */
  applyCouponCode: (couponCode: string) => {
    return Axios.post(`/api/coupon/apply`, {
      couponCode,
    })
  },
};

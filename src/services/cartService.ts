import { Axios } from "@/api/Axios";

export const cartService = {
  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param productDTO - Đối tượng chứa ID của sản phẩm
   * @param fitId - ID của fit (nếu có)
   * @param printLocationId - ID của vị trí in (nếu có)
   * @param colorId - ID của màu sắc (nếu có)
   * @param sizeId - ID của kích thước (nếu có)
   * @param quantity - Số lượng sản phẩm muốn thêm
   * @returns Promise với thông tin giỏ hàng sau khi thêm
   */
  addToCart: (
    productDTO: { id: number },
    fitId: number,
    printLocationId: number,
    colorId: number,
    sizeId: number,
    quantity: number
  ) => {
    return Axios.post(`/api/cart/add`, {
      productDTO,
      fitId,
      printLocationId,
      colorId,
      sizeId,
      quantity,
    });
  },

  /**
   * Thêm nhiều sản phẩm vào giỏ hàng
   * @param cartItems - Mảng các đối tượng chứa thông tin sản phẩm và số lượng
   * @returns Promise với thông tin giỏ hàng sau khi thêm
   */

  addMultipleToCart: (
    cartItems: {
      productDTO: { id: number };
      fitId: number;
      printLocationId: number;
      colorId: number;
      sizeId: number;
      quantity: number;
    }[]
  ) => {
    return Axios.post(`/api/cart/addMultiple`, cartItems);
  },

  /**
   * Lấy thông tin giỏ hàng hiện tại của người dùng.
   * @returns Promise chứa danh sách các mặt hàng trong giỏ hàng.
   */
  getCart: () => {
    return Axios.get(`/api/cart/findAll`);
  },

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần cập nhật.
   * @param quantity - Số lượng mới của sản phẩm.
   * @returns Promise chứa thông tin giỏ hàng sau khi cập nhật.
   */
  updateCartItemQuantity: (itemId: string, quantity: number) => {
    return Axios.get(`/api/cart/changeQuantity/${itemId}/${quantity}`);
  },

  /**
   * Xóa một sản phẩm khỏi giỏ hàng.
   * @param itemId - ID của mặt hàng trong giỏ hàng cần xóa.
   * @returns Promise chứa thông tin giỏ hàng sau khi xóa.
   */
  removeCartItem: (itemId: string) => {
    return Axios.del(`/api/cart/remove/${itemId}`);
  },
};

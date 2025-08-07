import { Axios } from "@/api/Axios";

export const cartService = {
  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param productDTO - Đối tượng chứa ID của sản phẩm
   * @param variantValues - Đối tượng chứa các giá trị variant (key-value pairs)
   * @param quantity - Số lượng sản phẩm muốn thêm
   * @returns Promise với thông tin giỏ hàng sau khi thêm
   */
  addToCart: (
    productDTO: { id: number },
    variantValues: Record<string, number>,
    quantity: number
  ) => {
    // Tạo payload cơ bản
    const payload: any = {
      productDTO,
      quantity,
      optionIds: [] as number[],
    };

    // Thêm các key-value pairs từ variantValues vào payload như các trường riêng biệt
    Object.entries(variantValues).forEach(([key, value]) => {
      payload.optionIds.push(value);
    });

    return Axios.post(`/api/cart/add`, payload);
  },

  /**
   * Thêm nhiều sản phẩm vào giỏ hàng
   * @param cartItems - Mảng các đối tượng chứa thông tin sản phẩm và số lượng
   * @returns Promise với thông tin giỏ hàng sau khi thêm
   */

  addMultipleToCart: (
    cartItems: {
      productDTO: { id: number };
      variantValues: Record<string, number>;
      quantity: number;
    }[]
  ) => {
    // Xử lý variantValues cho từng cartItem
    const processedCartItems = cartItems.map(item => {
      const { variantValues, ...rest } = item;
      const processedItem: any = { ...rest };
      processedItem.optionIds = [] as number[];

      // Thêm các key-value pairs từ variantValues vào processedItem như các trường riêng biệt
      Object.entries(variantValues).forEach(([key, value]) => {
        processedItem.optionIds.push(value);
      });

      return processedItem;
    });

    return Axios.post(`/api/cart/add-multiple`, {
      cartItems: processedCartItems,
    });
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

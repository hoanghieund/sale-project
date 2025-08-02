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
};

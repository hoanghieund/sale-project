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
  addToCart: (productDTO: { id: number }, fitId: number, printLocationId: number, colorId: number, sizeId: number, quantity: number,) => {
    return Axios.post(`/api/cart/add`, {
      productDTO,
      fitId,
      printLocationId,
      colorId,
      sizeId,
      quantity
    });
  },
};

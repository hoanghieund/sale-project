import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo categoryId
   * @param categoryParentId - ID của danh mục cha
   * @param page - Trang hiện tại
   * @param size - Số lượng sản phẩm trên một trang
   * @returns Promise với danh sách sản phẩm
   */
  getProductsByCategoryId: (categoryParentId: number, page: number, size: number) => {
    return Axios.get(`/api/public/product/getProductByManyThing`,{
      categoryParentId,
      page,
      size
    });
  },
};
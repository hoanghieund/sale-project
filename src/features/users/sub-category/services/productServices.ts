import { Axios } from "@/api/Axios";

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo subcategoryId
   * @param categoryParentId - ID của danh mục cha
   * @param categoryChildId - ID của danh mục con
   * @param page - Trang hiện tại
   * @param size - Số lượng sản phẩm trên một trang
   * @returns Promise với danh sách sản phẩm
   */
  getProductsBySubCategoryId: async (categoryParentId: number, categoryChildId: number, page: number, size: number) => {
    return Axios.get(`/api/public/product/getProductByManyThing`,{
      categoryParentId,
      categoryChildId,
      page,
      size
    });
  }
};

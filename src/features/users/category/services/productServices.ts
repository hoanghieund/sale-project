import { Axios } from "@/api/Axios";

// Interface cho params bộ lọc sản phẩm theo category
interface GetProductsByCategoryParams {
  categoryParentId: number;
  categoryChildId?: number;
  currentPage: number;
  pageSize: number;
  popular?: boolean;
  latest?: boolean;
  bestSell?: boolean;
  price?: string; // "asc" | "desc" | ""
  priceFrom?: string | number;
  priceTo?: string | number;
}

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo categoryId với bộ lọc
   * @param params - Tham số lọc sản phẩm
   * @returns Promise với dữ liệu phân trang sản phẩm và thông tin danh mục
   */
  getProductsByCategoryId: (params: GetProductsByCategoryParams) => {
    return Axios.get(`/api/public/product/getProductByManyThing`, {
      categoryParentId: params.categoryParentId,
      categoryChildId: params.categoryChildId,
      page: params.currentPage,
      size: params.pageSize,
      popular: params.popular,
      latest: params.latest,
      bestSell: params.bestSell,
      price: params.price,
      priceFrom: params.priceFrom,
      priceTo: params.priceTo,
    });
  },

  /**
   * Lấy danh sách sản phẩm theo categoryId (phương thức cũ để backward compatibility)
   * @param categoryParentId - ID của danh mục cha
   * @param page - Trang hiện tại
   * @param size - Số lượng sản phẩm trên một trang
   * @returns Promise với danh sách sản phẩm
   */
  getProductsByCategoryIdSimple: (categoryParentId: number, page: number, size: number) => {
    return Axios.get(`/api/public/product/getProductByManyThing`, {
      categoryParentId,
      page,
      size
    });
  },
};
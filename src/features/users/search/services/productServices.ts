import { Axios } from "@/api/Axios";

// Interface cho params tìm kiếm sản phẩm theo từ khóa
interface GetProductsBySearchKeywordParams {
  keyword: string;
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
   * Lấy danh sách sản phẩm theo từ khóa tìm kiếm
   * @param params - Tham số tìm kiếm sản phẩm
   * @returns Promise với dữ liệu phân trang sản phẩm
   */
  getProductsBySearchKeyword: (params: GetProductsBySearchKeywordParams) => {
    return Axios.get(`/api/public/product/getProductByManyThing`, {
      keyword: params.keyword,
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
};
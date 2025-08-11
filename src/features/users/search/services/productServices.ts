import { Axios } from "@/api/Axios";

// Interface cho params tìm kiếm sản phẩm theo từ khóa
interface GetProductsBySearchKeywordParams {
  keyword: string;
  currentPage: number;
  pageSize: number;
}

export const productService = {
  /**
   * Lấy danh sách sản phẩm theo từ khóa tìm kiếm
   * @param params - Tham số tìm kiếm sản phẩm
   * @returns Promise với dữ liệu phân trang sản phẩm
   */
  getProductsBySearchKeyword: (params: GetProductsBySearchKeywordParams) => {
    return Axios.get(`/api/public/product/getAll`, {
      keyword: params.keyword,
      page: params.currentPage,
      size: params.pageSize,
    });
  },
};

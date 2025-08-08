import { Axios } from "@/api/Axios";

// Interface for product filter parameters by category
interface GetProductsByCategoryParams {
  sort: "asc" | "desc";
  keyword: string;
  currentPage: number;
  pageSize: number;
}

export const productService = {
  /**
   * Retrieves a list of products by categoryId with filters.
   * @param params - Product filter parameters.
   * @returns A Promise with paginated product data and category information.
   */
  getProductsByCategorySlug: (
    slug: string,
    params: GetProductsByCategoryParams
  ) => {
    return Axios.get(`/api/public/products/by-category/slug/${slug}`, {
      page: params.currentPage,
      size: params.pageSize,
      sort: params.sort,
      keyword: params.keyword,
    });
  },

  /**
   * Retrieves a list of products by categoryId (old method for backward compatibility).
   * @param categoryParentId - The ID of the parent category.
   * @param page - The current page number.
   * @param size - The number of products per page.
   * @returns A Promise with the list of products.
   */
  getProductsByCategoryIdSimple: (
    categoryParentId: number,
    page: number,
    size: number
  ) => {
    return Axios.get(`/api/public/product/getProductByManyThing`, {
      categoryParentId,
      page,
      size,
    });
  },
};

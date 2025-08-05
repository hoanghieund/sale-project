import { Axios } from "@/api/Axios";

// Interface for product filter parameters by category
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
   * Retrieves a list of products by categoryId with filters.
   * @param params - Product filter parameters.
   * @returns A Promise with paginated product data and category information.
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
   * Retrieves a list of products by categoryId (old method for backward compatibility).
   * @param categoryParentId - The ID of the parent category.
   * @param page - The current page number.
   * @param size - The number of products per page.
   * @returns A Promise with the list of products.
   */
  getProductsByCategoryIdSimple: (categoryParentId: number, page: number, size: number) => {
    return Axios.get(`/api/public/product/getProductByManyThing`, {
      categoryParentId,
      page,
      size
    });
  },
};
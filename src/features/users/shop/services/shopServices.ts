import { Axios } from "../../../../api/Axios";

export const shopService = {
  /**
   * Retrieves a list of products by categoryId.
   * @param payload - Object containing information for the API request.
   */
  getProductsByCategoryId: async (payload: {
    id: number;
    page: number;
    size: number;
    sort: "asc" | "desc";
  }) => {
    return Axios.get(
      `/api/public/products/by-collection/${payload.id}`,
      payload
    );
  },

  /**
   * Retrieves shop information by slug.
   * @param slug - The slug of the shop.
   */
  getShopInfo: async (slug: string) => {
    return Axios.get(`/api/public/collection/by-shop/slug/${slug}`);
  },
};

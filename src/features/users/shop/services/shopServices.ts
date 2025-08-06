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
  }) => {
    return Axios.get(
      `/api/public/products/by-collection/${payload.id}`,
      payload
    );
  },

  /**
   * Retrieves a category by shopId.
   * @param shopId - The ID of the shop to retrieve.
   */
  getCategoryByShopId: async (shopId: number) => {
    return Axios.get(`/api/public/collection/by-shop/${shopId}`);
  },
};

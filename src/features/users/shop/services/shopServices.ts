import { Axios } from "../../../../api/Axios";

/**
 * @function getProductsByShopId
 * @description Retrieves a list of products belonging to a shop by shopId.
 * @param payload - Object containing information for the API request.
 */
export const getProductsByShopId = async (payload: {
  id: number;
  currentPage: number;
  pageSize: number;
  listIdChild: number[];
  popular: boolean;
  latest: boolean;
  bestSell: boolean;
  price: boolean;
  priceFrom: number | string;
  priceTo: number | string;
}) => {
  return Axios.get(`/api/public/products/by-collection/${payload.id}`);
};

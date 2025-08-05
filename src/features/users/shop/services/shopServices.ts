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
  return Axios.get(
    `/api/public/product/getProductByShop?shopId=${payload.id}&page=${payload.currentPage}&size=${payload.pageSize}&status=true&categoryChildId=${payload.listIdChild}&popular=${payload.popular}&latest=${payload.latest}&bestSell=${payload.bestSell}&price=${payload.price}&priceFrom=${payload.priceFrom}&priceTo=${payload.priceTo}`
  );
};

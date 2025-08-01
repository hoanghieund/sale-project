import { Axios } from "../../../../api/Axios";

/**
 * @function getProductsByShopId
 * @description Lấy danh sách sản phẩm thuộc về một cửa hàng bằng shopId.
 * @param payload - Đối tượng chứa thông tin cho yêu cầu API.
 */
export const getProductsByShopId = async (payload: {
  id: number;
  currentPage: number;
  pageSize: number;
  listIdChild: number[];
  popular: boolean;
  latest: boolean;
  bestSell: boolean;
  price: string;
  priceFrom: number | string;
  priceTo: number | string;
}) => {
    return Axios.get(`/api/public/product/getProductByShop?shopId=${payload.id}&page=${payload.currentPage}&size=${payload.pageSize}&status=true&categoryChildId=${payload.listIdChild}&popular=${payload.popular}&latest=${payload.latest}&bestSell=${payload.bestSell}&price=${payload.price}&priceFrom=${payload.priceFrom}&priceTo=${payload.priceTo}`);
};
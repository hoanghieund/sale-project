import { Axios } from "../../../../api/Axios";
import { Product, Shop } from "../../../../types";

/**
 * @function getShopBySlug
 * @description Lấy thông tin cửa hàng bằng shopSlug.
 * @param {string} shopSlug - Slug của cửa hàng.
 * @returns {Promise<Shop | null>} Thông tin cửa hàng hoặc null nếu không tìm thấy.
 */
export const getShopBySlug = async (shopSlug: string): Promise<Shop | null> => {
  try {
    const response = await Axios.get(`/api/shops/${shopSlug}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin cửa hàng với slug ${shopSlug}:`, error);
    return null;
  }
};

/**
 * @function getProductsByShopId
 * @description Lấy danh sách sản phẩm thuộc về một cửa hàng bằng shopId.
 * @param {number} shopId - ID của cửa hàng.
 * @returns {Promise<Product[]>} Danh sách sản phẩm.
 */
export const getProductsByShopId = async (shopId: number): Promise<Product[]> => {
  try {
    const response = await Axios.get(`/api/products?shopId=${shopId}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm cho cửa hàng với ID ${shopId}:`, error);
    return [];
  }
};
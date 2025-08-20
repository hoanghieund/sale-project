import { Axios } from "@/api/Axios";
import { Shop } from "@/types";

/**
 * Service để xử lý các yêu cầu liên quan đến shop
 */
export const shopService = {
  /**
   * Lấy danh sách các shop nổi bật
   * @param limit - Số lượng shop muốn lấy
   * @returns Danh sách các shop nổi bật
   */
  getFeaturedShops: async (limit: number = 6): Promise<Shop[]> => {
    try {
      // API endpoint để lấy danh sách shop nổi bật
      const response = await Axios.get(`/api/public/shops/featured`, { limit });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách shop nổi bật:", error);
      return [];
    }
  },
};

import { Axios } from "@/api/Axios";
import { Product, StatsGroupBy, StatsOverview, TimeSeriesPoint } from "@/types";

/**
 * Seller Dashboard Stats Service
 * Provide methods to call API statistics based on backend requirements.
 * Keep consistent with Axios wrapper to automatically attach token & handle 401 errors.
 */

export interface StatsParams {
  /** Định dạng YYYY-MM-DD */
  fromDate: string;
  /** Định dạng YYYY-MM-DD */
  toDate: string;
  /** day|week|month|year */
  groupBy: StatsGroupBy;
}

/**
 * Params cho API top-products (không cần groupBy)
 */
export interface TopProductsParams {
  /** Định dạng YYYY-MM-DD */
  fromDate: string;
  /** Định dạng YYYY-MM-DD */
  toDate: string;
  /** Số lượng giới hạn sản phẩm trả về */
  limit?: number;
}

export const dashboardService = {
  /**
   * Lấy thống kê tổng quan theo khoảng ngày và groupBy.
   * GET /api/shop/stats/overview?fromDate&toDate&groupBy
   */
  getOverviewStats: async (params: StatsParams): Promise<StatsOverview> => {
    return Axios.get("/api/shop/stats/overview", params);
  },

  /**
   * Lấy chuỗi thời gian (phục vụ biểu đồ cột/đường) theo khoảng ngày và groupBy.
   * GET /api/shop/stats/timeseries?fromDate&toDate&groupBy
   */
  getTimeSeriesStats: async (
    params: StatsParams
  ): Promise<TimeSeriesPoint[]> => {
    return Axios.get("/api/shop/stats/timeseries", params);
  },

  /**
   * Lấy top sản phẩm bán chạy theo khoảng ngày, optional limit.
   * GET /api/shop/stats/top-products?fromDate&toDate&limit
   */
  getTopProductsStats: async (
    params: TopProductsParams
  ): Promise<Product[]> => {
    return Axios.get("/api/shop/stats/top-products", params);
  },
};

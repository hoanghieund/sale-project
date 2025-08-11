import { Axios } from "@/api/Axios";

export const dashboardService = {
  getDashboardStats: async () => {
    return Axios.get("/api/dashboard/stats");
  },
};

import { Axios } from "@/api/Axios";

export const profileService = {
  /**
   * Lấy thông tin hồ sơ người dùng
   * @param userId - ID của người dùng
   * @returns Promise với thông tin hồ sơ người dùng
   */
  getUserProfile: async ( userId: number) => {
    return Axios.get(`/api/user/get_current_user/${userId}`);
  },
};

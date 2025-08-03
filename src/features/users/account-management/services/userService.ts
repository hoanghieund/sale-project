import { Axios } from "@/api/Axios";

/**
 * Dịch vụ người dùng
 * @module userService
 */
export const userService = {
  /**
   * Thay đổi mật khẩu của người dùng.
   * @param oldPassword - Mật khẩu hiện tại của người dùng.
   * @param newPassword - Mật khẩu mới của người dùng.
   * @param userId - ID của người dùng.
   * @returns Promise khi thay đổi mật khẩu thành công.
   */
  changePassword: async (oldPassword: string, newPassword: string , userId: number) => {
    return await Axios.post("/api/user/updatePassWord", {
      id: userId,
      oldPassword,
      newPassword,
    });
  },
};
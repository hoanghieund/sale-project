import { Axios } from "@/api/Axios";

/**
 * User service
 * @module userService
 */
export const userService = {
 /**
  * Changes the user's password.
  * @param oldPassword - The user's current password.
  * @param newPassword - The user's new password.
  * @param userId - The user's ID.
  * @returns Promise upon successful password change.
  */
  changePassword: async (oldPassword: string, newPassword: string , userId: number) => {
    return await Axios.post("/api/user/updatePassWord", {
      id: userId,
      oldPassword,
      newPassword,
    });
  },
};
import { Axios } from "../api/Axios";
import { User } from "../types";

/**
 * Service xử lý các chức năng liên quan đến xác thực và quản lý người dùng
 */
export const authService = {
  /**
   * Đăng nhập người dùng
   * @param email - Email
   * @param password - Mật khẩu
   * @returns Promise với dữ liệu người dùng và token
   */
  login: (email: string, password: string) => {
    return Axios.post("/api/auth/signin", { email, password });
  },

  /**
   * Đăng ký người dùng mới
   * @param userData - Thông tin đăng ký
   * @returns Promise với dữ liệu người dùng đã đăng ký
   */
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    return Axios.post("/api/auth/signup", userData);
  },

  /**
   * Đăng xuất người dùng
   * @returns Promise xác nhận đăng xuất thành công
   */
  logout: () => {
    return Axios.post("/api/auth/signout");
  },

  /**
   * Lấy thông tin người dùng hiện tại
   * @returns Promise với dữ liệu người dùng
   */
  getCurrentUser: () => {
    return Axios.get("/api/users/me");
  },

  /**
   * Cập nhật thông tin người dùng
   * @param userData - Thông tin cần cập nhật
   * @returns Promise với dữ liệu người dùng đã cập nhật
   */
  updateProfile: (userData: Partial<User>) => {
    return Axios.put("/api/users/profile", userData);
  },

  /**
   * Thay đổi mật khẩu người dùng
   * @param currentPassword - Mật khẩu hiện tại
   * @param newPassword - Mật khẩu mới
   * @returns Promise xác nhận thay đổi mật khẩu thành công
   */
  changePassword: (currentPassword: string, newPassword: string) => {
    return Axios.put("/api/users/change-password", {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Yêu cầu đặt lại mật khẩu
   * @param email - Email đăng ký
   * @returns Promise xác nhận yêu cầu đặt lại mật khẩu thành công
   */
  /**
   * Yêu cầu đặt lại mật khẩu
   * @param email - Email đăng ký
   * @returns Promise xác nhận yêu cầu đặt lại mật khẩu thành công
   */
  requestPasswordReset: (email: string) => {
    return Axios.post("/api/auth/forgot-password", { email });
  },

  /**
   * Gửi yêu cầu khôi phục mật khẩu
   * @param email - Email của người dùng
   * @returns Promise xác nhận yêu cầu đã được gửi
   */
  forgotPassword: (email: string) => {
    return Axios.post("/api/auth/forgot-password", { email });
  },

  /**
   * Đặt lại mật khẩu với token
   * @param token - Token đặt lại mật khẩu
   * @param newPassword - Mật khẩu mới
   * @returns Promise xác nhận đặt lại mật khẩu thành công
   */
  resetPassword: (token: string, newPassword: string) => {
    return Axios.post("/api/auth/reset-password", {
      token,
      newPassword,
    });
  },

  /**
   * Xác thực email người dùng
   * @param token - Token xác thực email
   * @returns Promise xác nhận xác thực email thành công
   */
  verifyEmail: (token: string) => {
    return Axios.post("/api/auth/verify-email", { token });
  },

  /**
   * Làm mới token xác thực
   * @param refreshToken - Token làm mới
   * @returns Promise với token mới
   */
  refreshToken: (refreshToken: string) => {
    return Axios.post("/api/auth/refreshtoken", { refreshToken });
  },
};

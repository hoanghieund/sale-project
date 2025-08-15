import { Axios } from "../api/Axios";

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
  register: (userData: FormData) => {
    return Axios.post("/api/public/registerWithoutVerify", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Lấy thông tin hồ sơ người dùng
   * @returns Promise với thông tin hồ sơ người dùng
   */
  getUserProfile: async () => {
    return Axios.get(`/api/user/me`);
  },

  /**
   * Gửi yêu cầu khôi phục mật khẩu
   * @param email - Email
   * @returns Promise xác nhận gửi yêu cầu thành công
   */
  forgotPassword: (data: FormData) => {
    return Axios.post("/api/auth/forgot-password", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Đặt lại mật khẩu với token
   * @param token - Token đặt lại mật khẩu
   * @param newPassword - Mật khẩu mới
   * @returns Promise xác nhận đặt lại mật khẩu thành công
   */
  resetPassword: (newPassword: string, token: string) => {
    return Axios.post("/api/auth/reset-password", {
      newPassword,
      token,
    });
  },

  /**
   * Xác thực tài khoản của người dùng
   * @param token - Token xác thực email
   * @returns Promise xác nhận xác thực email thành công
   */
  verifyAccount: (token: string) => {
    return Axios.get("/api/auth/signup-user/active", { token });
  },

  /**
   * Làm mới token xác thực
   * @param refreshToken - Token làm mới
   * @returns Promise với token mới
   */
  refreshToken: (refreshToken: string) => {
    return Axios.post("/api/auth/refreshtoken", { refreshToken });
  },

  /**
   * Cập nhật thông tin người dùng
   * @param userData - Thông tin người dùng
   * @returns Promise với thông tin người dùng đã cập nhật
   */
  updateProfile: (userData: FormData) => {
    return Axios.post("/api/user/update_profile", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

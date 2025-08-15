/**
 * passwordSchema.ts
 * Chứa các schema validation cho password được sử dụng xuyên suốt ứng dụng
 * Giúp đảm bảo tính nhất quán trong việc validate password
 */

import { z } from "zod";

/**
 * Schema cơ bản cho password
 * Yêu cầu tối thiểu 6 ký tự
 * Sử dụng cho đăng nhập
 */
export const basicPasswordSchema = z.string().min(6, {
  message: "Password must be at least 6 characters long",
});

/**
 * Schema mạnh cho password
 * Yêu cầu tối thiểu 8 ký tự
 * Phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
 * Sử dụng cho đăng ký và đổi mật khẩu
 */
export const strongPasswordSchema = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  );

/**
 * Schema để xác nhận mật khẩu
 * @param passwordField Tên trường mật khẩu cần so sánh
 * @returns Schema Zod với refine để so sánh với trường mật khẩu
 */
export const confirmPasswordSchema = (passwordField: string) =>
  z.string().min(1, { message: "Please confirm your password" });

/**
 * Hàm tạo refine để kiểm tra mật khẩu xác nhận
 * @param passwordField Tên trường mật khẩu cần so sánh
 * @returns Hàm refine để sử dụng trong schema
 */
export const passwordsMatch = (passwordField: string) => {
  return (data: any) => {
    return data.password === data[passwordField];
  };
};

/**
 * Hàm tạo refine để kiểm tra mật khẩu mới và xác nhận mật khẩu mới
 * @param newPasswordField Tên trường mật khẩu mới
 * @param confirmPasswordField Tên trường xác nhận mật khẩu mới
 * @returns Hàm refine để sử dụng trong schema
 */
export const newPasswordsMatch = (
  newPasswordField: string,
  confirmPasswordField: string
) => {
  return (data: any) => {
    return data[newPasswordField] === data[confirmPasswordField];
  };
};

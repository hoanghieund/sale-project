/**
 * @interface UserProfile
 * @description Định nghĩa cấu trúc dữ liệu cho hồ sơ người dùng.
 */
export interface UserProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  shopName?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string; // Tạm thời để string, sẽ dùng Date nếu có DatePicker component
}
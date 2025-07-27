import { Outlet } from "react-router-dom";

/**
 * AuthLayout - Layout đơn giản không có header và footer
 * Sử dụng cho các trang đăng nhập, đăng ký và xác thực
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/10">
      <div className="w-full max-w-lg p-6 bg-background rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

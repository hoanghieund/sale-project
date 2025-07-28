import { useUser } from "@/hooks/use-user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Component bảo vệ các route cần xác thực
 * Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
 * và lưu đường dẫn hiện tại để quay lại sau khi đăng nhập
 */
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useUser();
  const location = useLocation();

  // Nếu không xác thực, chuyển hướng đến trang đăng nhập với returnUrl
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} />;
  }
  // Nếu tài khoản chưa kích hoạt, chuyển hướng đến trang kích hoạt tài khoản
  // if (user && !user?.active) {
  //   return <Navigate to="/activate-account" replace />;
  // }

  // Nếu đã xác thực, hiển thị các route con
  return <Outlet />;
};

export default ProtectedRoute;

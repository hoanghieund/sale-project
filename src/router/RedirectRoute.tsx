import { useUser } from "@/hooks/use-user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Component chuyển hướng người dùng đã đăng nhập khỏi các trang đăng nhập/đăng ký
 * Nếu người dùng đã đăng nhập và cố truy cập các trang này, sẽ được chuyển hướng về trang chủ
 * hoặc trang được chỉ định trong returnUrl (nếu có)
 */
const RedirectRoute = () => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  // Lấy returnUrl từ state nếu có, mặc định là trang chủ
  const returnUrl = location.state?.returnUrl || "/";

  // Nếu đã xác thực, chuyển hướng đến returnUrl hoặc trang chủ
  if (isAuthenticated) {
    return <Navigate to={returnUrl} replace />;
  }

  // Nếu chưa xác thực, hiển thị các route con (trang đăng nhập/đăng ký)
  return <Outlet />;
};

export default RedirectRoute;

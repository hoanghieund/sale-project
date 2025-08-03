import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useUser } from "@/hooks/use-user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Component bảo vệ các route cần xác thực
 * Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
 * và lưu đường dẫn hiện tại để quay lại sau khi đăng nhập
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  // Nếu đang tải dữ liệu người dùng, hiển thị thông báo tải
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Nếu không xác thực, chuyển hướng đến trang đăng nhập với returnUrl
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} />;
  }

  // Nếu đã xác thực, hiển thị các route con
  return <Outlet />;
};

export default ProtectedRoute;

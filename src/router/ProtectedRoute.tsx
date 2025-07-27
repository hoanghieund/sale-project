import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Component bảo vệ các route cần xác thực
 * Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
 * và lưu đường dẫn hiện tại để quay lại sau khi đăng nhập
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Hiển thị thông báo khi người dùng bị chuyển hướng vì chưa đăng nhập
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để truy cập trang này",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isLoading, toast]);

  // Nếu không xác thực, chuyển hướng đến trang đăng nhập với returnUrl
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} />;
  }

  // Nếu đã xác thực, hiển thị các route con
  return <Outlet />;
};

export default ProtectedRoute;

import { useUser } from "@/hooks/use-user";
import { Navigate, Outlet } from "react-router-dom";

const ActiveAccountRoute = () => {
  const { user } = useUser();

  // Nếu đã xác thực, chuyển hướng đến returnUrl hoặc trang chủ
  if (user && !user?.active) {
    return <Navigate to="/activate-account" replace />;
  }

  // Nếu chưa xác thực, hiển thị các route con (trang đăng nhập/đăng ký)
  return <Outlet />;
};

export default ActiveAccountRoute;

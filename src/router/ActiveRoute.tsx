import { useUser } from "@/hooks/use-user";
import { Navigate, Outlet } from "react-router-dom";

const ActiveRoute = () => {
  const { user } = useUser();

    // Nếu chưa xác thực, hiển thị các route con (trang đăng nhập/đăng ký)
  if (user && !user?.active) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ActiveRoute;

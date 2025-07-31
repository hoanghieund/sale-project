import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

/**
 * Component VerifyAccount xử lý logic xác minh tài khoản người dùng
 * thông qua token được gửi trong URL.
 */
export default function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token"); // Trích xuất token từ query parameter

  useEffect(() => {
    // Nếu không có token, hiển thị lỗi và dừng lại
    if (!token) {
      setError("Không tìm thấy token xác minh. Vui lòng thử lại.");
      setIsLoading(false);
      toast({
        title: "Lỗi",
        description: "Không tìm thấy token xác minh. Vui lòng thử lại.",
        variant: "destructive",
      });
      return;
    }

    // Hàm xác minh tài khoản
    const verifyAccount = async () => {
      try {
        // Gọi API xác minh tài khoản
        await authService.verifyAccount(token);
        setIsVerified(true);
        toast({
          title: "Thành công",
          description:
            "Xác minh tài khoản thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.",
        });
        // Chuyển hướng sau 3 giây
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err: any) {
        // Xử lý lỗi từ API
        const errorMessage =
          err.response?.data?.message ||
          "Đã xảy ra lỗi trong quá trình xác minh.";
        setError(errorMessage);
        toast({
          title: "Lỗi",
          description: `Xác minh thất bại: ${errorMessage}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccount();
  }, [token, navigate]); // Thêm token và navigate vào dependency array

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Xác minh tài khoản</CardTitle>
        {isLoading && (
          <CardDescription>Đang xác minh tài khoản của bạn...</CardDescription>
        )}
        {!isLoading && isVerified && (
          <CardDescription className="text-green-600">
            Xác minh thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.
          </CardDescription>
        )}
        {!isLoading && error && (
          <CardDescription className="text-red-600">
            Xác minh thất bại: {error}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {!isLoading && !isVerified && !error && (
          <p className="text-center text-sm text-gray-500">
            Vui lòng đợi trong khi chúng tôi xác minh tài khoản của bạn.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {!isLoading && (isVerified || error) && (
          <Link to="/login" className="text-sm text-new hover:underline">
            Quay lại đăng nhập
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

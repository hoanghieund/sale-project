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
      setError("Token not found. Please try again.");
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Token not found. Please try again.",
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
          title: "Success",
          description:
            "Account verification successful! You will be redirected to the login page.",
        });
        // Chuyển hướng sau 3 giây
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err: any) {
        // Xử lý lỗi từ API
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred during verification.";
        setError(errorMessage);
        toast({
          title: "Error",
          description: `Verification failed: ${errorMessage}`,
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
        <CardTitle className="text-2xl font-bold">Account Verification</CardTitle>
        {isLoading && (
          <CardDescription>Verifying your account...</CardDescription>
        )}
        {!isLoading && isVerified && (
          <CardDescription className="text-green-600">
            Verification successful! You will be redirected to the login page.
          </CardDescription>
        )}
        {!isLoading && error && (
          <CardDescription className="text-red-600">
            Verification failed: {error}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {!isLoading && !isVerified && !error && (
          <p className="text-center text-sm text-gray-500">
            Please wait while we verify your account.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {!isLoading && (isVerified || error) && (
          <Link to="/login" className="text-sm text-new hover:underline">
            Back to Login
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

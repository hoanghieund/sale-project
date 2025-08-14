import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

/**
 * Component VerifyEmail để thông báo người dùng kiểm tra email để xác minh.
 * Nó hiển thị một thông báo và các liên kết điều hướng.
 */
export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Lấy email từ query parameter

  /**
   * Hiển thị cảnh báo nếu không tìm thấy email trong query parameter.
   */
  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email not found. Please go back to the login page.",
        variant: "destructive",
      });
    }
  }, [email]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        {/* Logo dẫn về trang chủ */}
        <Link to="/" aria-label="Go to homepage">
          {/* Tăng kích thước logo để dễ nhìn hơn */}
          <img src="/logo.png" alt="Eulotus logo" className="mx-auto h-14 w-auto mb-2" />
        </Link>
        <CardTitle className="text-2xl font-bold">
          Check your email
        </CardTitle>
        <CardDescription>
          We're excited to have you on board! We've sent a verification link to{" "}
          <strong>{email || "your email address"}</strong>. Please click the link
          to complete the verification process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-gray-500">
          Please check your inbox and spam folder.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Link to="/login" className="text-sm text-new hover:underline">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}

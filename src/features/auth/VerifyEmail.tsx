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
        title: "Lỗi",
        description: "Không tìm thấy email. Vui lòng quay lại trang đăng nhập.",
        variant: "destructive",
      });
    }
  }, [email]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">
          Kiểm tra email của bạn
        </CardTitle>
        <CardDescription>
          Chúng tôi rất vui vì bạn đang đồng hành cùng chúng tôi! Chúng tôi đã
          gửi cho bạn một liên kết xác minh đến địa chỉ email{" "}
          <strong>{email || "của bạn"}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-gray-500">
          Vui lòng kiểm tra hộp thư đến và thư mục spam của bạn.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Link to="/login" className="text-sm text-new hover:underline">
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  );
}

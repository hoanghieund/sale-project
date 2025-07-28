import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // Import useToast hook
import { authService } from "@/services/authService"; // Import authService
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

/**
 * @function ForgotPassword
 * @description Component React cho trang quên mật khẩu.
 * Sử dụng các component Shadcn UI để tạo giao diện người dùng.
 * @returns {JSX.Element} Phần tử JSX hiển thị trang quên mật khẩu.
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // Khởi tạo hook useToast
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  /**
   * @function handleSubmit
   * @description Xử lý khi người dùng gửi form yêu cầu khôi phục mật khẩu.
   * Gửi email đến API và xử lý trạng thái tải cũng như lỗi.
   * @param {React.FormEvent<HTMLFormElement>} e - Sự kiện form.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Tạo đối tượng FormData để gửi dữ liệu
      const formData = new FormData();
      // Thêm trường 'email' vào FormData với giá trị từ state
      formData.append("email", email);
      // Gọi dịch vụ xác thực để khôi phục mật khẩu, truyền đối tượng FormData
      await authService.forgotPassword(formData);
      // Hiển thị thông báo thành công
      toast({
        title: "Thành công!",
        description:
          "Yêu cầu khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.",
        variant: "default",
      });
      // Điều hướng người dùng đến trang nhập mật khẩu mới
      navigate("/reset-password");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu khôi phục mật khẩu:", error);
      // Hiển thị thông báo lỗi
      toast({
        title: "Lỗi!",
        description: error.response.data,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-muted">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Quên mật khẩu</CardTitle>
        <CardDescription className="text-center">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Quay lại trang đăng nhập{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default ForgotPassword;

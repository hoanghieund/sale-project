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
import React, { useState } from "react";

/**
 * @function ResetPassword
 * @description Component React cho trang đặt lại mật khẩu.
 * Sử dụng các component Shadcn UI để tạo giao diện người dùng.
 * @returns {JSX.Element} Phần tử JSX hiển thị trang đặt lại mật khẩu.
 */
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * @function handleSubmit
   * @description Xử lý khi người dùng gửi form đặt lại mật khẩu.
   * @param {React.FormEvent<HTMLFormElement>} e - Sự kiện form.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic xử lý đặt lại mật khẩu (ví dụ: gửi mật khẩu mới đến API)
    console.log("Mật khẩu mới:", newPassword);
    console.log("Xác nhận mật khẩu:", confirmPassword);
    // TODO: Thêm logic gọi API để đặt lại mật khẩu
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-muted">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Đặt lại mật khẩu</CardTitle>
        <CardDescription className="text-center">
          Vui lòng nhập mật khẩu mới của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 mb-4">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Đặt lại mật khẩu
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {/* Có thể thêm liên kết quay lại trang đăng nhập nếu cần */}
      </CardFooter>
    </div>
  );
};

export default ResetPassword;
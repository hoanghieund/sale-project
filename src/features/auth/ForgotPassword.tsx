import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

// Định nghĩa schema validation sử dụng Zod
const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ." }),
});

/**
 * @function ForgotPassword
 * @description Component React cho trang quên mật khẩu.
 * Sử dụng các component Shadcn UI và React Hook Form để tạo giao diện người dùng và quản lý form.
 * @returns {JSX.Element} Phần tử JSX hiển thị trang quên mật khẩu.
 */
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Khởi tạo form với React Hook Form và Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * @function onSubmit
   * @description Xử lý khi người dùng gửi form yêu cầu khôi phục mật khẩu.
   * Gửi email đến API và xử lý trạng thái tải cũng như lỗi.
   * @param {z.infer<typeof formSchema>} values - Dữ liệu form đã được validate.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      await authService.forgotPassword(formData);
      toast({
        title: "Thành công!",
        description:
          "Yêu cầu khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.",
        variant: "default",
      });
      navigate("/reset-password");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu khôi phục mật khẩu:", error);
      toast({
        title: "Lỗi!",
        description: error.response?.data?.message || "Đã xảy ra lỗi không mong muốn.",
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
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Quay lại trang đăng nhập{" "}
          <Link to="/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default ForgotPassword;

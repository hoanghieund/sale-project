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
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

/**
 * @constant passwordResetSchema
 * @description Schema validation sử dụng Zod để xác thực biểu mẫu đặt lại mật khẩu.
 * - `newPassword`: Phải là chuỗi, tối thiểu 6 ký tự.
 * - `confirmPassword`: Phải là chuỗi.
 * - Sử dụng `.refine` để đảm bảo `newPassword` và `confirmPassword` khớp nhau.
 */
const passwordResetSchema = z
  .object({
    newPassword: z.string().min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

/**
 * @function ResetPassword
 * @description Component React cho trang đặt lại mật khẩu, sử dụng react-hook-form và Zod.
 * @returns {JSX.Element} Phần tử JSX hiển thị trang đặt lại mật khẩu.
 */
const ResetPassword = () => {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("email");

  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  /**
   * @function onSubmit
   * @description Xử lý khi người dùng gửi biểu mẫu sau khi đã được xác thực.
   * @param {PasswordResetFormValues} data - Dữ liệu từ biểu mẫu.
   */
  const onSubmit = async (data: PasswordResetFormValues) => {
    try {
      // Gọi service để đặt lại mật khẩu
      await authService.resetPassword(data.newPassword, token);
      // Điều hướng người dùng đến trang đăng nhập sau khi thành công
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đặt lại mật khẩu:", error);
      // Có thể thêm toast notification để thông báo lỗi cho người dùng ở đây
    }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Đặt lại mật khẩu
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {/* Có thể thêm liên kết quay lại trang đăng nhập nếu cần */}
      </CardFooter>
    </div>
  );
};

export default ResetPassword;

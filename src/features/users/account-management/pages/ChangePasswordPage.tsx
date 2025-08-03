// src/features/users/account-management/pages/ChangePasswordPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import { userService } from "../services/userService"; // Import userService

// Định nghĩa schema validation cho form
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Mật khẩu hiện tại phải có ít nhất 6 ký tự.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message: "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.",
    }),
  confirmNewPassword: z.string().min(8, {
    message: "Xác nhận mật khẩu mới phải có ít nhất 8 ký tự.",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu mới và xác nhận mật khẩu mới không khớp.",
  path: ["confirmNewPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

/**
 * @component ChangePasswordPage
 * @description Trang cho phép người dùng thay đổi mật khẩu.
 * Sử dụng react-hook-form và zod để validation.
 */
const ChangePasswordPage: React.FC = () => {
 const {user} = useUser();
 const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
 const form = useForm<PasswordFormValues>({
   resolver: zodResolver(passwordFormSchema),
   defaultValues: {
     currentPassword: "",
     newPassword: "",
     confirmNewPassword: "",
   },
   mode: "onChange",
 });

 async function onSubmit(data: PasswordFormValues) {
   setIsLoading(true);
   try {
     await userService.changePassword(data.currentPassword, data.newPassword , user.id);
     toast({
       title: "Thành công!",
       description: "Mật khẩu của bạn đã được thay đổi thành công.",
       variant: "default",
     });
     form.reset(); // Reset form sau khi thành công
   } catch (error) {
     console.error("Lỗi khi thay đổi mật khẩu:", error);
     toast({
       title: "Lỗi!",
       description: "Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại.",
       variant: "destructive",
     });
   } finally {
     setIsLoading(false);
   }
 }

 return (
   <Card className="w-full bg-white">
     <CardHeader>
       <CardTitle className="text-lg">Đổi mật khẩu</CardTitle>
      </CardHeader>
      <CardContent className="px-4"> {/* Thêm padding */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Trường Mật khẩu hiện tại */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Nhập mật khẩu hiện tại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trường Mật khẩu mới */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trường Xác nhận mật khẩu mới */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Xác nhận mật khẩu mới" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordPage;
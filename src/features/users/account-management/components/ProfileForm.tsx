// src/features/users/account-management/components/ProfileForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useCallback, useRef } from "react"; // Thêm import useRef và useCallback
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Thêm import cho Avatar components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

// Định nghĩa schema validation cho form
const profileFormSchema = z.object({
  avatar: z.union([z.string(), z.instanceof(File)]).optional(), // Avatar có thể là string (URL) hoặc File
  username: z
    .string()
    .min(2, { message: "Tên phải có ít nhất 2 ký tự." })
    .max(50, { message: "Tên không được vượt quá 50 ký tự." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, { message: "Số điện thoại không hợp lệ." }),
  shopName: z
    .string()
    .max(100, { message: "Tên cửa hàng không được vượt quá 100 ký tự." })
    .optional(),
  gender: z.boolean({
    required_error: "Vui lòng chọn giới tính.",
  }),
  dateOfBirth: z.date({
    required_error: "Ngày sinh là bắt buộc.",
  }),
  file: z.instanceof(File).optional(), // Thêm trường file để xử lý upload ảnh
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

/**
 * @component ProfileForm
 * @description Form để chỉnh sửa thông tin hồ sơ người dùng.
 * Sử dụng react-hook-form và zod để validation.
 */
export function ProfileForm(s) {
  const { user , updateProfile } = useUser();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: user?.avatar || "", // Khởi tạo trường avatar
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      shopName: user?.shopName || "",
      // Chuyển đổi giới tính từ chuỗi sang boolean: true cho "male", false cho "female"
      gender: user?.gender === "male" ? true : false,
      // Tính toán dateOfBirth từ dayOfBirth, monthOfBirth, yearOfBirth
      dateOfBirth:
        user.yearOfBirth &&
        user.monthOfBirth &&
        user.dayOfBirth
          ? new Date(
              user.yearOfBirth,
              user.monthOfBirth - 1, // Tháng trong JavaScript là 0-indexed
              user.dayOfBirth
            )
          : undefined,
    },
    mode: "onChange",
  });

  // Tạo một ref cho input file
  const inputRef = useRef<HTMLInputElement>(null);

  // Xử lý click vào avatar để kích hoạt input file
  const handleAvatarClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // Xử lý khi người dùng chọn file
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = e.target.files?.[0];
      if (file) {
        // Cập nhật trường 'file' với đối tượng File thực tế
        form.setValue("file", file);

        // Đọc file để hiển thị preview cho trường 'avatar'
        const reader = new FileReader();
        reader.onloadend = () => {
          field.onChange(reader.result as string); // Cập nhật giá trị avatar trong form (preview URL)
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  async function onSubmit(data: ProfileFormValues) {
    try {
      let formData = new FormData();
      formData.append("id", user.id.toString()); // Chuyển đổi id sang string
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("shopName", data.shopName || "");
      // Thêm file vào formData nếu có
      if (data.file) {
        formData.append("file", data.file);
      }
      // Chuyển đổi giá trị boolean của giới tính thành chuỗi để gửi đi
      formData.append("gender", data.gender ? "true" : "false");

      // Xử lý ngày sinh
      if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth);
        formData.append("dayOfBirth", date.getDate().toString());
        formData.append("monthOfBirth", (date.getMonth() + 1).toString()); // Tháng trong JS là 0-indexed
        formData.append("yearOfBirth", date.getFullYear().toString());
      }

      await updateProfile(formData);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Trường Avatar */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-4">
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                {/* Khi click vào div này sẽ kích hoạt input file */}
                <div
                  className="relative w-24 h-24 cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {/* Hiển thị Avatar */}
                  <Avatar className="w-full h-full">
                    {field.value && typeof field.value === "string" && (
                      <AvatarImage src={field.value} alt="Ảnh đại diện" />
                    )}
                    {field.value && field.value instanceof File && (
                      <AvatarImage src={URL.createObjectURL(field.value)} alt="Ảnh đại diện" />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* Input file ẩn, được kích hoạt bởi click vào Avatar */}
                  <Input
                    ref={inputRef} // Gán ref
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => handleFileChange(e, field)} // Xử lý thay đổi file
                    accept="image/*" // Chỉ cho phép chọn file ảnh
                  />
                </div>
              </FormControl>
              <FormDescription>Tải lên ảnh đại diện của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nhóm các trường Name, Email, Phone, Gender, Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trường Name */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đầy đủ</FormLabel>
                <FormControl>
                  <Input placeholder="Tên đầy đủ của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trường Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email của bạn" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trường Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Số điện thoại của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trường Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  {/* RadioGroup cho giới tính */}
                  <RadioGroup
                    // Khi giá trị thay đổi, chuyển đổi chuỗi "true"/"false" thành boolean
                    onValueChange={(value) => field.onChange(value === "true")}
                    // Giá trị mặc định được chuyển đổi từ boolean sang chuỗi "true"/"false"
                    defaultValue={field.value ? "true" : "false"}
                    className="flex"
                  >
                    {/* Lựa chọn Nam */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Nam</FormLabel>
                    </FormItem>
                    {/* Lựa chọn Nữ */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">Nữ</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trường Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Ngày sinh của bạn được sử dụng để tính tuổi.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Trường Shop Name (tùy chọn) */}
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên cửa hàng (tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="Tên cửa hàng của bạn" {...field} />
              </FormControl>
              <FormDescription>
                Nếu bạn là người bán, đây là tên cửa hàng của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Cập nhật hồ sơ</Button>
      </form>
    </Form>
  );
}

// src/features/users/account-management/components/ProfileForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { User } from "@/types";

// Định nghĩa schema validation cho form
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Tên người dùng phải có ít nhất 2 ký tự.",
    })
    .max(30, {
      message: "Tên người dùng không được vượt quá 30 ký tự.",
    }),
  name: z
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
  gender: z.enum(["male", "female", "other"], {
    message: "Vui lòng chọn giới tính.",
  }),
  dateOfBirth: z.date({
    required_error: "Ngày sinh là bắt buộc.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialData: User;
}

/**
 * @component ProfileForm
 * @description Form để chỉnh sửa thông tin hồ sơ người dùng.
 * Sử dụng react-hook-form và zod để validation.
 */
export function ProfileForm({ initialData }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: initialData?.username,
      name: initialData?.username,
      email: initialData?.email,
      phone: initialData?.phone,
      shopName: initialData?.shopName || "",
      gender: initialData?.gender || "other",
      // Tính toán dateOfBirth từ dayOfBirth, monthOfBirth, yearOfBirth
      dateOfBirth:
        initialData.yearOfBirth && initialData.monthOfBirth && initialData.dayOfBirth
          ? new Date(
              initialData.yearOfBirth,
              initialData.monthOfBirth - 1, // Tháng trong JavaScript là 0-indexed
              initialData.dayOfBirth
            )
          : undefined,
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Bạn đã gửi các giá trị sau:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Trường Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input placeholder="Tên người dùng của bạn" {...field} />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật hoặc
                một biệt danh.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nhóm các trường Name, Email, Phone, Gender, Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trường Name */}
          <FormField
            control={form.control}
            name="name"
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
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Nam</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Nữ</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Khác</FormLabel>
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
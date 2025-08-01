// src/features/users/account-management/components/AddressForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Address } from '@/features/users/account-management/types/address';

// Định nghĩa schema validation cho form sử dụng Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống." }),
  phone: z.string().min(1, { message: "Số điện thoại không được để trống." }).regex(/^\d+$/, { message: "Số điện thoại không hợp lệ." }),
  address: z.string().min(1, { message: "Địa chỉ không được để trống." }),
});

/**
 * @interface AddressFormProps
 * @description Props cho component AddressForm.
 * @property {Address | null} initialData Dữ liệu địa chỉ ban đầu nếu đang chỉnh sửa.
 * @property {(data: Omit<Address, 'id'>) => void} onSubmit Hàm callback khi form được submit.
 * @property {() => void} onCancel Hàm callback khi hủy bỏ form.
 */
interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (data: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

/**
 * @function AddressForm
 * @description Component form để thêm mới hoặc chỉnh sửa địa chỉ.
 * @param {AddressFormProps} props Props của component.
 * @returns {JSX.Element} Element React.
 */
const AddressForm: React.FC<AddressFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      phone: "",
      address: "",
    },
  });

  // Đặt lại giá trị form khi initialData thay đổi (khi chỉnh sửa địa chỉ khác)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({ name: "", phone: "", address: "" });
    }
  }, [initialData, form]);

  /**
   * @function handleSubmit
   * @description Xử lý khi form được submit.
   * @param {z.infer<typeof formSchema>} values Giá trị của form.
   */
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    // Ép kiểu values thành Omit<Address, 'id'> để khớp với kiểu của onSubmit
    onSubmit(values as Omit<Address, 'id'>);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Trường Tên */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên" {...field} className="w-full" /> {/* Thêm w-full */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Số điện thoại */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số điện thoại" {...field} className="w-full" /> {/* Thêm w-full */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Địa chỉ */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập địa chỉ chi tiết" {...field} className="w-full" /> {/* Thêm w-full */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nút lưu và hủy */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit">Lưu địa chỉ</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
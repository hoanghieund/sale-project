// src/features/users/account-management/components/AddressForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
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
import { Address } from '@/types';

// Định nghĩa schema validation cho form sử dụng Zod
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Tên đầy đủ không được để trống." }),
  phoneNumber: z.string().min(1, { message: "Số điện thoại không được để trống." }).regex(/^\d+$/, { message: "Số điện thoại không hợp lệ." }),
  address: z.string().min(1, { message: "Địa chỉ không được để trống." }),
  isCurrent: z.boolean().optional(),
  isShop: z.boolean().optional(),
});

/**
 * @interface AddressFormProps
 * @description Props cho component AddressForm.
 * @property {Address | null} initialData Dữ liệu địa chỉ ban đầu nếu đang chỉnh sửa.
 * @property {(data: Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>) => void} onSubmit Hàm callback khi form được submit.
 * @property {() => void} onCancel Hàm callback khi hủy bỏ form.
 */
interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (data: Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>) => void;
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
    defaultValues: initialData ? {
      fullName: initialData.fullName,
      phoneNumber: initialData.phoneNumber,
      address: initialData.address,
      isCurrent: initialData.isCurrent,
      isShop: initialData.isShop,
    } : {
      fullName: "",
      phoneNumber: "",
      address: "",
      isCurrent: false,
      isShop: false,
    },
  });

  // Đặt lại giá trị form khi initialData thay đổi (khi chỉnh sửa địa chỉ khác)
  useEffect(() => {
    if (initialData) {
      form.reset({
        fullName: initialData.fullName,
        phoneNumber: initialData.phoneNumber,
        address: initialData.address,
        isCurrent: initialData.isCurrent,
        isShop: initialData.isShop,
      });
    } else {
      form.reset({
        fullName: "",
        phoneNumber: "",
        address: "",
        isCurrent: false,
        isShop: false,
      });
    }
  }, [initialData, form]);

  /**
   * @function handleSubmit
   * @description Xử lý khi form được submit.
   * @param {z.infer<typeof formSchema>} values Giá trị của form.
   */
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    // Ép kiểu values thành Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'> để khớp với kiểu của onSubmit
    onSubmit(values as Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Trường Tên đầy đủ */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đầy đủ</FormLabel>
              <FormControl><Input placeholder="Nhập tên đầy đủ" {...field} className="w-full" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Số điện thoại */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl><Input placeholder="Nhập số điện thoại" {...field} className="w-full" /></FormControl>
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
              <FormLabel>Địa chỉ cụ thể</FormLabel>
              <FormControl><Textarea placeholder="Nhập địa chỉ chi tiết (VD: Số nhà, tên đường)" {...field} className="w-full" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Mặc định */}
        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Đặt làm địa chỉ mặc định</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Địa chỉ lấy hàng */}
        <FormField
          control={form.control}
          name="isShop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Đặt làm địa chỉ lấy hàng</FormLabel>
                <FormMessage />
              </div>
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
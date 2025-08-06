/**
 * @file Component CategoryForm để tạo và chỉnh sửa danh mục sản phẩm.
 * Sử dụng react-hook-form và zodResolver để quản lý form và validate dữ liệu.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/seller"; // Import Category interface

/**
 * @schema categorySchema
 * @description Schema validation cho form danh mục sử dụng Zod.
 */
const categorySchema = z.object({
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự").max(50, "Tên danh mục không quá 50 ký tự"),
  description: z.string().max(200, "Mô tả không quá 200 ký tự").optional(),
  isActive: z.boolean().default(true), // Trạng thái kích hoạt, mặc định là true
});

/**
 * @typedef {z.infer<typeof categorySchema>} CategoryFormData
 * @description Kiểu dữ liệu cho form danh mục.
 */
type CategoryFormData = z.infer<typeof categorySchema>;

/**
 * @interface CategoryFormProps
 * @description Props cho component CategoryForm.
 * @property {Category} [initialData] - Dữ liệu danh mục ban đầu (dùng cho chỉnh sửa).
 * @property {(data: CategoryFormData) => void} onSubmit - Hàm xử lý khi submit form.
 * @property {boolean} [isLoading] - Trạng thái loading khi submit.
 */
interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: CategoryFormData) => void;
  isLoading: boolean;
}

/**
 * @function CategoryForm
 * @description Component form để tạo hoặc chỉnh sửa danh mục sản phẩm.
 * @param {CategoryFormProps} props - Props của component.
 * @returns {JSX.Element} Component CategoryForm.
 */
export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSubmit, isLoading }) => {
  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      isActive: initialData?.isActive ?? true, // Sử dụng ?? để đảm bảo giá trị mặc định nếu initialData.isActive là undefined
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Trường Tên danh mục */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên danh mục" {...field} />
              </FormControl>
              <FormDescription>
                Tên hiển thị của danh mục sản phẩm.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Mô tả */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Nhập mô tả cho danh mục (tùy chọn)" 
                  className="resize-none"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Mô tả ngắn gọn về danh mục này.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Trạng thái kích hoạt */}
        {initialData && initialData.isDefault ? (
          // Không cho phép chỉnh sửa isActive cho danh mục "All"
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Trạng thái kích hoạt</FormLabel>
              <FormDescription>
                Danh mục "All" luôn được kích hoạt và không thể thay đổi.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={true} disabled aria-readonly />
            </FormControl>
          </FormItem>
        ) : (
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Trạng thái kích hoạt</FormLabel>
                  <FormDescription>
                    Kích hoạt hoặc vô hiệu hóa danh mục này.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {/* Nút Submit */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Đặt lại
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
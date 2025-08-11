/**
 * @file Component CategoryForm để tạo và chỉnh sửa danh mục sản phẩm.
 * Sử dụng react-hook-form và zodResolver để quản lý form và validate dữ liệu.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import PlatformCategorySelect from "@/components/common/PlatformCategorySelect";
import { Button } from "@/components/ui/button";
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

/**
 * @schema categorySchema
 * @description Schema validation cho form danh mục sử dụng Zod.
 */
const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be at most 50 characters"),
  categoryId: z.string().min(1, "Please select a parent category"),
});

/**
 * @typedef {z.infer<typeof categorySchema>} CategoryFormData
 * @description Kiểu dữ liệu cho form danh mục.
 */
type CategoryFormData = z.infer<typeof categorySchema>;

/**
 * @interface CategoryFormProps
 * @description Props cho component CategoryForm.
 * @property {{ name: string; categoryId: string }} [initialData] - Dữ liệu danh mục ban đầu (dùng cho chỉnh sửa).
 * @property {(data: CategoryFormData) => void} onSubmit - Hàm xử lý khi submit form.
 * @property {boolean} [isLoading] - Trạng thái loading khi submit.
 */
interface CategoryFormProps {
  initialData?: { name: string; categoryId: string };
  onSubmit: (data: CategoryFormData) => void;
  isLoading: boolean;
}

/**
 * @function CategoryForm
 * @description Component form để tạo hoặc chỉnh sửa danh mục sản phẩm.
 * @param {CategoryFormProps} props - Props của component.
 * @returns {JSX.Element} Component CategoryForm.
 */
export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      // Dùng optional chaining để an toàn khi không có categoryTree
      categoryId: initialData?.categoryId ? String(initialData.categoryId) : "",
    },
  });
  // Platform category select has been extracted to a reusable component
  // Logic fetch + recursive render now lives in PlatformCategorySelect

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Trường Tên danh mục */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop category</FormLabel>
              <FormControl>
                <Input placeholder="Enter shop category name" {...field} />
              </FormControl>
              <FormDescription>
                Display name of the shop category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Danh mục  */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform category</FormLabel>
              {/* Sử dụng component tái sử dụng để chọn platform category */}
              <PlatformCategorySelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Select platform category"
              />
              <FormDescription>
                Select a platform category (parent or child). categoryId will be
                set based on your selection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

/**
 * @file Component CategoryForm để tạo và chỉnh sửa danh mục sản phẩm.
 * Sử dụng react-hook-form và zodResolver để quản lý form và validate dữ liệu.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import PlatformCategorySelect from "@/components/common/PlatformCategorySelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ImageIcon } from "lucide-react";

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
  // Trường image là bắt buộc
  image: z.instanceof(File, { message: "Category image is required" }),
});

// Schema riêng cho chỉnh sửa danh mục, cho phép image là optional
const editCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be at most 50 characters"),
  categoryId: z.string().min(1, "Please select a parent category"),
  // Trường image là optional khi chỉnh sửa (có thể giữ nguyên ảnh cũ)
  image: z.instanceof(File).optional(),
});

/**
 * @typedef {z.infer<typeof categorySchema> | z.infer<typeof editCategorySchema>} CategoryFormData
 * @description Kiểu dữ liệu cho form danh mục.
 */
type CategoryFormData = z.infer<typeof categorySchema> | z.infer<typeof editCategorySchema>;

/**
 * @interface CategoryFormProps
 * @description Props cho component CategoryForm.
 * @property {{ name: string; categoryId: string; imageUrl?: string }} [initialData] - Dữ liệu danh mục ban đầu (dùng cho chỉnh sửa).
 * @property {(data: CategoryFormData) => void} onSubmit - Hàm xử lý khi submit form.
 * @property {boolean} [isLoading] - Trạng thái loading khi submit.
 */
interface CategoryFormProps {
  initialData?: { name: string; categoryId: string; imageUrl?: string };
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
  // State để lưu trữ file ảnh đã chọn và URL preview
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );

  // Sử dụng schema khác nhau cho tạo mới và chỉnh sửa
  const schema = initialData ? editCategorySchema : categorySchema;

  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      // Dùng optional chaining để an toàn khi không có categoryTree
      categoryId: initialData?.categoryId ? String(initialData.categoryId) : "",
    },
  });

  // Xử lý khi người dùng chọn file ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cập nhật giá trị trong form
      form.setValue("image", file);

      // Tạo URL preview cho ảnh đã chọn
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Trường Danh mục  */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              {/* Sử dụng component tái sử dụng để chọn platform category */}
              <PlatformCategorySelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Select category"
              />
              <FormDescription>
                Select a category (parent or child). categoryId will be set
                based on your selection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Trường Tên danh mục */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection name</FormLabel>
              <FormControl>
                <Input placeholder="Enter collection name" {...field} />
              </FormControl>
              <FormDescription>Display name of the collection.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trường Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Collection Image</FormLabel>
              <div className="flex items-center gap-4">
                {/* Hiển thị preview ảnh */}
                <Avatar className="h-20 w-20 border border-border">
                  {imagePreview ? (
                    <AvatarImage src={imagePreview} alt="Category image" />
                  ) : (
                    <AvatarFallback>
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {initialData
                      ? "Upload a new image or keep the current one. "
                      : ""}
                    Upload an image for your category. Recommended size:
                    400x400px.
                    {!initialData && (
                      <span className="text-destructive"> Required.</span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Hàng nút: xếp dọc trên mobile, ngang trên sm+; nút full-width trên mobile để dễ bấm */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

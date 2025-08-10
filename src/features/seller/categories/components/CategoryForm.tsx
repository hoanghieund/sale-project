/**
 * @file Component CategoryForm để tạo và chỉnh sửa danh mục sản phẩm.
 * Sử dụng react-hook-form và zodResolver để quản lý form và validate dữ liệu.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesService } from "@/features/seller/categories/services/categoriesService";
import { Category } from "@/types";

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

  // State: danh sách danh mục cha để hiển thị trong Select
  const [parentOptions, setParentOptions] = useState<Category[]>([]);
  const [loadingParents, setLoadingParents] = useState(false);

  // Fetch: tải danh mục để chọn làm danh mục cha
  // NOTE: Khi module logger Winston sẵn sàng, thay console.error bằng logger thích hợp
  useEffect(() => {
    let mounted = true; // Tránh setState khi unmounted
    const fetchParents = async () => {
      setLoadingParents(true);
      try {
        const res: Category[] = await categoriesService.getTreeCategory(
          0,
          1000
        );
        if (mounted) setParentOptions(res);
      } catch (err) {
        console.error("Failed to load parent categories:", err);
      } finally {
        if (mounted) setLoadingParents(false);
      }
    };
    fetchParents();
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * @function renderCategoryOptions
   * @description Render đệ quy danh sách danh mục (cha/con) thành các SelectItem có indent.
   * Cho phép chọn được cả danh mục cha lẫn danh mục con (categoryId = id mục được chọn).
   */
  const renderCategoryOptions = (
    cats: Category[],
    depth = 0
  ): JSX.Element[] => {
    const prefix = depth > 0 ? `${"— ".repeat(depth)}` : ""; // tạo indent trực quan cho cấp con
    return cats.flatMap(cat => {
      const label = `${prefix}${cat.name ?? `Category #${cat.id}`}`;
      const nodes: JSX.Element[] = [
        <SelectItem key={`cat-${cat.id}`} value={String(cat.id)}>
          {label}
        </SelectItem>,
      ];
      // Nếu có con, tiếp tục render đệ quy các cấp con
      if (cat.child && cat.child.length > 0) {
        nodes.push(...renderCategoryOptions(cat.child, depth + 1));
      }
      return nodes;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Trường Tên danh mục */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>
                Display name of the product category.
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
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loadingParents}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {renderCategoryOptions(parentOptions)}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a parent or a child category. categoryId will be set
                based on your selection.
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

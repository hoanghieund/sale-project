/**
 * @file Component ProductForm để tạo và chỉnh sửa sản phẩm.
 * Cung cấp form để chủ shop nhập thông tin sản phẩm, bao gồm tên, mô tả, giá, tồn kho, danh mục, hình ảnh và trạng thái kích hoạt.
 * Hỗ trợ upload nhiều hình ảnh với preview và drag & drop để sắp xếp.
 * Sử dụng react-hook-form và zodResolver để quản lý form và validate dữ liệu.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { arrayMoveImmutable } from 'array-move';
import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "@/types/seller";
import { GripVertical, Upload, X } from "lucide-react";
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

/**
 * @schema productSchema
 * @description Schema validation cho form sản phẩm sử dụng Zod.
 */
const productSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự").max(100, "Tên sản phẩm không quá 100 ký tự"),
  description: z.string().max(1000, "Mô tả không quá 1000 ký tự").optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Giá phải là số dương").max(1000000000, "Giá quá lớn")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0, "Tồn kho phải là số nguyên không âm").max(1000000, "Tồn kho quá lớn")
  ),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  images: z.array(z.string()).optional(), // Mảng các URL hình ảnh
  isActive: z.boolean().default(true),
});

/**
 * @typedef {z.infer<typeof productSchema>} ProductFormData
 * @description Kiểu dữ liệu cho form sản phẩm.
 */
type ProductFormData = z.infer<typeof productSchema>;

/**
 * @interface ProductFormProps
 * @description Props cho component ProductForm.
 * @property {Product} [initialData] - Dữ liệu sản phẩm ban đầu (dùng cho chỉnh sửa).
 * @property {(data: ProductFormData) => void} onSubmit - Hàm xử lý khi submit form.
 * @property {boolean} isLoading - Trạng thái loading khi submit.
 * @property {Category[]} categories - Danh sách các danh mục để chọn.
 */
interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
  categories: Category[];
}

// Drag Handle cho SortableItem
const DragHandle = SortableHandle(() => (
  <GripVertical className="h-5 w-5 cursor-grab text-gray-500" />
));

/**
 * @interface SortableImageItemProps
 * @description Props cho SortableImageItem.
 * @property {string} image - URL của hình ảnh.
 * @property {() => void} onRemove - Hàm callback khi xóa hình ảnh.
 */
interface SortableImageItemProps {
  image: string;
  onRemove: () => void;
}

// Sortable Item cho hình ảnh
const SortableImageItem = SortableElement<SortableImageItemProps>(({ image, onRemove }) => (
  <div className="relative group">
    <img src={image} alt="Product preview" className="w-24 h-24 object-cover rounded-md" />
    <Button
      type="button"
      variant="destructive"
      size="sm"
      className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onRemove}
    >
      <X className="h-3 w-3" />
    </Button>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <DragHandle />
    </div>
  </div>
));

/**
 * @interface SortableImageListProps
 * @description Props cho SortableImageList.
 * @property {React.ReactNode} children - Các phần tử con của danh sách hình ảnh.
 */
interface SortableImageListProps {
  children: React.ReactNode;
}

// Sortable Container cho danh sách hình ảnh
const SortableImageList = SortableContainer<SortableImageListProps>(({ children }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {children}
    </div>
  );
});

/**
 * @function ProductForm
 * @description Component form để tạo hoặc chỉnh sửa sản phẩm.
 * @param {ProductFormProps} props - Props của component.
 * @returns {JSX.Element} Component ProductForm.
 */
export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading, categories }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || []);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      categoryId: initialData?.categoryId || (categories.length > 0 ? categories[0].id : ""),
      images: initialData?.images || [],
      isActive: initialData?.isActive ?? true,
    },
  });

  // Cập nhật giá trị images trong form khi imagePreviews thay đổi
  React.useEffect(() => {
    form.setValue('images', imagePreviews);
  }, [imagePreviews, form]);

  /**
   * @function onDrop
   * @description Xử lý khi kéo thả hoặc chọn file hình ảnh.
   * Đọc file và tạo URL preview.
   * @param {File[]} acceptedFiles - Mảng các file được chấp nhận.
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] } });

  /**
   * @function handleRemoveImage
   * @description Xóa một hình ảnh khỏi danh sách preview.
   * @param {number} index - Index của hình ảnh cần xóa.
   */
  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * @function onSortEnd
   * @description Xử lý khi sắp xếp lại hình ảnh bằng kéo thả.
   * @param {object} param - Đối tượng chứa oldIndex và newIndex.
   * @param {number} param.oldIndex - Vị trí cũ của item.
   * @param {number} param.newIndex - Vị trí mới của item.
   */
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setImagePreviews((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  const handleSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Chỉnh sửa Sản phẩm" : "Tạo Sản phẩm mới"}</CardTitle>
        <CardDescription>
          Điền thông tin chi tiết về sản phẩm của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Trường Tên sản phẩm */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên sản phẩm" {...field} />
                  </FormControl>
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
                      placeholder="Nhập mô tả chi tiết sản phẩm" 
                      className="resize-none"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trường Giá và Tồn kho */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tồn kho</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Trường Danh mục */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Khu vực Upload Hình ảnh */}
            <div>
              <FormLabel>Hình ảnh sản phẩm</FormLabel>
              <div
                {...getRootProps()}
                className="mt-2 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
              >
                <input {...getInputProps()} />
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    {isDragActive ? "Thả ảnh vào đây..." : "Kéo và thả ảnh vào đây, hoặc click để chọn ảnh"}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                </div>
              </div>
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <SortableImageList axis="xy" onSortEnd={onSortEnd} useDragHandle>
                    {imagePreviews.map((image, index) => (
                      <SortableImageItem 
                        key={`item-${image}`} 
                        index={index} 
                        image={image} 
                        onRemove={() => handleRemoveImage(index)} 
                      />
                    ))}
                  </SortableImageList>
                </div>
              )}
              <FormDescription className="mt-2">
                Bạn có thể kéo thả để sắp xếp lại thứ tự hình ảnh.
              </FormDescription>
            </div>

            {/* Trường Trạng thái kích hoạt */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Trạng thái kích hoạt</FormLabel>
                    <FormDescription>
                      Sản phẩm này có hiển thị trên gian hàng hay không.
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
      </CardContent>
    </Card>
  );
};
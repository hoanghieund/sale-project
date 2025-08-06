import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Định nghĩa schema validation cho form danh mục
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên danh mục phải có ít nhất 2 ký tự.',
  }),
  description: z.string().optional(),
});

/**
 * @typedef {object} CategoryFormProps
 * @property {string} [categoryId] - ID của danh mục cần chỉnh sửa (tùy chọn).
 * @property {function} onSubmit - Hàm được gọi khi form được submit.
 * @property {boolean} isLoading - Trạng thái loading của form.
 */
interface CategoryFormProps {
  categoryId?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}
 
 /**
  * CategoryForm component
  *
  * Component này cung cấp một form để thêm mới hoặc chỉnh sửa thông tin danh mục.
  * Sử dụng react-hook-form và shadcn-ui components.
  *
  * @param {CategoryFormProps} props - Props của component.
  * @returns {JSX.Element}
  */
 const CategoryForm: React.FC<CategoryFormProps> = ({
   categoryId, // Thêm categoryId vào destructuring
   onSubmit,
   isLoading,
 }) => {
   // Sử dụng useState để quản lý dữ liệu ban đầu của form
   const [initialData, setInitialData] = React.useState<{ name: string; description?: string } | undefined>();
 
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: initialData || { name: '', description: '' },
   });
 
   // Mô phỏng việc tải dữ liệu danh mục khi ở chế độ chỉnh sửa
   React.useEffect(() => {
     if (categoryId) {
       // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu danh mục dựa trên categoryId
       // Ví dụ mô phỏng dữ liệu:
       const dummyData = {
         name: `Danh mục ${categoryId}`,
         description: `Mô tả cho danh mục ${categoryId}`,
       };
       setInitialData(dummyData);
       form.reset(dummyData); // Cập nhật form với dữ liệu đã tải
     } else {
       setInitialData({ name: '', description: '' }); // Đặt lại về trạng thái thêm mới
       form.reset({ name: '', description: '' });
     }
   }, [categoryId, form]); // Thêm form vào dependency array

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên danh mục" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả danh mục (tùy chọn)"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : initialData ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
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
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Định nghĩa schema cho form Shop
const shopFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên shop phải có ít nhất 2 ký tự.',
  }).max(50, {
    message: 'Tên shop không được quá 50 ký tự.',
  }),
  address: z.string().min(5, {
    message: 'Địa chỉ phải có ít nhất 5 ký tự.',
  }).max(100, {
    message: 'Địa chỉ không được quá 100 ký tự.',
  }),
  description: z.string().max(500, {
    message: 'Mô tả không được quá 500 ký tự.',
  }).optional(),
});

// Định nghĩa kiểu dữ liệu cho Shop
export type Shop = z.infer<typeof shopFormSchema> & { id: string };

interface ShopFormProps {
  shopId?: string; // shopId tùy chọn, dùng cho chế độ chỉnh sửa
}

/**
 * @component ShopForm
 * @description Component form để thêm mới hoặc chỉnh sửa thông tin shop.
 * @param {string} [shopId] - ID của shop (dùng cho chỉnh sửa).
 */
const ShopForm: React.FC<ShopFormProps> = ({ shopId }) => {
  const form = useForm<Shop>({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      id: '',
      name: '',
      address: '',
      description: '',
    },
  });

  // Mô phỏng việc tải dữ liệu shop khi ở chế độ chỉnh sửa
  useEffect(() => {
    if (shopId) {
      // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu shop dựa trên shopId
      // Ví dụ: const fetchedShop = await fetchShopById(shopId);
      const mockShopData = {
        id: shopId,
        name: `Shop ${shopId}`,
        address: `Địa chỉ của Shop ${shopId}`,
        description: `Mô tả chi tiết về Shop ${shopId}.`,
      };
      form.reset(mockShopData);
    } else {
      form.reset({ id: '', name: '', address: '', description: '' });
    }
  }, [shopId, form]);

  const handleSubmit = (data: Shop) => {
    if (shopId) {
      // Logic cập nhật shop
      console.log('Cập nhật Shop:', data);
      // Trong thực tế: gọi API cập nhật shop
    } else {
      // Logic thêm mới shop
      console.log('Thêm Shop Mới:', data);
      // Trong thực tế: gọi API thêm shop mới
    }
    // Chuyển hướng sau khi submit thành công (ví dụ: về trang quản lý shop)
    // navigate('/seller/shops'); // Cần import useNavigate từ react-router-dom
  };

  return (
    <div className="p-4"> {/* Thay Dialog bằng div */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Shop</FormLabel>
                <FormControl>
                  <Input placeholder="Tên shop" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Địa chỉ shop" {...field} />
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
                  <Textarea placeholder="Mô tả về shop" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 mt-4"> {/* Thay DialogFooter bằng div */}
            {/* Nút hủy có thể được xử lý bằng cách chuyển hướng ngược lại */}
            {/* <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Hủy
            </Button> */}
            <Button type="submit">
              {shopId ? 'Lưu Thay Đổi' : 'Thêm Shop'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShopForm;
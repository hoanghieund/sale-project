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
import { z } from 'zod';

// Định nghĩa kiểu dữ liệu cho một sản phẩm (tương tự như trong ProductManagementPage)
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
}

// Định nghĩa schema validation cho form
const productFormSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm không được để trống.'),
    description: z.string().min(1, 'Mô tả không được để trống.'),
    price: z.preprocess(
        (val) => Number(val),
        z.number().min(0.01, 'Giá phải lớn hơn 0.')
    ),
    stock: z.preprocess(
        (val) => Number(val),
        z.number().int().min(0, 'Số lượng không được âm.')
    ),
    category: z.string().min(1, 'Danh mục không được để trống.'),
    imageUrl: z.string().url('URL hình ảnh không hợp lệ.').min(1, 'URL hình ảnh không được để trống.'),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
    productId?: string; // Tùy chọn, nếu có nghĩa là đang chỉnh sửa
    initialData?: Product; // Dữ liệu ban đầu cho form (khi chỉnh sửa)
    onSubmit: (data: ProductFormValues) => void;
    onCancel?: () => void;
}

/**
 * @component ProductForm
 * @description Form để thêm mới hoặc chỉnh sửa thông tin sản phẩm.
 * @param {string} productId - ID sản phẩm nếu đang ở chế độ chỉnh sửa.
 * @param {Product} initialData - Dữ liệu sản phẩm ban đầu để điền vào form khi chỉnh sửa.
 * @param {function} onSubmit - Callback khi form được submit.
 * @param {function} onCancel - Callback khi hủy bỏ form.
 * @returns {JSX.Element} ProductForm component.
 */
const ProductForm: React.FC<ProductFormProps> = ({ productId, initialData, onSubmit, onCancel }) => {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            imageUrl: '',
        },
    });

    // Mô phỏng việc tải dữ liệu sản phẩm khi ở chế độ chỉnh sửa
    useEffect(() => {
        if (productId) {
            // Trong một ứng dụng thực tế, bạn sẽ fetch dữ liệu sản phẩm từ API ở đây
            // Ví dụ: const fetchedProduct = await fetchProductById(productId);
            // set default values for form fields
            const dummyProduct: Product = {
                id: productId,
                name: `Sản phẩm ${productId}`,
                description: `Mô tả cho sản phẩm ${productId}.`,
                price: 99.99,
                stock: 50,
                category: 'general',
                imageUrl: 'https://via.placeholder.com/150',
            };
            form.reset(dummyProduct); // Reset form với dữ liệu sản phẩm
        } else {
            form.reset({ // Reset form về trạng thái rỗng khi thêm mới
                name: '',
                description: '',
                price: 0,
                stock: 0,
                category: '',
                imageUrl: '',
            });
        }
    }, [productId, form, initialData]);

    // Xử lý submit form
    const handleSubmit = (data: ProductFormValues) => {
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Nhập mô tả sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập giá sản phẩm" {...field} />
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
                            <FormLabel>Số lượng</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập số lượng" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Danh mục</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập danh mục" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Hình ảnh</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập URL hình ảnh" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-2">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Hủy bỏ
                        </Button>
                    )}
                    <Button type="submit">{productId ? 'Cập nhật' : 'Thêm mới'}</Button>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
/**
 * @file Component ShopForm để quản lý thông tin gian hàng.
 * Cho phép chủ shop xem và chỉnh sửa các thông tin cơ bản của gian hàng như tên, mô tả, địa chỉ, logo và banner.
 * Sử dụng react-hook-form và shadcn/ui components cho form.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shop } from "@/types/seller";
import { Upload, X } from "lucide-react";

/**
 * @schema shopSchema
 * @description Schema validation cho form gian hàng sử dụng Zod.
 */
const shopSchema = z.object({
  name: z.string().min(2, "Tên shop phải có ít nhất 2 ký tự"),
  description: z.string().optional(),
  address: z.string().optional(),
  logo: z.string().optional(), // Thêm logo vào schema
  banner: z.string().optional(), // Thêm banner vào schema
});

/**
 * @typedef {z.infer<typeof shopSchema>} ShopFormData
 * @description Kiểu dữ liệu cho form gian hàng.
 */
type ShopFormData = z.infer<typeof shopSchema>;

/**
 * @interface ShopFormProps
 * @description Props cho component ShopForm.
 * @property {Shop} [shop] - Dữ liệu gian hàng hiện có (nếu có).
 * @property {(data: ShopFormData) => void} onSubmit - Hàm xử lý khi submit form.
 * @property {boolean} [isLoading] - Trạng thái loading khi submit.
 */
interface ShopFormProps {
  shop?: Shop;
  onSubmit: (data: ShopFormData) => void;
  isLoading?: boolean;
}

/**
 * @function ShopForm
 * @description Component form để chỉnh sửa thông tin gian hàng.
 * @param {ShopFormProps} props - Props của component.
 * @returns {JSX.Element} Component ShopForm.
 */
export const ShopForm: React.FC<ShopFormProps> = ({ shop, onSubmit, isLoading }) => {
  // State để quản lý preview hình ảnh logo và banner
  const [logoPreview, setLogoPreview] = useState<string | null>(shop?.logo || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(shop?.banner || null);

  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: shop?.name || "",
      description: shop?.description || "",
      address: shop?.address || "",
    },
  });

  /**
   * @function handleLogoUpload
   * @description Xử lý sự kiện upload hình ảnh logo.
   * Tạo URL preview cho logo được chọn.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Sự kiện thay đổi input file.
   */
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * @function handleBannerUpload
   * @description Xử lý sự kiện upload hình ảnh banner.
   * Tạo URL preview cho banner được chọn.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Sự kiện thay đổi input file.
   */
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * @function removeLogo
   * @description Xóa hình ảnh logo đã chọn.
   */
  const removeLogo = () => {
    setLogoPreview(null);
  };

  /**
   * @function removeBanner
   * @description Xóa hình ảnh banner đã chọn.
   */
  const removeBanner = () => {
    setBannerPreview(null);
  };

  /**
   * @function handleSubmit
   * @description Xử lý submit form.
   * Gộp dữ liệu form với URL logo/banner và gọi hàm onSubmit từ props.
   * @param {ShopFormData} data - Dữ liệu từ form.
   */
  const handleSubmit = (data: ShopFormData) => {
    onSubmit({
      ...data,
      logo: logoPreview || undefined, // Đảm bảo gửi undefined nếu không có ảnh
      banner: bannerPreview || undefined, // Đảm bảo gửi undefined nếu không có ảnh
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin gian hàng</CardTitle>
        <CardDescription>
          Cập nhật thông tin cơ bản của gian hàng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Trường Tên gian hàng */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên gian hàng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên gian hàng" {...field} />
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
                      placeholder="Nhập mô tả gian hàng" 
                      className="resize-none"
                      rows={4}
                      {...field} 
                    />
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
                    <Input placeholder="Nhập địa chỉ gian hàng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Khu vực Upload Logo và Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Logo */}
              <div>
                <label className="text-sm font-medium mb-2 block">Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {logoPreview ? (
                    <div className="relative">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-32 h-32 object-cover mx-auto rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={removeLogo}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div>
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <span className="text-sm text-blue-600 hover:text-blue-500">
                            Tải lên logo
                          </span>
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
                      </div>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Banner */}
              <div>
                <label className="text-sm font-medium mb-2 block">Banner</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {bannerPreview ? (
                    <div className="relative">
                      <img 
                        src={bannerPreview} 
                        alt="Banner preview" 
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={removeBanner}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div>
                        <label htmlFor="banner-upload" className="cursor-pointer">
                          <span className="text-sm text-blue-600 hover:text-blue-500">
                            Tải lên banner
                          </span>
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG tối đa 10MB</p>
                      </div>
                      <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nút Submit */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
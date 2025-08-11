/**
 * @file Component ShopForm để quản lý thông tin gian hàng.
 * Cho phép chủ shop xem và chỉnh sửa các thông tin cơ bản của gian hàng như tên, mô tả, địa chỉ, logo và banner.
 * Sử dụng react-hook-form và shadcn/ui components cho form.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FileDropzone from "@/components/common/FileDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Dùng Textarea từ shadcn cho mô tả
import { Shop } from "@/types";

/**
 * @schema shopSchema
 * @description Schema validation cho form gian hàng sử dụng Zod.
 */
const shopSchema = z.object({
  // Mở rộng: thêm mô tả và thông tin liên hệ (email/phone)
  name: z.string().min(2, "Tên shop phải có ít nhất 2 ký tự"),
  description: z.string().optional().or(z.literal("")),
  contactEmail: z
    .string()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  logo: z.string().optional(), // URL ảnh đại diện (DataURL hoặc URL)
  banner: z.string().optional(), // URL banner (DataURL hoặc URL)
});

/**
 * @typedef {z.infer<typeof shopSchema>} ShopFormData
 * @description Kiểu dữ liệu cho form gian hàng.
 */
export type ShopFormData = z.infer<typeof shopSchema>; // Thêm export ở đây

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
export const ShopForm: React.FC<ShopFormProps> = ({
  shop,
  onSubmit,
  isLoading,
}) => {
  // State để quản lý preview hình ảnh logo và banner
  const [logoPreview, setLogoPreview] = useState<string | null>(
    shop?.avatar || null
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    shop?.banner || null
  );
  // State file cho FileDropzone (controlled)
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);

  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: shop?.name || "",
      description: shop?.description || "",
      contactEmail: shop?.contactEmail || "",
      contactPhone: shop?.contactPhone || "",
    },
  });

  /**
   * Helper: chuyển File -> DataURL để lưu/preview đồng nhất với storage hiện tại
   */
  const fileToDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /**
   * @function handleLogoFilesChange
   * @description Đồng bộ FileDropzone (logo) với preview dạng DataURL
   */
  const handleLogoFilesChange = async (files: File[]) => {
    // Chỉ lấy 1 file đầu làm ảnh đại diện
    const next = files.slice(0, 1);
    setLogoFiles(next);
    if (next[0]) {
      try {
        const url = await fileToDataURL(next[0]);
        setLogoPreview(url);
      } catch {
        // Giữ nguyên preview nếu đọc lỗi
      }
    } else {
      setLogoPreview(null);
    }
  };

  /**
   * @function handleBannerFilesChange
   * @description Đồng bộ FileDropzone (banner) với preview dạng DataURL
   */
  const handleBannerFilesChange = async (files: File[]) => {
    const next = files.slice(0, 1);
    setBannerFiles(next);
    if (next[0]) {
      try {
        const url = await fileToDataURL(next[0]);
        setBannerPreview(url);
      } catch {
        // Bỏ qua lỗi đọc file
      }
    } else {
      setBannerPreview(null);
    }
  };

  /**
   * @function removeLogo
   * @description Xóa hình ảnh logo đã chọn.
   */
  const removeLogo = () => {
    setLogoPreview(null);
    setLogoFiles([]);
  };

  /**
   * @function removeBanner
   * @description Xóa hình ảnh banner đã chọn.
   */
  const removeBanner = () => {
    setBannerPreview(null);
    setBannerFiles([]);
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
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Thông tin gian hàng</CardTitle>
        <CardDescription>
          Cập nhật thông tin cơ bản của gian hàng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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

            {/* Thông tin mô tả và liên hệ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email liên hệ */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email liên hệ</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@domain.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số điện thoại liên hệ */}
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mô tả gian hàng */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Mô tả ngắn về gian hàng"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Khu vực Upload Logo và Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Logo */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ảnh đại diện
                </label>
                <FileDropzone
                  files={logoFiles}
                  onFilesChange={handleLogoFilesChange}
                  accept="image/*"
                  maxFiles={1}
                  thumbSize={320}
                  thumbAlign="center"
                  // Hiển thị preview ban đầu từ URL hiện có hoặc preview state
                  initialPreviewUrl={logoPreview || undefined}
                  previewAlt="Shop avatar preview"
                  onClearInitialPreview={removeLogo}
                />
              </div>

              {/* Upload Banner */}
              <div>
                <label className="text-sm font-medium mb-2 block">Banner</label>
                {/* FileDropzone dành cho banner */}
                <FileDropzone
                  files={bannerFiles}
                  onFilesChange={handleBannerFilesChange}
                  accept="image/*"
                  maxFiles={1}
                  thumbSize={320}
                  thumbAlign="center"
                  // Hiển thị preview ban đầu từ URL hiện có hoặc preview state
                  initialPreviewUrl={bannerPreview || undefined}
                  previewAlt="Shop banner preview"
                  onClearInitialPreview={removeBanner}
                />
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

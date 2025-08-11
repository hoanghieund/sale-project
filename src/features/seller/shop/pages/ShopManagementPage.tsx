/**
 * @file Trang quản lý gian hàng (Shop Management Page) cho module Seller.
 * Hiển thị thông tin gian hàng hiện tại và cho phép điều hướng đến trang chỉnh sửa.
 * Nếu chưa có shop, sẽ hiển thị form tạo shop lần đầu.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShopForm,
  ShopFormData,
} from "@/features/seller/shop/components/ShopForm";
import { shopService } from "@/features/seller/shop/services/shopServices";
import { Shop } from "@/types";
import { formatDate } from "@/utils/formatters"; // Định dạng ngày cho timeRequest
import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Giả định đã có sonner để hiển thị thông báo

const ShopManagementPage: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const shopData = await shopService.getShop();
        setShop(shopData);
      } catch (err: any) {
        // Ghi log lỗi tải shop và hiển thị thông báo thân thiện
        toast.error("Lỗi", {
          description: err?.message || "Không thể tải thông tin gian hàng.",
        });
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  /**
   * @function dataURLToFile
   * @description Chuyển đổi chuỗi DataURL (base64) thành File để upload multipart/form-data.
   * Lưu ý: Chỉ gọi khi chuỗi bắt đầu bằng "data:". Nếu là URL http(s) thì không chuyển đổi.
   */
  const dataURLToFile = (dataUrl: string, filenamePrefix: string): File => {
    // Trích xuất MIME và dữ liệu base64 từ DataURL
    const [header, base64] = dataUrl.split(",");
    const mimeMatch = header.match(/:(.*?);/);
    const mime = (mimeMatch && mimeMatch[1]) || "image/png";

    // Giải mã base64 -> Uint8Array
    const binary = atob(base64 || "");
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);

    // Suy luận phần mở rộng từ MIME
    const ext = (mime.split("/")[1] || "png").split("+")[0];
    return new File([bytes], `${filenamePrefix}.${ext}`, { type: mime });
  };

  /**
   * @function handleSubmit
   * @description Xử lý lưu thay đổi shop: chỉ cập nhật name, logo (ảnh đại diện) và banner theo yêu cầu.
   */
  const handleSubmit = async (data: ShopFormData) => {
    try {
      setLoading(true);
      // Nếu logo/banner là DataURL (file mới chọn), chuyển sang File; nếu là URL cũ thì bỏ qua (không upload lại)
      const logoFile =
        data.logo && data.logo.startsWith("data:")
          ? dataURLToFile(data.logo, "logo")
          : undefined;
      const bannerFile =
        data.banner && data.banner.startsWith("data:")
          ? dataURLToFile(data.banner, "banner")
          : undefined;

      // Gọi service mới dùng multipart/form-data
      const updated = await shopService.updateShop({
        // Gửi kèm các trường text theo spec API: name, description, contactEmail, contactPhone
        shop: {
          name: data.name,
          description: data.description || undefined,
          contactEmail: data.contactEmail || undefined,
          contactPhone: data.contactPhone || undefined,
        },
        ...(logoFile ? { logo: logoFile } : {}),
        ...(bannerFile ? { banner: bannerFile } : {}),
      });
      setShop(updated);
      setIsEditing(false);
      toast.success("Đã lưu thông tin gian hàng");
    } catch (err: any) {
      toast.error("Lưu thất bại", {
        description: err?.message || "Không thể cập nhật thông tin gian hàng.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!shop) {
    return <div>Shop not found</div>;
  }

  // Form chế độ tạo/chỉnh sửa: hiển thị khi đang chỉnh sửa hoặc chưa có shop
  if (isEditing) {
    return (
      <ShopForm
        shop={shop || undefined}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    );
  }

  // Hiển thị thông tin shop
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle>Thông tin Gian hàng của bạn</CardTitle>
          <CardDescription>
            Chỉ hiển thị Tên, Ảnh đại diện và Banner
          </CardDescription>
        </div>
        <Button onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Tên gian hàng</p>
            <p className="text-lg font-semibold">{shop?.name}</p>
          </div>
          {/* Slug (nếu có) */}
          {shop?.slug && (
            <div>
              <p className="text-sm font-medium text-gray-500">Slug</p>
              <p className="text-base">{shop.slug}</p>
            </div>
          )}
          {/* Trạng thái hoạt động */}
          {typeof shop?.status !== "undefined" && (
            <div>
              <p className="text-sm font-medium text-gray-500">Trạng thái</p>
              <p className="text-base">{shop.status ? "Active" : "Inactive"}</p>
            </div>
          )}
          {/* Thời gian yêu cầu (timeRequest) */}
          {shop?.timeRequest && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                Thời gian yêu cầu
              </p>
              <p className="text-base">{formatDate(shop.timeRequest)}</p>
            </div>
          )}
        </div>

        {/* Mô tả shop (nếu có) */}
        {shop.description && (
          <div>
            <p className="text-sm font-medium text-gray-500">Mô tả</p>
            <p className="text-base whitespace-pre-line">{shop.description}</p>
          </div>
        )}

        {/* Thông tin liên hệ (nếu có) */}
        {(shop.contactEmail || shop.contactPhone) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shop.contactEmail && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email liên hệ
                </p>
                <a
                  href={`mailto:${shop.contactEmail}`}
                  className="text-base text-blue-600 hover:underline"
                >
                  {shop.contactEmail}
                </a>
              </div>
            )}
            {shop.contactPhone && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Số điện thoại
                </p>
                <p className="text-base">{shop.contactPhone}</p>
              </div>
            )}
          </div>
        )}

        {shop?.avatar && (
          <div>
            <p className="text-sm font-medium text-gray-500">Ảnh đại diện</p>
            <img
              src={shop.avatar}
              alt="Shop Logo"
              className="w-24 h-24 object-cover rounded-md mt-2"
            />
          </div>
        )}
        {shop?.banner && (
          <div>
            <p className="text-sm font-medium text-gray-500">Banner</p>
            <img
              src={shop.banner}
              alt="Shop Banner"
              className="w-full h-48 object-cover rounded-md mt-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopManagementPage;

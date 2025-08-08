/**
 * @file Trang quản lý gian hàng (Shop Management Page) cho module Seller.
 * Hiển thị thông tin gian hàng hiện tại và cho phép điều hướng đến trang chỉnh sửa.
 * Nếu chưa có shop, sẽ hiển thị form tạo shop lần đầu.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageContainer } from "@/features/seller/components/PageContainer";
import { ShopForm } from "@/features/seller/components/ShopForm";
import { sellerAPI } from "@/features/seller/services/seller";
import { Shop } from "@/features/seller/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Giả định đã có sonner để hiển thị thông báo

/**
 * @function ShopManagementPage
 * @description Component trang quản lý gian hàng.
 * @returns {JSX.Element} Trang quản lý gian hàng.
 */
const ShopManagementPage: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    /**
     * @function fetchShopData
     * @description Hàm lấy dữ liệu gian hàng từ API.
     */
    const fetchShopData = async () => {
      setLoading(true);
      setError(null);
      try {
        const shopData = await sellerAPI.getShop();
        setShop(shopData);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải thông tin shop.");
        if (err.response && err.response.status === 404) {
          setShop(null); // Đặt shop là null để hiển thị form tạo
        } else {
          toast.error("Lỗi", {
            description: err.message || "Không thể tải thông tin gian hàng.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  /**
   * @function handleCreateOrUpdateShop
   * @description Xử lý tạo hoặc cập nhật thông tin gian hàng.
   * @param {Partial<Shop>} data - Dữ liệu gian hàng cần gửi đi.
   */
  const handleCreateOrUpdateShop = async (data: Partial<Shop>) => {
    setLoading(true);
    setError(null);
    try {
      let updatedShop: Shop;
      if (shop) {
        // Cập nhật shop hiện có
        updatedShop = await sellerAPI.updateShop(data);
        toast.success("Thành công", {
          description: "Cập nhật thông tin gian hàng thành công!",
        });
      } else {
        // Tạo shop mới (dựa trên giả định API)
        throw new Error(
          "Chức năng tạo shop không được hỗ trợ trực tiếp từ đây."
        );
      }
      setShop(updatedShop);
      setIsEditing(false); // Thoát chế độ chỉnh sửa sau khi lưu
    } catch (err: any) {
      setError(err.message || "Không thể lưu thông tin gian hàng.");
      toast.error("Lỗi", {
        description: err.message || "Không thể lưu thông tin gian hàng.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Nếu chưa có shop, hiển thị form tạo shop lần đầu
  if (!shop && !isEditing) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Chào mừng đến với Kênh bán hàng!</CardTitle>
            <CardDescription>
              Bạn chưa có gian hàng nào. Vui lòng tạo gian hàng đầu tiên của bạn
              để bắt đầu bán hàng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsEditing(true)}>
              Tạo Gian hàng mới
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  // Nếu đang ở chế độ chỉnh sửa hoặc shop đã tồn tại
  if (isEditing || shop) {
    return (
      <PageContainer>
        <ShopForm
          shop={shop || undefined}
          onSubmit={handleCreateOrUpdateShop}
          isLoading={loading}
        />
        {isEditing && ( // Chỉ hiển thị nút hủy khi đang chỉnh sửa
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              Hủy chỉnh sửa
            </Button>
          </div>
        )}
      </PageContainer>
    );
  }

  // Hiển thị thông tin shop
  return (
    <PageContainer>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Thông tin Gian hàng của bạn</CardTitle>
            <CardDescription>
              Xem và quản lý thông tin chi tiết về gian hàng của bạn.
            </CardDescription>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            Chỉnh sửa thông tin
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tên gian hàng</p>
              <p className="text-lg font-semibold">{shop?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
              <p className="text-md">{shop?.address || "Chưa cập nhật"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Mô tả</p>
            <p className="text-md">{shop?.description || "Chưa có mô tả"}</p>
          </div>
          {shop?.logo && (
            <div>
              <p className="text-sm font-medium text-gray-500">Logo</p>
              <img
                src={shop.logo}
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
                className="w-full h-32 object-cover rounded-md mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ShopManagementPage;

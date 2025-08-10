/**
 * @fileoverview Trang quản lý đơn hàng cho seller.
 * Hiển thị danh sách đơn hàng với các tab lọc theo trạng thái.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/types";
import { sellerService } from "../services/sellerService";
import OrderTable from "../components/OrderTable";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * @function OrderManagementPage
 * @description Trang quản lý đơn hàng cho seller.
 * @returns {JSX.Element} Component OrderManagementPage.
 */
const OrderManagementPage = () => {
  const navigate = useNavigate();
  const [shopId, setShopId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra xem seller đã có shop chưa
  useEffect(() => {
    const checkShop = async () => {
      try {
        const shop = await sellerService.getShop();
        if (shop) {
          setShopId(shop.id as number);
        } else {
          // Nếu chưa có shop, chuyển hướng đến trang tạo shop
          navigate("/seller/shop");
        }
      } catch (err) {
        console.error("Error checking shop:", err);
        setError("Không thể tải thông tin shop. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    checkShop();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader className="bg-red-50 pb-2">
          <CardTitle className="text-red-700 text-lg">Lỗi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/seller/dashboard")}
          >
            Quay lại Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Xem và quản lý tất cả đơn hàng của shop bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 grid grid-cols-7 md:w-fit">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
              <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
              <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
              <TabsTrigger value="shipped">Đang giao</TabsTrigger>
              <TabsTrigger value="delivered">Đã giao</TabsTrigger>
              <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <OrderTable status="all" />
            </TabsContent>
            <TabsContent value="pending">
              <OrderTable status={OrderStatus.PENDING} />
            </TabsContent>
            <TabsContent value="confirmed">
              <OrderTable status={OrderStatus.CONFIRMED} />
            </TabsContent>
            <TabsContent value="processing">
              <OrderTable status={OrderStatus.PROCESSING} />
            </TabsContent>
            <TabsContent value="shipped">
              <OrderTable status={OrderStatus.SHIPPED} />
            </TabsContent>
            <TabsContent value="delivered">
              <OrderTable status={OrderStatus.DELIVERED} />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderTable status={OrderStatus.CANCELLED} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagementPage;

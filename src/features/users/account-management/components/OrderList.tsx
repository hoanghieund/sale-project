// src/features/users/account-management/components/OrderList.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItemCard from "@/features/users/cart/components/CartItemCard";
import { useUser } from "@/hooks/use-user";
import { Order } from "@/types";
import { formatCurrencyUSD } from "@/utils/formatters";
import { AxiosError } from "axios";
import {
  Calendar,
  DollarSign,
  Loader2,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { orderService } from "../services/orderService";

/**
 * @interface OrderListProps
 * @description Props cho component OrderList.
 */
interface OrderListProps {
  status: string;
}

/**
 * @function OrderList
 * @description Component hiển thị danh sách đơn hàng dựa trên trạng thái được chọn.
 * @param {OrderListProps} { status } - Trạng thái đơn hàng để lọc.
 * @returns {JSX.Element} Component OrderList.
 */
const OrderList: React.FC<OrderListProps> = ({ status }) => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const fetchOrdersFunc = status === "all" ? orderService.getOrdersByUser : orderService.getOrdersByUserAndStatus;
        const fetchedOrders = await fetchOrdersFunc(
          user.id,
          Number(status)
        );
        setOrders(fetchedOrders);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(
            err.response?.data?.message ||
              "Không thể tải đơn hàng. Vui lòng thử lại sau."
          );
        } else {
          setError("Đã xảy ra lỗi không xác định.");
        }
        console.error("Lỗi khi tải đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id , status]);

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter(order => {
    if (status === "all") return true;
    if (status === "pending_confirmation") return order.status === 0; // 0: Chờ xác nhận
    if (status === "awaiting_pickup") return order.status === 1; // 1: Chờ lấy hàng
    if (status === "in_delivery") return order.status === 2; // 2: Đang giao
    if (status === "completed") return order.status === 3; // 3: Hoàn thành
    if (status === "cancelled") return order.status === 4; // 4: Đã hủy
    return false;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-ring mb-3" />
        <p className="text-lg text-gray-600 font-medium">
          Đang tải đơn hàng của bạn...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-xl mx-auto shadow-lg border-red-200 border-2">
        <CardHeader className="bg-red-50 p-4 rounded-t-lg">
          <CardTitle className="text-red-700 text-xl font-bold flex items-center">
            <span className="mr-2">⚠️</span> Lỗi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-red-600 text-base">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600 py-8 text-base">
          Không có đơn hàng nào với trạng thái này.
        </p>
      ) : (
        filteredOrders.map(order => (
          <Card
            key={order.id}
            className="bg-white shadow-none rounded-lg overflow-hidden"
          >
            <CardHeader className="bg-gray-50 p-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-black flex items-center">
                  <Package className="h-4 w-4 mr-2 text-ring" /> Đơn hàng #
                  {order.code}
                </CardTitle>
                <CardDescription className="text-xs text-foreground mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Ngày đặt:{" "}
                  {order.timeOrder}
                </CardDescription>
              </div>
              <div className="text-right">
                {order.status === 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                    Chờ xác nhận
                  </span>
                )}
                {order.status === 1 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                    Chờ lấy hàng
                  </span>
                )}
                {order.status === 2 && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                    Đang giao
                  </span>
                )}
                {order.status === 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-ring text-xs font-medium">
                    Hoàn thành
                  </span>
                )}
                {order.status === 4 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                    Đã hủy
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <User className="h-3 w-3 mr-1" /> Thông tin người nhận:
                  </h4>
                  <p className="text-xs text-gray-600 ml-4">
                    {order.orderAddressDTO?.fullName || "N/A"}
                  </p>
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />{" "}
                    {order.orderAddressDTO?.phoneNumber || "N/A"}
                  </p>
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />{" "}
                    {`${order.orderAddressDTO?.address}` ||
                      "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Tổng tiền:
                  </h4>
                  <p className="text-base font-bold text-ring ml-4">
                    {formatCurrencyUSD(order.totalPrice)}
                  </p>
                  <h4 className="font-semibold text-foreground flex items-center">
                    <Package className="h-3 w-3 mr-1" /> Tổng sản phẩm:
                  </h4>
                  <p className="text-xs text-gray-600 ml-4">
                    {order.cartEntities.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    sản phẩm
                  </p>
                </div>
              </div>

              <Separator className="my-3" />

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Sản phẩm đã đặt:
                </h4>
                <div className="space-y-2">
                  {order.cartEntities.map(item => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      viewMode="compact"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderList;

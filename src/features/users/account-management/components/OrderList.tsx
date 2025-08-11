// src/features/users/account-management/components/OrderList.tsx
import CartItemCard from "@/components/common/CartItemCard";
import { OrderStatusBadge } from "@/components/common/OrderStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";
import { Order, OrderStatus } from "@/types";
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
 * @description Props for the OrderList component.
 */
interface OrderListProps {
  status: OrderStatus;
}

/**
 * @function OrderList
 * @description Component that displays a list of orders based on the selected status.
 * @param {OrderListProps} { status } - Order status for filtering.
 * @returns {JSX.Element} The OrderList component.
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
        const fetchOrdersFunc =
          status === "all"
            ? orderService.getOrdersByUser
            : orderService.getOrdersByUserAndStatus;
        const fetchedOrders = await fetchOrdersFunc(user.id, Number(status));
        setOrders(fetchedOrders.content);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(
            err.response?.data?.message ||
              "Could not load orders. Please try again later."
          );
        } else {
          setError("An unknown error occurred.");
        }
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id, status]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-ring mb-3" />
        <p className="text-lg text-gray-600 font-medium">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-xl mx-auto shadow-lg border-red-200 border-2">
        <CardHeader className="bg-red-50 p-4 rounded-t-lg">
          <CardTitle className="text-red-700 text-xl font-bold flex items-center">
            <span className="mr-2">⚠️</span> Error
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
      {orders.length === 0 ? (
        <p className="text-center text-gray-600 py-8 text-base">
          No orders found with this status.
        </p>
      ) : (
        orders.map(order => (
          <Card
            key={order.id}
            className="bg-white shadow-none rounded-lg overflow-hidden"
          >
            <CardHeader className="bg-card p-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-black flex items-center">
                  <Package className="h-4 w-4 mr-2 text-ring" /> Order #
                  {order.code}
                </CardTitle>
                <CardDescription className="text-xs text-foreground mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Order date:{" "}
                  {order.timeOrder}
                </CardDescription>
              </div>
              <div className="text-right">
                {/* Sử dụng OrderStatusBadge để thống nhất UI trạng thái đơn hàng */}
                <OrderStatusBadge status={order.status} />
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <User className="h-3 w-3 mr-1" /> Recipient information:
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
                    {`${order.orderAddressDTO?.address}` || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Total amount:
                  </h4>
                  <p className="text-base font-bold text-ring ml-4">
                    {formatCurrencyUSD(order.totalPrice)}
                  </p>
                  <h4 className="font-semibold text-foreground flex items-center">
                    <Package className="h-3 w-3 mr-1" /> Total products:
                  </h4>
                  <p className="text-xs text-gray-600 ml-4">
                    {order.cartEntities.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    products
                  </p>
                </div>
              </div>

              <Separator className="my-3" />

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Ordered products:
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

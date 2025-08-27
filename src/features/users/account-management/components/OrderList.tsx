// src/features/users/account-management/components/OrderList.tsx
import CartItemCard from "@/components/common/CartItemCard";
import { OrderStatusBadge } from "@/components/common/OrderStatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { Order, OrderStatus } from "@/types";
import { formatCurrencyUSD } from "@/utils/formatters";
import { AxiosError } from "axios";
import {
  Building2,
  Calendar,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
  X,
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
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(
    null
  );

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

  useEffect(() => {
    fetchOrders();
  }, [user?.id, status]);

  /**
   * @function handleCancelOrder
   * @description Handles the cancellation of an order.
   * @param {number} orderId - The ID of the order to cancel.
   */
  const handleCancelOrder = async (orderId: number) => {
    setCancellingOrderId(orderId);
    try {
      await orderService.cancelOrder(orderId);
      // Refresh orders list after successful cancellation
      await fetchOrders();

      // Show success toast
      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled.",
        variant: "default",
      });
    } catch (err) {
      // Show error toast
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description:
            err.response?.data?.message ||
            "Could not cancel order. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred while canceling the order.",
          variant: "destructive",
        });
      }
      console.error("Error canceling order:", err);
    } finally {
      setCancellingOrderId(null);
    }
  };

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
              <div className="text-right flex items-center gap-2">
                {/* Sử dụng OrderStatusBadge để thống nhất UI trạng thái đơn hàng */}
                <OrderStatusBadge status={order.status} />
                {/* Nút hủy đơn hàng - chỉ hiển thị cho order có status khác 4 */}
                {order.status !== 4 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={cancellingOrderId === order.id}
                        className="h-6 px-1 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors gap-1"
                      >
                        {cancellingOrderId === order.id ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3" />
                            Cancel
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-md">
                      <AlertDialogHeader className="text-center">
                        <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                          Cancel Order
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 mt-2">
                          Are you sure you want to cancel order{" "}
                          <span className="font-medium text-gray-900">
                            #{order.code}
                          </span>
                          ?
                          <br />
                          <span className="text-red-600 font-medium">
                            This action cannot be undone.
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
                        <AlertDialogCancel className="mt-2 sm:mt-0">
                          Keep Order
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelOrder(order.id)}
                          className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                        >
                          Cancel Order
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <User className="h-3 w-3 mr-1" /> Recipient information:
                  </h4>
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <User className="h-3 w-3 mr-1" />{" "}
                    {order.orderAddressDTO
                      ? `${order.orderAddressDTO.firstName || ""} ${
                          order.orderAddressDTO.lastName || ""
                        }`.trim()
                      : "N/A"}{" "}
                  </p>
                  {order.orderAddressDTO?.companyName && (
                    <p className="text-xs text-gray-600 ml-4 flex items-center">
                      <Building2 className="h-3 w-3 mr-1" />{" "}
                      {order.orderAddressDTO.companyName}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />{" "}
                    {order.orderAddressDTO?.phoneNumber || "N/A"}
                  </p>
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />{" "}
                    {order.orderAddressDTO?.email || "N/A"}
                  </p>
                  <p className="text-xs text-gray-600 ml-4 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />{" "}
                    {order.orderAddressDTO ? (
                      <>
                        {order.orderAddressDTO.addressLine1}
                        {order.orderAddressDTO.addressLine2 && (
                          <>, {order.orderAddressDTO.addressLine2}</>
                        )}
                        <br />
                        {order.orderAddressDTO.city},{" "}
                        {order.orderAddressDTO.state}{" "}
                        {order.orderAddressDTO.postalCode}
                        <br />
                        {order.orderAddressDTO.country}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  {order.orderAddressDTO?.orderNotes && (
                    <p className="text-xs text-gray-600 ml-4 mt-1 italic">
                      Note: {order.orderAddressDTO.orderNotes}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Total amount:
                  </h4>
                  <p className="text-base font-bold text-ring ml-4">
                    {formatCurrencyUSD(order.totalPrice + order.feeShip)}
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

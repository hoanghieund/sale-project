import CartItemCard from "@/components/common/CartItemCard"; // Dùng UI dùng lại để hiển thị danh sách sản phẩm trong đơn
import OrderStatusBadge from "@/components/common/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderStatus } from "@/types";
import { formatCurrencyUSD } from "@/utils/formatters";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  ChevronDown,
  ClipboardCheck,
  Clock,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../services/orderService";

/**
 * @function OrderDetailPage
 * @description Seller's order detail page.
 * @returns {JSX.Element} OrderDetailPage component.
 */
const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) {
        return;
      }

      try {
        const orderData = await orderService.getOrderDetail(Number(orderId));
        if (orderData) {
          setOrder(orderData);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Order not found",
          });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              err.response?.data?.message ||
              "Unable to load order information. Please try again later.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unknown error occurred.",
          });
        }
        console.error("Error loading order detail:", err);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  /**
   * Safely format date in en-US locale.
   * - If the value contains only date (e.g., "08-08-2025"), show MM/DD/YYYY.
   * - If it includes time, show MM/DD/YYYY, HH:MM AM/PM.
   * Fallback: if parsing fails, return the original string to avoid UI crash.
   */
  const formatDateUS = (value?: unknown) => {
    if (!value) return "";
    const raw = String(value).trim();
    const d = new Date(value as any);
    if (isNaN(d.getTime())) return raw; // If cannot parse -> return original string

    // If input string looks like date-only (no time)
    if (raw.length <= 10) {
      return d.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    }

    // Has time -> include hour/minute in 12h US format
    return d.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Compute total payment: subtotal (totalPrice) + shipping fee (feeShip)
  const totalPayment = (order?.totalPrice ?? 0) + (order?.feeShip ?? 0);

  // Handle order status update
  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (!order) return;

    try {
      const updatedOrder = await orderService.updateOrderStatus(
        order.id,
        newStatus
      );
      if (updatedOrder) {
        setOrder(updatedOrder);

        // Success toast
        toast({
          title: "Updated successfully",
          description: `Order #${updatedOrder.code} status updated.`,
        });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast({
        title: "Update failed",
        description: "Unable to update order status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Render dropdown menu for updating status
  const renderStatusUpdateMenu = () => {
    if (!order) return null;

    // Determine possible next statuses
    const nextPossibleStatuses: { status: OrderStatus; label: string }[] = [];

    switch (order.status) {
      case OrderStatus.PENDING_CONFIRMATION:
        // 0: pending confirmation - seller cannot update manually (payment/webhook updates)
        return null;
      case OrderStatus.AWAITING_PICKUP:
        // 1 -> 2
        nextPossibleStatuses.push({
          status: OrderStatus.IN_DELIVERY,
          label: "In delivery",
        });
        break;
      case OrderStatus.IN_DELIVERY:
        // 2 -> 3
        nextPossibleStatuses.push({
          status: OrderStatus.COMPLETED,
          label: "Completed",
        });
        break;
      case OrderStatus.COMPLETED:
      default:
        return null;
    }

    if (nextPossibleStatuses.length === 0) {
      return null;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Update status <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {nextPossibleStatuses.map(item => (
            <DropdownMenuItem
              key={item.status}
              onClick={() => handleUpdateStatus(item.status)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header: stack trên mobile, hai cột trên sm+ */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/seller/orders")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold break-words">
            Order details #{order?.code}
          </h1>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {renderStatusUpdateMenu()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order information */}
        <Card className="md:col-span-2 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Order information
              </span>
              <div>
                {/* Use reusable badge component for consistent status visualization */}
                <OrderStatusBadge status={order?.status} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Grid thông tin: 1 cột trên mobile, 2 cột từ sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Order code
                </p>
                <p className="font-medium">{order?.code}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Order date
                </p>
                <p className="font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {formatDateUS(order?.timeOrder)}
                </p>
              </div>
              {order?.timePay && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Payment date
                  </p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDateUS(order?.timePay)}
                  </p>
                </div>
              )}
              {order?.paymentMethod && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Payment method
                  </p>
                  <p className="font-medium">{order?.paymentMethod}</p>
                </div>
              )}
              {order?.ship && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Shipping method
                  </p>
                  <p className="font-medium">{order?.ship}</p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Products</h3>
              <div className="space-y-4">
                {/* Sử dụng CartItemCard (viewMode="compact") để đảm bảo giao diện và logic giá nhất quán, ẩn checkbox/controls không cần thiết trong trang chi tiết đơn hàng */}
                {order?.cartEntities.map(item => (
                  <CartItemCard
                    key={item.id}
                    item={item as any}
                    viewMode="compact"
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrencyUSD(order?.totalPrice || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee</span>
                <span>{formatCurrencyUSD(order?.feeShip || 0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total payment</span>
                <span className="text-lg">
                  {formatCurrencyUSD(totalPayment)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer info and address */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Customer information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer name
              </p>
              <p className="font-medium">
                {order?.orderAddressDTO?.firstName +
                  " " +
                  order?.orderAddressDTO?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Phone number
              </p>
              <p className="font-medium flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {order?.orderAddressDTO?.phoneNumber}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 font-medium mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping address
              </h3>
              <p>{order?.orderAddressDTO?.addressLine1}</p>
              {order?.orderAddressDTO?.addressLine2 && (
                <p>{order?.orderAddressDTO?.addressLine2}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailPage;

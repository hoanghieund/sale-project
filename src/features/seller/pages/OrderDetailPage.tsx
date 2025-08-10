/**
 * @fileoverview Trang chi tiết đơn hàng cho seller.
 * Hiển thị thông tin chi tiết của một đơn hàng và cho phép cập nhật trạng thái.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderStatus } from "@/types";
import { formatCurrencyVND } from "@/utils/formatters";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  ChevronDown,
  ClipboardCheck,
  Clock,
  MapPin,
  Package,
  Phone,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../services/orderService";
import { Badge } from "@/components/ui/badge";

/**
 * @function OrderDetailPage
 * @description Trang chi tiết đơn hàng cho seller.
 * @returns {JSX.Element} Component OrderDetailPage.
 */
const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) {
        setError("ID đơn hàng không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        const orderData = await orderService.getOrderById(Number(orderId));
        if (orderData) {
          setOrder(orderData);
        } else {
          setError("Không tìm thấy đơn hàng");
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(
            err.response?.data?.message ||
              "Không thể tải thông tin đơn hàng. Vui lòng thử lại sau."
          );
        } else {
          setError("Đã xảy ra lỗi không xác định.");
        }
        console.error("Error loading order detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (!order) return;

    try {
      const updatedOrder = await orderService.updateOrderStatus(order.id, newStatus);
      if (updatedOrder) {
        setOrder(updatedOrder);

        // Hiển thị thông báo thành công
        toast({
          title: "Cập nhật thành công",
          description: `Đơn hàng #${updatedOrder.code} đã được cập nhật trạng thái.`,
        });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast({
        title: "Cập nhật thất bại",
        description: "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  // Render trạng thái đơn hàng
  const renderOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Chờ xác nhận</Badge>;
      case OrderStatus.CONFIRMED:
        return <Badge variant="outline" className="bg-blue-100 text-blue-600">Đã xác nhận</Badge>;
      case OrderStatus.PROCESSING:
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Đang xử lý</Badge>;
      case OrderStatus.SHIPPED:
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-600">Đang giao hàng</Badge>;
      case OrderStatus.DELIVERED:
        return <Badge variant="outline" className="bg-green-100 text-emerald-600">Đã giao hàng</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge variant="outline" className="bg-red-100 text-red-600">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  // Render dropdown menu cập nhật trạng thái
  const renderStatusUpdateMenu = () => {
    if (!order) return null;

    // Xác định các trạng thái tiếp theo có thể chuyển đến
    const nextPossibleStatuses: { status: OrderStatus; label: string }[] = [];

    switch (order.status) {
      case OrderStatus.PENDING:
        nextPossibleStatuses.push(
          { status: OrderStatus.CONFIRMED, label: "Xác nhận đơn hàng" },
          { status: OrderStatus.CANCELLED, label: "Hủy đơn hàng" }
        );
        break;
      case OrderStatus.CONFIRMED:
        nextPossibleStatuses.push(
          { status: OrderStatus.PROCESSING, label: "Bắt đầu xử lý" },
          { status: OrderStatus.CANCELLED, label: "Hủy đơn hàng" }
        );
        break;
      case OrderStatus.PROCESSING:
        nextPossibleStatuses.push(
          { status: OrderStatus.SHIPPED, label: "Bắt đầu giao hàng" },
          { status: OrderStatus.CANCELLED, label: "Hủy đơn hàng" }
        );
        break;
      case OrderStatus.SHIPPED:
        nextPossibleStatuses.push(
          { status: OrderStatus.DELIVERED, label: "Xác nhận đã giao" }
        );
        break;
      // Đối với đơn hàng đã giao hoặc đã hủy, không có trạng thái tiếp theo
      case OrderStatus.DELIVERED:
      case OrderStatus.CANCELLED:
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
            Cập nhật trạng thái <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {nextPossibleStatuses.map((item) => (
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

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50 pb-2">
            <CardTitle className="text-red-700 text-lg">Lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error || "Không tìm thấy đơn hàng"}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => navigate("/seller/orders")}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đơn hàng
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/seller/orders")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng #{order.code}</h1>
        </div>
        <div className="flex items-center gap-2">
          {renderStatusUpdateMenu()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thông tin đơn hàng */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Thông tin đơn hàng
              </span>
              <div>{renderOrderStatus(order.status)}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mã đơn hàng</p>
                <p className="font-medium">{order.code}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ngày đặt hàng</p>
                <p className="font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {new Date(order.timeOrder).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {order.timePay && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ngày thanh toán</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {new Date(order.timePay).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phương thức thanh toán</p>
                <p className="font-medium">
                  {order.paymentMethod?.name || "Thanh toán khi nhận hàng"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phương thức vận chuyển</p>
                <p className="font-medium">{order.ship?.name || "Giao hàng tiêu chuẩn"}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Sản phẩm</h3>
              <div className="space-y-4">
                {order.cartEntities.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.productDTO?.imagesDTOList?.[0]?.path || "https://via.placeholder.com/150"}
                        alt={item.productDTO?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productDTO?.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrencyVND(item.totalPrice)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrencyVND(item.productDTO?.price || 0)} / sản phẩm
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng tiền hàng</span>
                <span>{formatCurrencyVND(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrencyVND(order.feeShip)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Tổng thanh toán</span>
                <span className="text-lg">{formatCurrencyVND(order.sumTotal)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin khách hàng và địa chỉ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Thông tin khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tên khách hàng</p>
              <p className="font-medium">{order.orderAddressDTO?.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
              <p className="font-medium flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {order.phoneNumber}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 font-medium mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                Địa chỉ giao hàng
              </h3>
              <p>{order.orderAddressDTO?.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailPage;

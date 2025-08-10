/**
 * @fileoverview Component hiển thị bảng danh sách đơn hàng cho seller.
 * Cho phép xem, tìm kiếm và cập nhật trạng thái đơn hàng.
 */

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus } from "@/types";
import { formatCurrencyVND } from "@/utils/formatters";
import { AxiosError } from "axios";
import { ChevronDown, Eye, MoreHorizontal, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { sellerService } from "../services/sellerService";

/**
 * @interface OrderTableProps
 * @description Props cho component OrderTable.
 */
interface OrderTableProps {
  status?: OrderStatus | "all"; // Trạng thái đơn hàng để lọc, "all" là tất cả
}

/**
 * @function OrderTable
 * @description Component hiển thị bảng danh sách đơn hàng cho seller.
 * @param {OrderTableProps} props - Props cho component.
 * @returns {JSX.Element} Component OrderTable.
 */
const OrderTable: React.FC<OrderTableProps> = ({ status = "all" }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Lấy thông tin shop của seller
  const [shopId, setShopId] = useState<number | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shop = await sellerService.getShop();
        if (shop) {
          setShopId(typeof shop.id === 'string' ? parseInt(shop.id, 10) : shop.id);
        }
      } catch (err) {
        console.error("Error fetching shop data:", err);
      }
    };

    fetchShopData();
  }, []);

  // Fetch đơn hàng khi component mount hoặc khi status thay đổi
  useEffect(() => {
    const fetchOrders = async () => {
      if (!shopId) return;

      setLoading(true);
      setError(null);
      try {
        let fetchedOrders: Order[];
        if (status === "all") {
          fetchedOrders = await orderService.getOrdersByShop(shopId);
        } else {
          fetchedOrders = await orderService.getOrdersByShopAndStatus(shopId, status as OrderStatus);
        }
        setOrders(fetchedOrders);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(
            err.response?.data?.message ||
              "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau."
          );
        } else {
          setError("Đã xảy ra lỗi không xác định.");
        }
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [shopId, status]);

  // Xử lý tìm kiếm đơn hàng
  const handleSearch = async () => {
    if (!shopId) return;

    setLoading(true);
    setError(null);
    try {
      const searchResults = await orderService.searchOrders(shopId, searchKeyword);
      setOrders(searchResults);
    } catch (err) {
      console.error("Error searching orders:", err);
      setError("Không thể tìm kiếm đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý reset tìm kiếm
  const handleResetSearch = async () => {
    if (!shopId) return;

    setSearchKeyword("");
    setLoading(true);
    setError(null);
    try {
      let fetchedOrders: Order[];
      if (status === "all") {
        fetchedOrders = await orderService.getOrdersByShop(shopId);
      } else {
        fetchedOrders = await orderService.getOrdersByShopAndStatus(shopId, status as OrderStatus);
      }
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Error resetting search:", err);
      setError("Không thể tải lại danh sách đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, newStatus);
      if (updatedOrder) {
        // Cập nhật danh sách đơn hàng
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

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

  // Xử lý xem chi tiết đơn hàng
  const handleViewOrderDetail = (orderId: number) => {
    navigate(`/seller/orders/${orderId}`);
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
  const renderStatusUpdateMenu = (order: Order) => {
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
          <Button variant="outline" size="sm">
            Cập nhật <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {nextPossibleStatuses.map((item) => (
            <DropdownMenuItem
              key={item.status}
              onClick={() => handleUpdateStatus(order.id, item.status)}
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
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm theo mã đơn hàng, tên khách hàng, số điện thoại..."
            className="pl-8"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {searchKeyword && (
            <button
              onClick={handleResetSearch}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {/* Bảng đơn hàng */}
      {orders.length === 0 ? (
        <div className="text-center py-8 bg-background border rounded-md">
          <p className="text-muted-foreground">Không có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.orderAddressDTO?.fullName}</p>
                      <p className="text-sm text-muted-foreground">{order.phoneNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.timeOrder).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>{formatCurrencyVND(order.totalPrice)}</TableCell>
                  <TableCell>{renderOrderStatus(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewOrderDetail(order.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {renderStatusUpdateMenu(order)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrderTable;

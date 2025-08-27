import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types";
import React from "react";

/**
 * @component OrderStatusBadge
 * @description Hiển thị badge trạng thái đơn hàng thống nhất toàn hệ thống.
 * Luôn map theo enum OrderStatus (ALL | 0..3). Không xử lý logic khác ngoài trình bày UI.
 */
export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({
  status,
}) => {
  // Map màu + nhãn theo trạng thái số (0-3). ALL sẽ rơi vào default.
  switch (status) {
    case OrderStatus.PENDING_CONFIRMATION:
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          {/* Pending: chờ xác nhận từ seller */}
          Pending confirmation
        </Badge>
      );
    case OrderStatus.AWAITING_PICKUP:
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-600">
          {/* Await: chờ đơn vị vận chuyển lấy hàng */}
          Await pickup
        </Badge>
      );
    case OrderStatus.IN_DELIVERY:
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800">
          {/* In delivery: đang giao */}
          In delivery
        </Badge>
      );
    case OrderStatus.COMPLETED:
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-600">
          {/* Completed: đã hoàn tất */}
          Completed
        </Badge>
      );
    case OrderStatus.CANCELLED:
      return (
        <Badge variant="outline" className="bg-red-100 text-red-600">
          {/* Cancelled: đã hủy */}
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">Undefined</Badge>;
  }
};

export default OrderStatusBadge;

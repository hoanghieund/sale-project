// src/features/users/account-management/components/OrderList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order } from '@/features/users/account-management/types/order';
import { format } from 'date-fns';
import React from 'react';

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
  // Dữ liệu giả định cho các đơn hàng
  const mockOrders: Order[] = [
    {
      id: 'ORD001',
      userId: 'user1',
      orderDate: '2023-01-15T10:00:00Z',
      status: 'delivered',
      totalAmount: 1500000,
      items: [
        { productId: 'PROD001', name: 'Áo thun nam', quantity: 1, price: 500000, image: '/assets/0d168f09-ff48-4572-a4c2-4d2d0a235c07.jpg' },
        { productId: 'PROD002', name: 'Quần jean nữ', quantity: 1, price: 1000000, image: '/assets/1dfab7a2-63d8-4e55-8131-ff595959683b.jpg' },
      ],
    },
    {
      id: 'ORD002',
      userId: 'user1',
      orderDate: '2023-02-20T14:30:00Z',
      status: 'pending',
      totalAmount: 750000,
      items: [
        { productId: 'PROD003', name: 'Giày thể thao', quantity: 1, price: 750000, image: '/assets/4e44a15e-efe7-43c2-b4b1-10c83a01ae32.jpg' },
      ],
    },
    {
      id: 'ORD003',
      userId: 'user1',
      orderDate: '2023-03-01T09:00:00Z',
      status: 'processing',
      totalAmount: 200000,
      items: [
        { productId: 'PROD004', name: 'Mũ lưỡi trai', quantity: 2, price: 100000, image: '/assets/4e705d92-5f89-4690-9e02-cc1e494f6ce4.jpg' },
      ],
    },
    {
      id: 'ORD004',
      userId: 'user1',
      orderDate: '2023-03-05T11:45:00Z',
      status: 'shipped',
      totalAmount: 1200000,
      items: [
        { productId: 'PROD005', name: 'Đồng hồ thông minh', quantity: 1, price: 1200000, image: '/assets/4eb51449-7315-4a2f-8668-f3c764137922.jpg' },
      ],
    },
    {
      id: 'ORD005',
      userId: 'user1',
      orderDate: '2023-04-10T16:00:00Z',
      status: 'delivered',
      totalAmount: 300000,
      items: [
        { productId: 'PROD006', name: 'Balo du lịch', quantity: 1, price: 300000, image: '/assets/5e57f14e-cff8-4d38-bb4e-25d62a989da2.jpg' },
      ],
    },
    {
      id: 'ORD006',
      userId: 'user1',
      orderDate: '2023-04-12T18:00:00Z',
      status: 'cancelled',
      totalAmount: 450000,
      items: [
        { productId: 'PROD007', name: 'Tai nghe Bluetooth', quantity: 1, price: 450000, image: '/assets/8d57056f-7742-449c-9658-92c75f7fb2f9.jpg' },
      ],
    },
  ];

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = status === 'all'
    ? mockOrders
    : mockOrders.filter(order => {
      if (status === 'pending_confirmation') return order.status === 'pending';
      if (status === 'awaiting_pickup') return order.status === 'processing';
      if (status === 'in_delivery') return order.status === 'shipped';
      if (status === 'completed') return order.status === 'delivered';
      return false;
    });

  return (
    <div className="mt-4">
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-700">Không có đơn hàng nào với trạng thái này.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Đơn hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Sản phẩm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-sm">{order.id}</TableCell> {/* Thêm text-sm */}
                <TableCell className="text-sm">{format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')}</TableCell> {/* Thêm text-sm */}
                <TableCell className="text-sm">{order.totalAmount.toLocaleString('vi-VN')} VND</TableCell> {/* Thêm text-sm */}
                <TableCell className="text-sm"> {/* Thêm text-sm */}
                  {
                    order.status === 'pending' ? 'Chờ xác nhận' :
                    order.status === 'processing' ? 'Chờ lấy hàng' :
                    order.status === 'shipped' ? 'Đang giao' :
                    order.status === 'delivered' ? 'Hoàn thành' :
                    'Đã hủy'
                  }
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {order.items.map(item => (
                      <div key={item.productId} className="flex items-center gap-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            width={50} // Thay đổi kích thước hình ảnh
                            height={50} // Thay đổi kích thước hình ảnh
                            className="rounded-md object-cover"
                          />
                        )}
                        <span className="text-sm">{item.name} (x{item.quantity})</span> {/* Thêm text-sm */}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;
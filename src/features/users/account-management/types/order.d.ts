/**
 * Order Types
 * @module types/order
 */

// TODO: Define order related types
export interface Order {
  id: string;
  userId: string;
  orderDate: string; // ISO 8601 string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string; // Thêm trường image cho hình ảnh sản phẩm
}
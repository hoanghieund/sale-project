import CartItemCard from "@/features/users/cart/components/CartItemCard";
import { Cart } from "@/types";

/**
 * Danh sách item trong Order Summary
 * Tối ưu hóa re-render bằng cách chỉ nhận mảng items đã tính sẵn từ parent
 */
interface Props {
  items: Cart[];
}

const OrderItemsList = ({ items }: Props) => {
  return (
    <div className="space-y-4 mb-4">
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderItemsList;
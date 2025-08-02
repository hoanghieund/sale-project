import { CartByShop } from "../types/cart-types";
import CartItemCard from "./CartItemCard"; // Import CartItemCard

interface ShopCartSectionProps {
  shopCart: CartByShop;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
}

/**
 * @component ShopCartSection
 * @description Hiển thị danh sách các sản phẩm trong giỏ hàng theo từng cửa hàng.
 * @param {ShopCartSectionProps} props - Props cho component ShopCartSection.
 * @param {CartByShop} props.shopCart - Đối tượng giỏ hàng theo cửa hàng.
 * @param {function} props.removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @param {function} props.updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 */
const ShopCartSection = ({ shopCart, removeFromCart, updateQuantity }: ShopCartSectionProps) => {
  return (
    <div key={shopCart.shopId} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        Shop: {shopCart.shopName}
      </h2>
      {shopCart.cartDTOList.map(item => (
        <CartItemCard
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
};

export default ShopCartSection;
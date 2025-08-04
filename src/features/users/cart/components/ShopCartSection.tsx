import { CartByShop } from "../types/cart-types";
import CartItemCard from "./CartItemCard"; // Import CartItemCard

/**
 * @interface ShopCartSectionProps
 * @description Định nghĩa các props cho component ShopCartSection.
 * @property {CartByShop} shopCart - Đối tượng giỏ hàng theo cửa hàng.
 * @property {(itemId: number) => void} removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @property {(itemId: number, newQuantity: number) => void} updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 * @property {Set<string>} selectedItems - Tập hợp các ID sản phẩm được chọn.
 * @property {(productId: string, isSelected: boolean) => void} onSelectItem - Hàm xử lý khi chọn hoặc bỏ chọn một sản phẩm.
 */
interface ShopCartSectionProps {
  shopCart: CartByShop;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  selectedItems: Set<string>;
  onSelectItem: (productId: string, isSelected: boolean) => void;
}

/**
 * @component ShopCartSection
 * @description Hiển thị danh sách các sản phẩm trong giỏ hàng theo từng cửa hàng.
 * @param {ShopCartSectionProps} props - Props cho component ShopCartSection.
 * @param {CartByShop} props.shopCart - Đối tượng giỏ hàng theo cửa hàng.
 * @param {function} props.removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @param {function} props.updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 */
const ShopCartSection = ({ shopCart, removeFromCart, updateQuantity, selectedItems, onSelectItem }: ShopCartSectionProps) => {
  return (
    <div key={shopCart.id} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        Shop: {shopCart.shopName}
      </h2>
      {shopCart.cartDTOList.map(item => (
        <CartItemCard
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          isSelected={selectedItems.has(item.id.toString())}
          onSelect={onSelectItem}
        />
      ))}
    </div>
  );
};

export default ShopCartSection;
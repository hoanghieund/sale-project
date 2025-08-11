import CartItemCard from "@/components/common/CartItemCard"; // Import CartItemCard
import { CartByShop } from "../types/cart-types";

/**
 * @interface ShopCartSectionProps
 * @description Defines the props for the ShopCartSection component.
 * @property {CartByShop} shopCart - The cart object by shop.
 * @property {(itemId: number) => void} removeFromCart - Function to handle removing a product from the cart.
 * @property {(itemId: number, newQuantity: number) => void} updateQuantity - Function to handle updating the product quantity.
 * @property {Set<string>} selectedItems - Set of selected product IDs.
 * @property {(productId: string, isSelected: boolean) => void} onSelectItem - Function to handle selecting or deselecting a product.
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
 * @description Displays the list of products in the cart by shop.
 * @param {ShopCartSectionProps} props - Props for the ShopCartSection component.
 * @param {CartByShop} props.shopCart - The cart object by shop.
 * @param {function} props.removeFromCart - Function to handle removing a product from the cart.
 * @param {function} props.updateQuantity - Function to handle updating the product quantity.
 */
const ShopCartSection = ({
  shopCart,
  removeFromCart,
  updateQuantity,
  selectedItems,
  onSelectItem,
}: ShopCartSectionProps) => {
  return (
    <div key={shopCart.id} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Shop: {shopCart.shopName}</h2>
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

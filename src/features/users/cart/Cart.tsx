import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // Import Label component
import { useCart } from "@/providers/cart-provider";
import { useNavigate } from "react-router-dom";
import CartSummaryCard from "./components/CartSummaryCard";
import EmptyCartMessage from "./components/EmptyCartMessage";
import ShopCartSection from "./components/ShopCartSection";

/**
 * @component Cart
 * @description Component hiển thị giỏ hàng với các sản phẩm đã được thêm.
 * Sử dụng CartProvider context để quản lý state và logic cart.
 * Hiển thị danh sách sản phẩm theo cửa hàng và form checkout.
 */
const Cart = () => {
  // Navigation hook để điều hướng đến trang checkout
  const navigate = useNavigate();

  // Sử dụng custom hook để truy cập Cart context
  const {
    cartByShop,
    isLoading,
    selectedItems,
    cartSummary,
    removeFromCart,
    updateQuantity,
    prepareCheckout,
    onSelectItem,
    onSelectAll, // Thêm onSelectAll từ useCart hook
  } = useCart();

  // Tính toán trạng thái checked của checkbox "Chọn tất cả sản phẩm"
  const isAllSelected =
    cartByShop.length > 0 &&
    cartByShop.every(shopCart =>
      shopCart.cartDTOList.every(item => selectedItems.has(item.id.toString()))
    );

  /**
   * @function handleCheckout
   * @description Xử lý checkout: chuẩn bị dữ liệu và điều hướng đến trang checkout.
   * Sử dụng prepareCheckout từ context để validate và chuẩn bị dữ liệu.
   */
  const handleCheckout = () => {
    // Gọi prepareCheckout để validate và chuẩn bị dữ liệu
    const selectedItemsArray = prepareCheckout();

    // Nếu chuẩn bị thành công, điều hướng đến trang checkout
    if (selectedItemsArray) {
      navigate("/checkout");
    }
    // Nếu không thành công, prepareCheckout đã hiển thị toast error
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartByShop.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              {/* Checkbox component từ shadcn/ui */}
              <Checkbox
                id="select-all-products"
                checked={isAllSelected} // Cập nhật trạng thái checked dựa trên isAllSelected
                onCheckedChange={onSelectAll} // Kết nối onCheckedChange với onSelectAll
              />
              {/* Label cho checkbox */}
              <Label
                htmlFor="select-all-products"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Chọn tất cả sản phẩm
              </Label>
            </div>
          )}
          {/*
            Điều chỉnh hiển thị LoadingSpinner:
            - Đặt spinner bên trong div chứa nội dung giỏ hàng.
            - Khi isLoading là true, làm mờ nội dung và hiển thị spinner.
            - Sử dụng `relative` trên div cha và `absolute inset-0` trên div của spinner
              để spinner phủ lên toàn bộ khu vực nội dung.
          */}
          <div
            className={`relative ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner />
              </div>
            )}
            {cartByShop.length === 0 && !isLoading ? (
              <EmptyCartMessage />
            ) : (
              cartByShop.map(shopCart => (
                <ShopCartSection
                  key={shopCart.id}
                  shopCart={shopCart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  selectedItems={selectedItems}
                  onSelectItem={onSelectItem}
                />
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <CartSummaryCard
          cartSummary={cartSummary}
          disabledCheckout={isLoading}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Cart;

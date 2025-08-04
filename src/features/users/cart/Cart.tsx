import LoadingSpinner from "@/components/common/LoadingSpinner"; // Import LoadingSpinner
import { useToast } from "@/components/ui/use-toast";
import { calculateCartSummary } from "@/utils/cartUtils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartSummaryCard from "./components/CartSummaryCard";
import EmptyCartMessage from "./components/EmptyCartMessage";
import ShopCartSection from "./components/ShopCartSection";
import { cartService } from "./services/cartService";
import { CartByShop } from "./types/cart-types";

const Cart = () => {
  const navigate = useNavigate();
  const [cartByShop, setCartByShop] = useState<CartByShop[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Khởi tạo isLoading state
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set()); // State để lưu trữ các ID của các sản phẩm được người dùng chọn

  /**
   * @function fetchCartData
   * @description Lấy dữ liệu giỏ hàng từ API và cập nhật state.
   */
  const fetchCartData = async () => {
    setIsLoading(true); // Đặt isLoading thành true trước khi gọi API
    try {
      // Gọi API để lấy giỏ hàng
      const response = await cartService.getCart();
      setCartByShop(response);// Tính toán lại tổng tiền sau khi fetch dữ liệu
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Đặt isLoading thành false trong khối finally
    }
  };

  /**
   * @function removeFromCart
   * @description Xóa một mặt hàng khỏi giỏ hàng. Nếu cửa hàng không còn mặt hàng nào, xóa cả cửa hàng đó.
   * @param {number} itemId - ID của mặt hàng cần xóa.
   */
  const removeFromCart = async (itemId: number) => {
    try {
      await cartService.removeCartItem(itemId.toString()); // Chuyển itemId sang string nếu API yêu cầu
      toast({
        title: "Success",
        description: "Product removed from cart.",
      });
      fetchCartData(); // Tải lại giỏ hàng sau khi xóa
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to remove product from cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * @function updateQuantity
   * @description Cập nhật số lượng của một mặt hàng trong giỏ hàng.
   * @param {number} itemId - ID của mặt hàng cần cập nhật.
   * @param {number} newQuantity - Số lượng mới.
   */
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Đảm bảo số lượng không nhỏ hơn 1
    try {
      setIsLoading(true); // Đặt isLoading thành true khi bắt đầu cập nhật
      await cartService.updateCartItemQuantity(itemId.toString(), newQuantity);
      toast({
        title: "Success",
        description: "Cart quantity updated.",
      });
      fetchCartData(); // Tải lại giỏ hàng sau khi cập nhật
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to checkout.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("selectedItems", JSON.stringify(Array.from(selectedItems)));
    navigate("/checkout");
  };

  // useEffect để tải dữ liệu giỏ hàng khi component mount hoặc user.id thay đổi
  useEffect(() => {
    fetchCartData();
  }, []); // Thêm user.id vào dependency array

  const cartSummary = calculateCartSummary(cartByShop, selectedItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/*
            Điều chỉnh hiển thị LoadingSpinner:
            - Đặt spinner bên trong div chứa nội dung giỏ hàng.
            - Khi isLoading là true, làm mờ nội dung và hiển thị spinner.
            - Sử dụng `relative` trên div cha và `absolute inset-0` trên div của spinner
              để spinner phủ lên toàn bộ khu vực nội dung.
          */}
          <div className={`relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
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
                  onSelectItem={(value)=>{
                    setSelectedItems(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(value)) {
                        newSet.delete(value);
                      } else {
                        newSet.add(value);
                      }
                      return newSet;
                    });
                  }}
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

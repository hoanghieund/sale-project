import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import CartSummaryCard from "./components/CartSummaryCard";
import EmptyCartMessage from "./components/EmptyCartMessage";
import ShopCartSection from "./components/ShopCartSection";
import { cartService } from "./services/cartService";
import { CartByShop, CartItemType, CartSummary } from "./types/cart-types";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [cartByShop, setCartByShop] = useState<CartByShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useUser(); // Lấy thông tin người dùng từ context

  // State để lưu trữ tóm tắt giỏ hàng
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  /**
   * @function fetchCartData
   * @description Lấy dữ liệu giỏ hàng từ API và cập nhật state.
   */
  const fetchCartData = async () => {
    if (!user?.id) {
      setError("User not logged in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Gọi API để lấy giỏ hàng
      const response = await cartService.getCart(user.id);
      const fetchedCart = response.data.cartDTOList; // Giả định API trả về trực tiếp cartDTOList

      // Nhóm các sản phẩm theo cửa hàng
      const groupedCart: CartByShop[] = fetchedCart.reduce((acc: CartByShop[], item: CartItemType) => {
        const shopId = item.product.shop?.id || 0; // Sử dụng ID cửa hàng hoặc 0 nếu không có
        const shopName = item.product.shop?.name || "Unknown Shop";

        let shopCart = acc.find(cart => cart.shopId === shopId);
        if (!shopCart) {
          shopCart = { shopId, shopName, cartDTOList: [] };
          acc.push(shopCart);
        }
        shopCart.cartDTOList.push(item);
        return acc;
      }, []);

      setCartByShop(groupedCart);
      setCartSummary(calculateCartSummary(groupedCart)); // Tính toán lại tổng tiền sau khi fetch dữ liệu
      setError(null);
    } catch (err) {
      setError("Failed to load cart. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @function calculateCartSummary
   * @description Tính toán tổng tiền, chiết khấu, phí vận chuyển, thuế và tổng cộng dựa trên dữ liệu giỏ hàng.
   * @param {CartByShop[]} currentCartByShop - Dữ liệu giỏ hàng theo cửa hàng.
   * @returns {CartSummary} Đối tượng chứa các giá trị tổng kết.
   */
  const calculateCartSummary = (currentCartByShop: CartByShop[]): CartSummary => {
    let subtotal = 0;
    // Tính tổng phụ từ tất cả các mặt hàng trong giỏ hàng
    currentCartByShop.forEach(shopCart => {
      shopCart.cartDTOList.forEach(item => {
        subtotal += (item.product.price || 0) * item.quantity;
      });
    });

    // Logic chiết khấu, vận chuyển, thuế (có thể lấy từ API nếu có)
    const discount = 0;
    const shipping = subtotal > 100 ? 0 : 10;
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const total = subtotal - discount + shipping + tax;

    return { subtotal, discount, shipping, tax, total };
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
      await cartService.updateCartItemQuantity(itemId.toString(), newQuantity); // Chuyển itemId sang string nếu API yêu cầu
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

  /**
   * @function handleApplyCoupon
   * @description Xử lý logic áp dụng mã giảm giá.
   */
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponError("");
    try {
      const response = await cartService.applyCouponCode(couponCode);
      // Giả định API trả về thông tin giỏ hàng đã cập nhật hoặc thông báo thành công
      // Cần điều chỉnh tùy theo cấu trúc phản hồi của API
      if (response.data.success) { // Giả định có trường success
        toast({
          title: "Success",
          description: "Coupon applied successfully!",
        });
        fetchCartData(); // Tải lại giỏ hàng để cập nhật tổng tiền
      } else {
        setCouponError(response.data.message || "Invalid coupon code.");
      }
    } catch (err) {
      setCouponError("Failed to apply coupon. Please try again.");
      toast({
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * @function removeCoupon
   * @description Xóa mã giảm giá đã áp dụng.
   */
  const removeCoupon = () => {
    setCouponCode("");
    setCouponError("");
    // Hiện tại không có API removeCoupon, nên chỉ reset UI và tải lại dữ liệu
    // Nếu có API, cần gọi API ở đây
    fetchCartData();
  };

  // useEffect để tải dữ liệu giỏ hàng khi component mount hoặc user.id thay đổi
  useEffect(() => {
    fetchCartData();
  }, [user?.id]); // Thêm user.id vào dependency array

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartByShop.length === 0 ? (
            <EmptyCartMessage />
          ) : (
            cartByShop.map(shopCart => (
              <ShopCartSection
                key={shopCart.shopId}
                shopCart={shopCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))
          )}
        </div>

        {/* Order Summary */}
        <CartSummaryCard
          cartSummary={cartSummary}
          couponCode={couponCode}
          couponError={couponError}
          setCouponCode={setCouponCode}
          handleApplyCoupon={handleApplyCoupon}
          removeCoupon={removeCoupon}
        />
      </div>
    </div>
  );
};

export default Cart;

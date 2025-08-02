import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type Cart as CartItemType } from "@/types"; // Đổi tên Cart thành CartItemType để tránh trùng lặp
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Định nghĩa interface cho CartByShop
interface CartByShop {
  shopId: string;
  shopName: string;
  cartDTOList: CartItemType[];
}

// Định nghĩa interface cho CartSummary
interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string; // Thêm couponCode vào CartSummary
}

// Hàm getRandomImage placeholder
const getRandomImage = () => {
  const images = [
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Product1",
    "https://via.placeholder.com/150/00FF00/FFFFFF?text=Product2",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Product3",
  ];
  return images[Math.floor(Math.random() * images.length)];
};

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  // Khởi tạo cartByShop với dữ liệu giả định để test
  const [cartByShop, setCartByShop] = useState<CartByShop[]>([
    {
      shopId: "shop1",
      shopName: "Shop A",
      cartDTOList: [
        {
          id: "item1",
          quantity: 2,
          product: {
            id: "prod1",
            title: "Product 1",
            price: 10.0,
            images: [getRandomImage()],
            shop: { name: "Shop A" },
          },
          size: { name: "M" },
          color: { name: "Red" },
        },
        {
          id: "item2",
          quantity: 1,
          product: {
            id: "prod2",
            title: "Product 2",
            price: 25.0,
            images: [getRandomImage()],
            shop: { name: "Shop A" },
          },
          size: { name: "L" },
          color: { name: "Blue" },
        },
      ],
    },
    {
      shopId: "shop2",
      shopName: "Shop B",
      cartDTOList: [
        {
          id: "item3",
          quantity: 3,
          product: {
            id: "prod3",
            title: "Product 3",
            price: 5.0,
            images: [getRandomImage()],
            shop: { name: "Shop B" },
          },
          size: { name: "S" },
          color: { name: "Green" },
        },
      ],
    },
  ]);

  // State để lưu trữ tóm tắt giỏ hàng
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

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

    // Giả định logic chiết khấu, vận chuyển, thuế
    const discount = 0; // Thay thế bằng logic chiết khấu thực tế
    const shipping = subtotal > 100 ? 0 : 10; // Miễn phí vận chuyển nếu tổng phụ > 100
    const taxRate = 0.05; // Thuế 5%
    const tax = subtotal * taxRate;
    const total = subtotal - discount + shipping + tax;

    return { subtotal, discount, shipping, tax, total };
  };

  /**
   * @function removeFromCart
   * @description Xóa một mặt hàng khỏi giỏ hàng. Nếu cửa hàng không còn mặt hàng nào, xóa cả cửa hàng đó.
   * @param {string} itemId - ID của mặt hàng cần xóa.
   */
  const removeFromCart = (itemId: string) => {
    setCartByShop(prevCartByShop => {
      const newCartByShop = prevCartByShop
        .map(shopCart => {
          const updatedCartDTOList = shopCart.cartDTOList.filter(
            item => item.id !== itemId
          );
          return { ...shopCart, cartDTOList: updatedCartDTOList };
        })
        .filter(shopCart => shopCart.cartDTOList.length > 0); // Xóa cửa hàng nếu không còn mặt hàng nào
      return newCartByShop;
    });
  };

  /**
   * @function updateQuantity
   * @description Cập nhật số lượng của một mặt hàng trong giỏ hàng.
   * @param {string} itemId - ID của mặt hàng cần cập nhật.
   * @param {number} newQuantity - Số lượng mới.
   */
  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartByShop(prevCartByShop => {
      const newCartByShop = prevCartByShop.map(shopCart => {
        const updatedCartDTOList = shopCart.cartDTOList.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        return { ...shopCart, cartDTOList: updatedCartDTOList };
      });
      return newCartByShop;
    });
  };

  /**
   * @function handleApplyCoupon
   * @description Xử lý logic áp dụng mã giảm giá.
   */
  const handleApplyCoupon = () => {
    // Logic áp dụng mã giảm giá.
    // Tạm thời, giả định mã "SAVE10" giảm 10%.
    if (couponCode === "SAVE10") {
      setCartSummary(prevSummary => ({
        ...prevSummary,
        discount: prevSummary.subtotal * 0.1,
        total: prevSummary.subtotal * 0.9 + prevSummary.shipping + prevSummary.tax,
        couponCode: couponCode,
      }));
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  /**
   * @function removeCoupon
   * @description Xóa mã giảm giá đã áp dụng.
   */
  const removeCoupon = () => {
    setCouponCode("");
    setCouponError("");
    // Tái tính toán tổng tiền sau khi xóa mã giảm giá
    setCartSummary(calculateCartSummary(cartByShop));
  };

  // useEffect để tính toán lại tổng tiền khi cartByShop thay đổi
  useEffect(() => {
    setCartSummary(calculateCartSummary(cartByShop));
  }, [cartByShop]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartByShop.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-xl">Your cart is empty.</p>
              <Link to="/products">
                <Button variant="link" className="mt-4 text-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            cartByShop.map(shopCart => (
              <div key={shopCart.shopId} className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Shop: {shopCart.shopName}
                </h2>
                {shopCart.cartDTOList.map(item => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg p-6 shadow-sm border border-border"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={
                            (item.product as any).images?.[0] || getRandomImage()
                          }
                          alt={item.product.title || "Product"}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold line-clamp-2">
                              <Link
                                to={`/product/${item.product.id}`}
                                className="hover:text-primary"
                              >
                                {item.product.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              by {item.product.shop?.name || "Unknown Shop"}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            <span>Size: {item.size?.name || "Standard"}</span>
                            <span className="mx-2">•</span>
                            <span>Color: {item.color?.name || "Default"}</span>
                          </div>
                          <div className="font-semibold">
                            ${(item.product as any).price?.toFixed(2) || "0.00"}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= 10}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-bold">
                            $
                            {(
                              (item.product as any).price * item.quantity || 0
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-lg p-6 shadow-sm h-fit border border-border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Coupon Code */}
          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
              />
              <Button onClick={handleApplyCoupon} disabled={!couponCode}>
                Apply
              </Button>
            </div>
            {couponError && (
              <p className="text-sm text-destructive mt-1">{couponError}</p>
            )}
            {cartSummary.couponCode && (
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-green-600">
                  Coupon "{cartSummary.couponCode}" applied
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeCoupon}
                  className="text-muted-foreground"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartSummary.subtotal.toFixed(2)}</span>
            </div>

            {cartSummary.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${cartSummary.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {cartSummary.shipping === 0 ? "Free" : `$${cartSummary.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${cartSummary.tax.toFixed(2)}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cartSummary.total.toFixed(2)}</span>
            </div>
          </div>

          {cartSummary.shipping === 0 && cartSummary.subtotal < 100 && (
            <p className="text-sm text-muted-foreground mt-2">
              Add ${(100 - cartSummary.subtotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <Button className="w-full mt-6" size="lg" asChild>
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>

          <Link to="/products">
            <Button variant="outline" className="w-full mt-2">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, applyCoupon, removeCoupon } =
    useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    try {
      applyCoupon(couponCode);
      setCouponCode("");
      setCouponError("");
    } catch (error) {
      setCouponError(
        error instanceof Error ? error.message : "Invalid coupon code"
      );
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => (
            <div
              key={item.id}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
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
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {item.product.shop.name}
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
                      <span>Size: {item.size.value}</span>
                      <span className="mx-2">•</span>
                      <span>Color: {item.color.name}</span>
                    </div>
                    <div className="font-semibold">
                      ${item.product.price.toFixed(2)}
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
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            {cart.couponCode && (
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-green-600">
                  Coupon "{cart.couponCode}" applied
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
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>

            {cart.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${cart.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {cart.shipping === 0 ? "Free" : `$${cart.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${cart.tax.toFixed(2)}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>

          {cart.shipping === 0 && cart.subtotal < 100 && (
            <p className="text-sm text-muted-foreground mt-2">
              Add ${(100 - cart.subtotal).toFixed(2)} more for free shipping!
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// Định nghĩa interface cho CartSummary
interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
}

interface CartSummaryCardProps {
  cartSummary: CartSummary;
  couponCode: string;
  couponError: string;
  setCouponCode: (code: string) => void;
  handleApplyCoupon: () => void;
  removeCoupon: () => void;
}

/**
 * @component CartSummaryCard
 * @description Hiển thị tóm tắt đơn hàng, bao gồm mã giảm giá, tổng phụ, chiết khấu, vận chuyển, thuế và tổng cộng.
 * @param {CartSummaryCardProps} props - Props cho component CartSummaryCard.
 * @param {CartSummary} props.cartSummary - Đối tượng chứa các giá trị tổng kết giỏ hàng.
 * @param {string} props.couponCode - Mã giảm giá hiện tại.
 * @param {string} props.couponError - Thông báo lỗi mã giảm giá.
 * @param {function} props.setCouponCode - Hàm cập nhật mã giảm giá.
 * @param {function} props.handleApplyCoupon - Hàm xử lý áp dụng mã giảm giá.
 * @param {function} props.removeCoupon - Hàm xử lý xóa mã giảm giá.
 */
const CartSummaryCard = ({
  cartSummary,
  couponCode,
  couponError,
  setCouponCode,
  handleApplyCoupon,
  removeCoupon,
}: CartSummaryCardProps) => {
  return (
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
  );
};

export default CartSummaryCard;
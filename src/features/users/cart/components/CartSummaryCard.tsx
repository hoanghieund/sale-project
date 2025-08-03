import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyUSD } from "@/utils/formatters";
import { Link } from "react-router-dom";

interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartSummaryCardProps {
  cartSummary: CartSummary;
  disabledCheckout?: boolean;
}

/**
 * @component CartSummaryCard
 * @description Hiển thị tóm tắt đơn hàng, bao gồm mã giảm giá, tổng phụ, chiết khấu, vận chuyển, thuế và tổng cộng.
 * @param {CartSummaryCardProps} props - Props cho component CartSummaryCard.
 * @param {CartSummary} props.cartSummary - Đối tượng chứa các giá trị tổng kết giỏ hàng.
 */
const CartSummaryCard = ({ cartSummary, disabledCheckout }: CartSummaryCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm h-fit border border-border lg:sticky top-32 text-sm">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <Separator className="my-4 bg-black" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrencyUSD(cartSummary.subtotal)}</span>
        </div>

        {cartSummary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrencyUSD(cartSummary.discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {cartSummary.shipping === 0
              ? "Free"
              : `${formatCurrencyUSD(cartSummary.shipping)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatCurrencyUSD(cartSummary.tax)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrencyUSD(cartSummary.total)}</span>
        </div>
      </div>

      <Button className="w-full mt-6" size="lg" disabled={disabledCheckout}>
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>

      <Link to="/">
        <Button variant="outline" className="w-full mt-2">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default CartSummaryCard;

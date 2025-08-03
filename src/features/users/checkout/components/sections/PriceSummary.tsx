import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/features/users/cart/types/cart-types";

/**
 * Tóm tắt giá: Subtotal/Discount/Shipping/Tax/Total
 * Hiển thị đơn giản theo design system
 */
interface Props {
  summary: CartSummary;
}

const PriceSummary = ({ summary }: Props) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${summary.subtotal.toFixed(2)}</span>
      </div>

      {summary.discount > 0 && (
        <div className="flex justify-between text-emerald-600">
          <span>Discount</span>
          <span>-${summary.discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax</span>
        <span>${summary.tax.toFixed(2)}</span>
      </div>

      <Separator className="my-2" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${summary.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
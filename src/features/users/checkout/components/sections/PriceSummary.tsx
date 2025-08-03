import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/features/users/cart/types/cart-types";
import { formatCurrencyUSD } from "@/utils/formatters";

/**
 * Tóm tắt giá: Subtotal/Discount/Shipping/Tax/Total
 * Hiển thị đơn giản theo design system
 */
interface Props {
  summary: CartSummary;
}

const PriceSummary = ({ summary }: Props) => {
  return (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrencyUSD(summary.subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {summary.shipping === 0
              ? "Free"
              : `${formatCurrencyUSD(summary.shipping)}`}
          </span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrencyUSD(summary.total)}</span>
        </div>
      </div>
  );
};

export default PriceSummary;
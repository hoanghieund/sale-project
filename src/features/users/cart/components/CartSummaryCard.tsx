import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyUSD } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { CartSummary } from "../types/cart-types";

interface CartSummaryCardProps {
  cartSummary: CartSummary;
  disabledCheckout?: boolean;
  handleCheckout: () => void;
}

/**
 * @component CartSummaryCard
 * @description Displays the order summary, including discount codes, subtotal, discount, shipping, tax, and total.
 * @param {CartSummaryCardProps} props - Props for the CartSummaryCard component.
 * @param {CartSummary} props.cartSummary - Object containing the cart summary values.
 */
const CartSummaryCard = ({
  cartSummary,
  disabledCheckout,
  handleCheckout,
}: CartSummaryCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm h-fit border border-border lg:sticky top-32 text-sm">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <Separator className="my-4 bg-black" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrencyUSD(cartSummary.subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {cartSummary.shipping === 0
              ? "Free"
              : `${formatCurrencyUSD(cartSummary.shipping)}`}
          </span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrencyUSD(cartSummary.total)}</span>
        </div>
      </div>

      <Button onClick={handleCheckout} className="w-full mt-6" size="lg" disabled={disabledCheckout}>
        Proceed to Checkout
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

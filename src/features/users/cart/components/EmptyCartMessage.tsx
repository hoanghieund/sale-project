import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * @component EmptyCartMessage
 * @description Displays a message when the cart is empty and a "Start Shopping" button.
 */
const EmptyCartMessage = () => {
  return (
    <div className="text-center text-muted-foreground py-12">
      <p className="text-xl">Your shopping cart is empty.</p>
      <Link to="/">
        <Button variant="link" className="mt-4 text-lg">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCartMessage;

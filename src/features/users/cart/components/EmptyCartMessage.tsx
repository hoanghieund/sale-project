import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * @component EmptyCartMessage
 * @description Hiển thị thông báo khi giỏ hàng trống và nút "Start Shopping".
 */
const EmptyCartMessage = () => {
  return (
    <div className="text-center text-muted-foreground py-12">
      <p className="text-xl">Your cart is empty.</p>
      <Link to="/products">
        <Button variant="link" className="mt-4 text-lg">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCartMessage;
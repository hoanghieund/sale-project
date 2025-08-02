import { Button } from "@/components/ui/button";
import { Cart } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  item: Cart;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
}

/**
 * @component CartItemCard
 * @description Hiển thị thông tin chi tiết của một sản phẩm trong giỏ hàng.
 * @param {CartItemCardProps} props - Props cho component CartItemCard.
 * @param {CartItemType} props.item - Đối tượng sản phẩm trong giỏ hàng.
 * @param {function} props.removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @param {function} props.updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 */
const CartItemCard = ({ item, removeFromCart, updateQuantity }: CartItemCardProps) => {
  return (
    <div
      key={item.id}
      className="bg-card rounded-lg p-6 shadow-sm border border-border"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={item.productDTO?.imagesDTOList?.[0]?.path}
            alt={item.productDTO?.title || "Product"}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold line-clamp-2">
                <Link
                  to={`/product/${item.productDTO?.id}`}
                  className="hover:text-primary"
                >
                  {item.productDTO?.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                by {item.productDTO?.shop?.name || "Unknown Shop"}
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
            {/* <div className="text-sm text-muted-foreground">
              <span>Size: {item.productDTO?.size?.name || "Standard"}</span>
              <span className="mx-2">•</span>
              <span>Color: {item.productDTO?.color?.name || "Default"}</span>
            </div> */}
            <div className="font-semibold">
              ${item.productDTO?.price?.toFixed(2) || "0.00"}
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
              ${(item.productDTO?.price * item.quantity || 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
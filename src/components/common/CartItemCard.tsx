import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cart } from "@/types";
import { calculatePrice } from "@/utils/cartUtils";
import { getColorValue } from "@/utils/colors";
import { formatCurrencyUSD } from "@/utils/formatters";
import { useVariantProduct } from "@/utils/productUtils";
import { Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the props for the CartItemCard component.
 * @interface CartItemCardProps
 * @property {Cart} item - The cart item object.
 * @property {(itemId: number) => void} [removeFromCart] - Optional function to remove the item from the cart.
 * @property {(itemId: number, newQuantity: number) => void} [updateQuantity] - Optional function to update the item quantity.
 * @property {'full' | 'compact'} [viewMode='full'] - Display mode of the card: 'full' for the cart, 'compact' for the checkout page.
 * @property {boolean} isSelected - Selected status of the product.
 * @property {(productId: string, isChecked: boolean) => void} onSelect - Callback function when selection status changes.
 */
interface CartItemCardProps {
  item: Cart;
  removeFromCart?: (itemId: number) => void;
  updateQuantity?: (itemId: number, newQuantity: number) => void;
  viewMode?: "full" | "compact";
  isSelected?: boolean;
  onSelect?: (productId: string, isChecked: boolean) => void;
}

/**
 * @component CartItemCard
 * @description Displays detailed information of a product in the cart.
 * @param {CartItemCardProps} props - Props for the CartItemCard component.
 * @param {CartItemType} props.item - The cart item object.
 * @param {function} props.removeFromCart - Function to handle removing the item from the cart.
 * @param {function} props.updateQuantity - Function to handle updating the item quantity.
 * @param {boolean} props.isSelected - Selected status of the product.
 * @param {function} props.onSelect - Function to handle selecting or deselecting the product.
 */
const CartItemCard = ({
  item,
  removeFromCart,
  updateQuantity,
  viewMode = "full", // Default to 'full' mode
  isSelected,
  onSelect,
}: CartItemCardProps) => {
  const { productDTO } = item;
  const variantProduct = useVariantProduct(productDTO);
  const isCompactMode = viewMode === "compact";
  // Chọn ảnh theo màu đã chọn trong cart: ưu tiên ảnh có optionId === colorId, fallback ảnh đầu tiên
  const selectedColorId = item?.variantValues?.colorId; // colorId là khóa chuẩn theo getVariantSlug()
  const allImages = productDTO?.imagesDTOList || [];
  // Lọc toàn bộ ảnh theo optionId rồi lấy phần tử đầu tiên (nếu có nhiều hơn 1 ảnh trùng)
  const colorMatchedImages = allImages.filter(
    img => img?.optionId === selectedColorId
  );
  const imageProduct = colorMatchedImages[0]?.path || allImages[0]?.path; // fallback ảnh đầu tiên nếu không có ảnh theo màu

  return (
    <Card key={item.id} className={"p-2 bg-card/30"}>
      <div className="flex gap-1">
        {/* Checkbox for selection */}
        {!isCompactMode && ( // Only display checkbox when not in compact mode
          <div className="flex items-center">
            <Checkbox
              id={item.id.toString()}
              checked={isSelected}
              onCheckedChange={checked =>
                onSelect(item.id.toString(), checked as boolean)
              }
              className="mr-2"
            />
          </div>
        )}
        {/* Product Image */}
        <div className={"w-20 h-full flex-shrink-0"}>
          <img
            src={imageProduct}
            alt={item.productDTO?.title || "Product"}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-0">
            <div>
              <h3 className="font-medium text-sm line-clamp-2">
                <Link
                  to={`/product/${item.productDTO?.slug}`}
                  className="hover:text-primary"
                >
                  {item.productDTO?.title}
                </Link>
              </h3>
              <p className="text-xs text-muted-foreground">
                by {item.productDTO?.shop?.name || "Unknown Shop"}
              </p>
            </div>
            {!isCompactMode &&
              removeFromCart && ( // Hide delete button in compact mode
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
          </div>

          {/* Product Variant Details (Hidden in compact mode) */}
          <div className="text-xs text-muted-foreground mb-0 flex flex-wrap items-center gap-1">
            {/* Helper function to find variant attribute name */}
            {(() => {
              const getVariantName = (slug: string, id: number | undefined) => {
                if (!id) return null;
                const variantType = variantProduct.find(
                  v => v.keyOption === slug
                );
                if (!variantType) return null;
                const value = variantType.values.find(val => val.id === id);
                return value ? value.name : null;
              };

              // Xử lý các variant một cách động
              const variantsToDisplay = [];

              // Duyệt qua tất cả các key trong item.variantValues
              Object.entries(item.variantValues || {}).forEach(
                ([key, value]) => {
                  if (value) {
                    // Chỉ xử lý nếu value không null/undefined
                    const variantName = getVariantName(key, value);
                    if (variantName) {
                      // Xử lý riêng cho color để hiển thị màu
                      if (key === "colorId") {
                        const colorHex = getColorValue(variantName);
                        variantsToDisplay.push(
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            Color:
                            {colorHex && (
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: colorHex,
                                  border: "1px solid #ccc",
                                }}
                              ></span>
                            )}
                          </Badge>
                        );
                      } else {
                        // Xử lý cho các variant khác
                        // Chuyển key thành label (ví dụ: "fitId" -> "Fit")
                        const label = key
                          .replace(/Id$/, "")
                          .replace(/([A-Z])/g, " $1")
                          .trim();
                        const capitalizedLabel =
                          label.charAt(0).toUpperCase() + label.slice(1);

                        variantsToDisplay.push(
                          <Badge variant="secondary">
                            {capitalizedLabel}: {variantName}
                          </Badge>
                        );
                      }
                    }
                  }
                }
              );

              return variantsToDisplay.length > 0 ? (
                <>
                  {variantsToDisplay.map((variant, index) => (
                    <React.Fragment key={index}>{variant}</React.Fragment>
                  ))}
                </>
              ) : (
                <p>No specific variants</p>
              );
            })()}
          </div>

          <div className="flex items-center justify-between mt-0 flex-wrap">
            {productDTO?.priceSale &&
            productDTO.priceSale < productDTO.price ? (
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-red-600">
                  {formatCurrencyUSD(productDTO.priceSale)}
                </span>
                <span className="text-gray-500 line-through text-xs">
                  {formatCurrencyUSD(productDTO.price || 0)}
                </span>
              </div>
            ) : (
              <div className="font-bold text-sm">
                {formatCurrencyUSD(productDTO?.price || 0)}
              </div>
            )}
            {productDTO.discount?.discount_percent > 0 && (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white hover:bg-red-600 text-xs"
              >
                {/* Discount percentage calculation formula: (Original Price - Sale Price) / Original Price * 100 */}
                -{productDTO.discount?.discount_percent}%
              </Badge>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-0">
            {/* Quantity selection component using Select */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Quantity:</span>
              {!isCompactMode && updateQuantity ? ( // Hide quantity controls in compact mode
                <Select
                  value={String(item.quantity)}
                  onValueChange={value =>
                    updateQuantity(item.id, Number(value))
                  }
                >
                  <SelectTrigger className="w-14 h-6">
                    <SelectValue placeholder="Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Create quantity options from 1 to a maximum of 10 or inventory quantity */}
                    {[...Array(999)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {item.quantity}
                </span>
              )}
            </div>
            <div className="font-bold text-sm">
              {formatCurrencyUSD(
                calculatePrice(
                  item.productDTO?.priceSale || item.productDTO?.price || 0,
                  item.quantity
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;

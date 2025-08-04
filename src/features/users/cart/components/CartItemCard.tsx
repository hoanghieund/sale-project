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
 * Định nghĩa các props cho component CartItemCard.
 * @interface CartItemCardProps
 * @property {Cart} item - Đối tượng sản phẩm trong giỏ hàng.
 * @property {(itemId: number) => void} [removeFromCart] - Hàm tùy chọn để xóa sản phẩm khỏi giỏ hàng.
 * @property {(itemId: number, newQuantity: number) => void} [updateQuantity] - Hàm tùy chọn để cập nhật số lượng sản phẩm.
 * @property {'full' | 'compact'} [viewMode='full'] - Chế độ hiển thị của card: 'full' cho giỏ hàng, 'compact' cho trang thanh toán.
 * @property {boolean} isSelected - Trạng thái đã chọn của sản phẩm.
 * @property {(productId: string, isChecked: boolean) => void} onSelect - Hàm callback khi trạng thái chọn thay đổi.
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
 * @description Hiển thị thông tin chi tiết của một sản phẩm trong giỏ hàng.
 * @param {CartItemCardProps} props - Props cho component CartItemCard.
 * @param {CartItemType} props.item - Đối tượng sản phẩm trong giỏ hàng.
 * @param {function} props.removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @param {function} props.updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 * @param {boolean} props.isSelected - Trạng thái đã chọn của sản phẩm.
 * @param {function} props.onSelect - Hàm xử lý khi chọn hoặc bỏ chọn sản phẩm.
 */
const CartItemCard = ({
  item,
  removeFromCart,
  updateQuantity,
  viewMode = "full", // Mặc định là chế độ 'full'
  isSelected,
  onSelect,
}: CartItemCardProps) => {
  const { productDTO } = item;
  const variantProduct = useVariantProduct(productDTO);
  const isCompactMode = viewMode === "compact";

  return (
    <Card key={item.id} className={isCompactMode ? "p-4" : "p-6"}>
      <div className="flex gap-4">
        {/* Checkbox for selection */}
        {!isCompactMode && ( // Chỉ hiển thị checkbox khi không ở chế độ compact
          <div className="flex items-center">
            <Checkbox
              id={item.id.toString()}
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(item.id.toString(), checked as boolean)}
              className="mr-2"
            />
          </div>
        )}
        {/* Product Image */}
        <div
          className={
            isCompactMode ? "w-20 h-20 flex-shrink-0" : "w-32 h-32 flex-shrink-0"
          }
        >
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
            {!isCompactMode && removeFromCart && ( // Ẩn nút xóa trong chế độ compact
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

          {/* Product Variant Details (Ẩn trong chế độ compact) */}
          {!isCompactMode && (
            <div className="text-sm text-muted-foreground mb-2 flex flex-wrap items-center gap-2">
              {/* Hàm trợ giúp để tìm tên thuộc tính biến thể */}
              {(() => {
                const getVariantName = (
                  slug: string,
                  id: number | undefined
                ) => {
                  if (!id) return null;
                  const variantType = variantProduct.find(
                    (v) => v.slug === slug
                  );
                  if (!variantType) return null;
                  const value = variantType.values.find((val) => val.id === id);
                  return value ? value.name : null;
                };

                const variantsToDisplay = [];
                const colorName = getVariantName("colorId", item.colorId);
                if (colorName) {
                  const colorHex = getColorValue(colorName);
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
                }
                const fitName = getVariantName("fitId", item.fitId);
                if (fitName) {
                  variantsToDisplay.push(
                    <Badge variant="secondary">Fit: {fitName}</Badge>
                  );
                }
                const printLocationName = getVariantName(
                  "printLocationId",
                  item.printLocationId
                );
                if (printLocationName) {
                  variantsToDisplay.push(
                    <Badge variant="secondary">
                      Print Location: {printLocationName}
                    </Badge>
                  );
                }
                const sizeName = getVariantName("sizeId", item.sizeId);
                if (sizeName) {
                  variantsToDisplay.push(
                    <Badge variant="secondary">Size: {sizeName}</Badge>
                  );
                }

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
          )}

          <div className="flex items-center justify-between mt-2">
            {productDTO?.priceSale &&
            productDTO.priceSale < productDTO.price ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-red-600">
                  {formatCurrencyUSD(productDTO.priceSale)}
                </span>
                <span className="text-gray-500 line-through">
                  {formatCurrencyUSD(productDTO.price || 0)}
                </span>
              </div>
            ) : (
              <div className="font-bold text-lg">
                {formatCurrencyUSD(productDTO?.price || 0)}
              </div>
            )}
            {productDTO.discount?.discount_percent > 0 && (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white hover:bg-red-600"
              >
                {/* Công thức tính phần trăm giảm giá: (Giá gốc - Giá khuyến mãi) / Giá gốc * 100 */}
                -{productDTO.discount?.discount_percent}%
              </Badge>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-2">
            {/* Component chọn số lượng sử dụng Select */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              {!isCompactMode && updateQuantity ? ( // Ẩn điều khiển số lượng trong chế độ compact
                <Select
                  value={String(item.quantity)}
                  onValueChange={(value) =>
                    updateQuantity(item.id, Number(value))
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Số lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Tạo các lựa chọn số lượng từ 1 đến tối đa 10 hoặc số lượng tồn kho */}
                    {[...Array(999)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {item.quantity}
                </span>
              )}
            </div>
            <div className="font-bold">
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

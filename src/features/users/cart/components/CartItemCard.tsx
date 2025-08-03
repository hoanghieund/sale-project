import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cart } from "@/types";
import { getColorValue } from "@/utils/colors";
import { formatCurrencyUSD } from "@/utils/formatters";
import { useVariantProduct } from "@/utils/productUtils";
import { Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  item: Cart;
  removeFromCart?: (itemId: number) => void;
  updateQuantity?: (itemId: number, newQuantity: number) => void;
}

/**
 * @component CartItemCard
 * @description Hiển thị thông tin chi tiết của một sản phẩm trong giỏ hàng.
 * @param {CartItemCardProps} props - Props cho component CartItemCard.
 * @param {CartItemType} props.item - Đối tượng sản phẩm trong giỏ hàng.
 * @param {function} props.removeFromCart - Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng.
 * @param {function} props.updateQuantity - Hàm xử lý khi cập nhật số lượng sản phẩm.
 */
const CartItemCard = ({
  item,
  removeFromCart,
  updateQuantity,
}: CartItemCardProps) => {
  const { productDTO } = item;
  const variantProduct = useVariantProduct(productDTO);
  return (
    <Card key={item.id} className="p-6">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0">
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
            {removeFromCart && (
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

          {/* Product Variant Details */}
          <div className="text-sm text-muted-foreground mb-2 flex flex-wrap items-center gap-2">
            {/* Hàm trợ giúp để tìm tên thuộc tính biến thể */}
            {(() => {
              const getVariantName = (slug: string, id: number | undefined) => {
                if (!id) return null;
                const variantType = variantProduct.find(v => v.slug === slug);
                if (!variantType) return null;
                const value = variantType.values.find(val => val.id === id);
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
              {updateQuantity ? (
                <Select
                  value={String(item.quantity)}
                  onValueChange={value =>
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
              {formatCurrencyUSD(item.totalPrice || 0)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;

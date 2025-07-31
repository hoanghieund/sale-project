import ColorCircle from "@/components/common/ColorCircle";
import QuantitySelector from "@/components/common/QuantitySelector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { getColorValue } from "@/utils/colors";
import { formatCurrencyUSD } from "@/utils/formatters";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

/**
 * Tìm SKU phù hợp với tổ hợp các giá trị biến thể đã chọn
 * @param product Sản phẩm hiện tại
 * @param selectedValues Các giá trị biến thể đã chọn theo variantId
 * @returns SKU phù hợp hoặc undefined nếu không tìm thấy
 */
const findMatchingSku = (
  product: Product,
  selectedValues: Record<number, number>
) => {
  if (!product.productSkusDTOList || product.productSkusDTOList.length === 0) {
    return undefined;
  }

  // Lấy tất cả các giá trị biến thể đã chọn
  const selectedValueIds = Object.values(selectedValues);

  // Tìm SKU phù hợp với tất cả các giá trị biến thể đã chọn
  return product.productSkusDTOList.find(sku => {
    // Lấy tất cả các ID giá trị biến thể của SKU hiện tại, loại bỏ các giá trị null/undefined
    const skuVariantValueIds = [
      sku.variantValueId1,
      sku.variantValueId2,
    ].filter(Boolean);

    // SKU phù hợp nếu tất cả các giá trị biến thể đã chọn đều có trong SKU
    return selectedValueIds.every(valueId =>
      skuVariantValueIds.includes(valueId)
    );
  });
};

/**
 * @interface ProductInfoProps
 * @description Định nghĩa các props cho component ProductInfo.
 * @property {Product} product - Đối tượng sản phẩm.
 * @property {Shop} shop - Đối tượng cửa hàng.
 * @property {Record<number, number>} selectedVariantValues - Giá trị biến thể đã chọn.
 * @property {(values: Record<number, number>) => void} setSelectedVariantValues - Callback cập nhật giá trị biến thể đã chọn.
 * @property {number | null} selectedSku - ID của SKU đã chọn.
 * @property {(skuId: number | null) => void} setSelectedSku - Callback cập nhật SKU đã chọn.
 */
interface ProductInfoProps {
  product: Product;
}

/**
 * ProductInfo - Component hiển thị thông tin chi tiết sản phẩm
 * @param {ProductInfoProps} props - Các props của component.
 */
const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  // Lưu trữ các giá trị biến thể đã chọn theo variantId
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    Record<number, number>
  >({});
  // Lưu trữ SKU được chọn dựa trên tổ hợp các biến thể
  const [selectedSku, setSelectedSku] = useState<number | null>(null);

  useEffect(() => {
    // Khởi tạo giá trị mặc định cho các biến thể
    if (
      product.variantsDTOList &&
      product.variantsDTOList.length > 0 &&
      product.productSkusDTOList &&
      product.productSkusDTOList.length > 0
    ) {
      const initialVariantValues: Record<number, number> = {};

      // Chọn giá trị đầu tiên cho mỗi loại biến thể
      product.variantsDTOList.forEach(variant => {
        if (
          variant.variantValueDTOList &&
          variant.variantValueDTOList.length > 0
        ) {
          initialVariantValues[variant.id] = variant.variantValueDTOList[0].id;
        }
      });

      setSelectedVariantValues(initialVariantValues);

      // Tìm SKU phù hợp với các giá trị biến thể đã chọn
      const matchingSku = findMatchingSku(product, initialVariantValues);
      if (matchingSku) {
        setSelectedSku(matchingSku.id);
      }
    }
  }, [product]);

  return (
    <div className="space-y-4">
      {/* Product Info */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="space-y-1">
          <div className="flex items-center">
            <span className="text-star text-base">★</span>
            <span className="text-base font-medium ml-1">
              {product.star || 0}
            </span>
            <span className="text-foreground/50 text-sm ml-1">
              ({product.totalReview || 0} đánh giá)
            </span>
            <span className="text-foreground text-sm ml-2">
              Đã bán {product.totalProductSold || 0}
            </span>
            {product.isNew && (
              <>
                <span className="bg-new/10 text-new px-2 py-1 rounded-md text-sm font-medium ml-2">
                  Mới
                </span>
              </>
            )}
            {product.isFlashSale && (
              <>
                <span className="bg-trending/10 text-trending px-2 py-1 rounded-md text-sm font-medium ml-2">
                  Flash Sale
                </span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {selectedSku && product.productSkusDTOList ? (
            <>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrencyUSD(
                  (product.productSkusDTOList.find(sku => sku.id === selectedSku)
                    ?.price || 0) -
                  ((product.productSkusDTOList.find(sku => sku.id === selectedSku)
                    ?.price || 0) * (product.discount?.discount_percent || 0)) / 100
                )}
              </div>
              {product.discount && (
                <div className="space-x-1">
                  <span className="text-lg text-foreground/50 line-through">
                    {formatCurrencyUSD(Math.round(
                      product.productSkusDTOList.find(
                        sku => sku.id === selectedSku
                      )?.price || 0
                    ))}
                  </span>
                  <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md text-sm font-medium">
                    -{product.discount.discount_percent}%
                  </span>
                </div>
              )}
            </>
          ) : (
            <span className="text-2xl font-bold text-destructive">
              {formatCurrencyUSD(product.amount || 0)}
            </span>
          )}
        </div>
      </div>

      {/* Variants Selection */}
      {product.variantsDTOList && product.variantsDTOList.length > 0 && (
        <div className="space-y-2">
          {product.variantsDTOList.map(variant => (
            <div key={variant.id} className="space-y-2">
              <h3 className="font-medium text-gray-700">{variant.name}:</h3>
              <div className="flex flex-wrap gap-2">
                {variant.variantValueDTOList?.map(value => (
                  <div key={value.id}> {/* Bao bọc bằng div hoặc Fragment */}
                    {variant.name.toLowerCase() === "color" ? (
                      <ColorCircle
                        color={getColorValue(value.name)}
                        isSelected={selectedVariantValues[variant.id] === value.id}
                        onClick={() => {
                          const newSelectedValues = {
                            ...selectedVariantValues,
                            [variant.id]: value.id,
                          };
                          setSelectedVariantValues(newSelectedValues);

                          const matchingSku = findMatchingSku(product, newSelectedValues);
                          if (matchingSku) {
                            setSelectedSku(matchingSku.id);
                          }
                          setQuantity(1);
                        }}
                      />
                    ) : (
                      <Button
                        variant={
                          selectedVariantValues[variant.id] === value.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const newSelectedValues = {
                            ...selectedVariantValues,
                            [variant.id]: value.id,
                          };
                          setSelectedVariantValues(newSelectedValues);

                          const matchingSku = findMatchingSku(product, newSelectedValues);
                          if (matchingSku) {
                            setSelectedSku(matchingSku.id);
                          }
                          setQuantity(1);
                        }}
                      >
                        {value.name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sản phẩm có sẵn */}
      <div className="text-sm text-foreground">
        <span className="font-medium">Sản phẩm có sẵn:</span>{" "}
        {selectedSku && product.productSkusDTOList
          ? product.productSkusDTOList.find(sku => sku.id === selectedSku)
              ?.quantity
          : product.amount}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-1 mb-1">
        <span className="text-gray-700">Số lượng:</span>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={
            selectedSku && product.productSkusDTOList
              ? product.productSkusDTOList.find(sku => sku.id === selectedSku)
                  ?.quantity || 1
              : product.amount
              ? 10
              : 0
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-1 mb-1">
        <Button
          onClick={() => {
            // Thêm sản phẩm vào giỏ hàng với biến thể đã chọn
            console.log("Thêm vào giỏ:", {
              productId: product.id,
              skuId: selectedSku,
              quantity: quantity,
              selectedVariants: selectedVariantValues,
            });
          }}
          className="flex-1"
          disabled={
            selectedSku && product.productSkusDTOList
              ? (product.productSkusDTOList.find(sku => sku.id === selectedSku)
                  ?.quantity || 0) === 0
              : product.amount === 0
          }
        >
          Thêm vào giỏ
        </Button>
        <Button
          onClick={() => {
            // Mua ngay sản phẩm với biến thể đã chọn
            console.log("Mua ngay:", {
              productId: product.id,
              skuId: selectedSku,
              quantity: quantity,
              selectedVariants: selectedVariantValues,
            });
          }}
          className="flex-1"
          variant="outline"
          disabled={
            selectedSku && product.productSkusDTOList
              ? (product.productSkusDTOList.find(sku => sku.id === selectedSku)
                  ?.quantity || 0) === 0
              : product.amount === 0
          }
        >
          Mua ngay
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {product.content ? (
          <AccordionItem value="product-description">
            <AccordionTrigger className="text-base font-semibold">
              Mô tả sản phẩm
            </AccordionTrigger>
            <AccordionContent className="prose max-w-none">
              {product.content ? (
                <div className="text-foreground leading-normal">
                  {parse(product.content)}
                </div>
              ) : (
                <p className="text-foreground/50 italic">
                  Không có mô tả chi tiết cho sản phẩm này.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ) : null}

        <AccordionItem value="product-specifications">
          <AccordionTrigger className="text-base font-semibold">
            Thông số sản phẩm
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {product.brand && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Thương hiệu:
                </span>
                <span className="text-foreground">{product.brand}</span>
              </div>
            )}
            {product.material && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Chất liệu:
                </span>
                <span className="text-foreground">{product.material}</span>
              </div>
            )}
            {product.origin && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Xuất xứ:
                </span>
                <span className="text-foreground">{product.origin}</span>
              </div>
            )}
            {product.style && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Phong cách:
                </span>
                <span className="text-foreground">{product.style}</span>
              </div>
            )}
            {(product.height || product.width || product.length) && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Kích thước:
                </span>
                <span className="text-foreground">
                  {[
                    product.height && `Cao ${product.height}cm`,
                    product.width && `Rộng ${product.width}cm`,
                    product.length && `Dài ${product.length}cm`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {product.weight && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Trọng lượng:
                </span>
                <span className="text-foreground">{product.weight}g</span>
              </div>
            )}
            {product.isNew !== undefined && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Sản phẩm mới:
                </span>
                <span className="text-foreground">
                  {product.isNew ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isFlashSale !== undefined && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Flash sale:
                </span>
                <span className="text-foreground">
                  {product.isFlashSale ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isTrending !== undefined && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Xu hướng:
                </span>
                <span className="text-foreground">
                  {product.isTrending ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.timeCreate && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Ngày đăng:
                </span>
                <span className="text-foreground">{product.timeCreate}</span>
              </div>
            )}
            {product.categoryDto && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Danh mục:
                </span>
                <span className="text-foreground">
                  {product.categoryDto.parent?.name &&
                    `${product.categoryDto.parent.name} > `}
                  {product.categoryDto.name}
                </span>
              </div>
            )}
            {product.totalReview !== undefined && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Số đánh giá:
                </span>
                <span className="text-foreground">{product.totalReview}</span>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfo;

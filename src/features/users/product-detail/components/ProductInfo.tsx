import ColorCircle from "@/components/common/ColorCircle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { Product } from "@/types";
import { getColorValue } from "@/utils/colors";
import { formatCurrencyUSD } from "@/utils/formatters";
import { useVariantProduct } from "@/utils/productUtils";
import { Star } from "lucide-react";
import { useState } from "react";

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
  className?: string;
}

/**
 * ProductInfo - Component hiển thị thông tin chi tiết sản phẩm
 * @param {ProductInfoProps} props - Các props của component.
 */

/**

 * @function changeDescription



 * @description Chuyển đổi chuỗi mô tả sản phẩm, thay thế dấu chấm phẩy bằng thẻ <br /> để hiển thị ngắt dòng.

 * @param {string} description - Chuỗi mô tả sản phẩm.

 * @returns {JSX.Element[]} Một mảng các phần tử JSX, mỗi phần tử là một đoạn văn bản hoặc thẻ <br />.
 */
const changeDescription = (description: string) => {
  const items = description.split(";").filter(item => item.trim() !== ""); // Tách chuỗi và lọc bỏ các mục rỗng
  if (items.length === 0) {
    return null; // Không có nội dung để hiển thị
  }
  return (
    <ul className="list-disc pl-5 space-y-1">
      {" "}
      {/* Thêm class Tailwind CSS cho list-style và padding */}
      {items.map((item, index) => (
        <li key={index}>{item.trim()}</li> // Mỗi mục là một thẻ <li>
      ))}
    </ul>
  );
};

const ProductInfo = ({ product, className }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  // Sử dụng custom hook để truy cập Cart context
  const { addToCart, isLoading: isCartLoading } = useCart();

  // Lưu trữ các giá trị biến thể đã chọn theo variantId
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    Record<string, number>
  >({});

  const variantProduct = useVariantProduct(product);

  // Xác định xem nút có bị vô hiệu hóa không
  const isAddToCartDisabled =
    product.optionDTOs && product.optionDTOs.length > 0
      ? Object.keys(selectedVariantValues).length !== variantProduct.length
      : false;

  /**
   * @function handleAddToCart
   * @description Xử lý logic khi người dùng nhấn nút "Thêm vào giỏ".
   * Kiểm tra xem tất cả các biến thể đã được chọn chưa trước khi thêm vào giỏ.
   * Sử dụng addToCart từ CartProvider để thêm sản phẩm vào giỏ hàng.
   */
  const handleAddToCart = async () => {
    // Nếu nút bị vô hiệu hóa (tức là chưa chọn đủ biến thể), hiển thị lỗi và dừng.
    if (isAddToCartDisabled) {
      toast({
        title: "Lỗi",
        description:
          "Vui lòng chọn đầy đủ các biến thể sản phẩm trước khi thêm vào giỏ hàng.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Sử dụng addToCart từ CartProvider thay vì gọi API trực tiếp
      await addToCart(
        product,
        selectedVariantValues.fitId,
        selectedVariantValues.printLocationId,
        selectedVariantValues.colorId,
        selectedVariantValues.sizeId,
        quantity
      );

      // Reset form sau khi thêm thành công
      setQuantity(1);
      setSelectedVariantValues({});
    } catch (error) {
      // Error handling đã được xử lý trong CartProvider
      console.log("🚀 ~ handleAddToCart ~ error:", error);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Product Info */}
      <div className="space-y-2">
        {/* Tiêu đề: ưu tiên kích thước nhỏ hơn trên mobile, tăng ở md+ */}
        <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

        <div className="space-y-1">
          {/* Khối rating/bán/badges: cho phép wrap và tạo khoảng cách đều khi xuống dòng */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex items-center gap-0.5">
              <span className="text-base font-medium">{product.star || 0}</span>
              <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
            </div>
            <span className="text-foreground/50 text-sm">
              ({product.totalReview || 0} đánh giá)
            </span>
            <span className="text-foreground text-sm">
              Đã bán {product.totalProductSold || 0}
            </span>
            {product.isNew && (
              <>
                <span className="bg-new/10 text-new px-2 py-1 rounded-md text-sm font-medium">
                  Mới
                </span>
              </>
            )}
            {product.isFlashSale && (
              <>
                <span className="bg-trending/10 text-trending px-2 py-1 rounded-md text-sm font-medium">
                  Flash Sale
                </span>
              </>
            )}
          </div>
        </div>

        <div className="text-xl md:text-2xl font-bold text-destructive">
          {formatCurrencyUSD(product.priceSale || 0)}
        </div>
        <div className="space-x-1">
          {/* Giá gạch: responsive theo md */}
          <span className="text-base md:text-lg text-foreground/50 line-through">
            {formatCurrencyUSD(product.price || 0)}
          </span>
          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md text-sm font-medium">
            -{product.discount.discount_percent}%
          </span>
        </div>
      </div>

      {/* Variants Selection */}
      {variantProduct && variantProduct.length > 0 && (
        <div className="space-y-2">
          {variantProduct.map(variant => (
            <div key={variant.name} className="space-y-2">
              {/* Tiêu đề nhóm biến thể: nhỏ ở mobile, chuẩn ở md+ */}
              <h3 className="font-medium text-gray-700 text-sm md:text-base">
                {variant.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {variant.values?.map(value => (
                  <div key={value.id}>
                    {" "}
                    {/* Bao bọc bằng div hoặc Fragment */}
                    {variant.name.toLowerCase() === "color" ? (
                      <ColorCircle
                        color={getColorValue(value.name)}
                        isSelected={
                          selectedVariantValues[variant.slug] === value.id
                        }
                        onClick={() => {
                          const newSelectedValues = {
                            ...selectedVariantValues,
                            [variant.slug]: value.id,
                          };
                          setSelectedVariantValues(newSelectedValues);
                          setQuantity(1);
                        }}
                      />
                    ) : (
                      <Button
                        className="px-3"
                        variant={
                          selectedVariantValues[variant.slug] === value.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const newSelectedValues = {
                            ...selectedVariantValues,
                            [variant.slug]: value.id,
                          };
                          setSelectedVariantValues(newSelectedValues);
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

      {/* Quantity */}
      {/* Khối số lượng: tăng khoảng cách ở md để thoáng hơn */}
      <div className="flex items-center gap-2 md:gap-3 mb-1">
        <span className="text-gray-700">Số lượng:</span>
        <Select
          value={String(quantity)}
          onValueChange={value => setQuantity(Number(value))}
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
      </div>

      {/* Actions: stack dọc ở sm, nằm ngang ở md+; khoảng cách lớn hơn */}
      <div className="flex gap-2 sm:flex-col md:flex-row mb-1">
        <Button
          onClick={() => handleAddToCart()}
          className="w-full md:flex-1"
          disabled={isAddToCartDisabled || isCartLoading} // Vô hiệu hóa nút nếu biến thể chưa được chọn đầy đủ
        >
          Thêm vào giỏ
        </Button>
        {/* <Button
          onClick={() => {
            // Mua ngay sản phẩm với biến thể đã chọn
          }}
          className="w-full md:flex-1"
          variant="outline"
        >
          Mua ngay
        </Button> */}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {product.content ? (
          <AccordionItem value="product-description">
            <AccordionTrigger className="text-base font-semibold">
              Mô tả sản phẩm
            </AccordionTrigger>
            {/* Tối ưu typography cho nội dung mô tả, giữ max-width none để full width */}
            <AccordionContent className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
              {product.content ? (
                <div className="text-foreground leading-normal text-sm">
                  {changeDescription(product.content)}
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
          {/* Grid 1 cột trên mobile, 2 cột từ md; khoảng cách giảm nhẹ để khớp design-system */}
          <AccordionContent className="grid grid-cols-1 gap-x-6 gap-y-3">
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
              <div className="flex">
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

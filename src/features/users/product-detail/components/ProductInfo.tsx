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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { Product } from "@/types";
import { getColorValue } from "@/utils/colors";
import { formatCurrencyUSD } from "@/utils/formatters";
import { useVariantProduct } from "@/utils/productUtils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * @interface ProductInfoProps
 * @description Defines the props for the ProductInfo component.
 * @property {Product} product - The product object.
 * @property {Shop} shop - The shop object.
 * @property {Record<number, number>} selectedVariantValues - Selected variant values.
 * @property {(values: Record<number, number>) => void} setSelectedVariantValues - Callback to update selected variant values.
 * @property {number | null} selectedSku - ID of the selected SKU.
 * @property {(skuId: number | null) => void} setSelectedSku - Callback to update the selected SKU.
 */
/**
 * @interface ProductInfoProps
 * @description Props cho component ProductInfo, bổ sung callback để đồng bộ UI ảnh theo màu.
 * @property {(colorId: number | null) => void} [onColorHover] - Gọi khi hover vào/ra một màu (null khi rời).
 * @property {(colorId: number | null) => void} [onColorActiveChange] - Gọi khi chọn (click) một màu active.
 */
interface ProductInfoProps {
  product: Product;
  className?: string;
  onColorHover?: (colorId: number | null) => void;
  onColorActiveChange?: (colorId: number | null) => void;
}

/**
 * ProductInfo - Component to display product details.
 * @param {ProductInfoProps} props - The component's props.
 */

/**
 * @function changeDescription
 * @description Converts the product description string, replacing semicolons with <br /> tags for line breaks.
 * @param {string} description - The product description string.
 * @returns {JSX.Element[]} An array of JSX elements, each being a text segment or a <br /> tag.
 */
const changeDescription = (description: string) => {
  const items = description.split(";").filter(item => item.trim() !== ""); // Split string and filter out empty items
  if (items.length === 0) {
    return null; // No content to display
  }
  return (
    <ul className="list-disc pl-5 space-y-1">
      {/* Add Tailwind CSS classes for list-style and padding */}
      {items.map((item, index) => (
        <li key={index}>{item.trim()}</li> // Each item is an <li> tag
      ))}
    </ul>
  );
};

// Hiển thị thông tin sản phẩm và phát sự kiện hover/chọn màu để parent cập nhật carousel
const ProductInfo = ({
  product,
  className,
  onColorHover,
  onColorActiveChange,
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  // Use custom hook to access Cart context
  const { addToCart, isLoading: isCartLoading } = useCart();

  // Store selected variant values by variantId
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    Record<string, number>
  >({});

  const variantProduct = useVariantProduct(product);

  // Tự động chọn biến thể màu đầu tiên khi component được tải
  useEffect(() => {
    if (variantProduct && variantProduct.length > 0) {
      // Tìm biến thể màu
      const colorVariant = variantProduct.find(
        variant => variant.name.toLowerCase() === "color"
      );

      // Nếu có biến thể màu và có ít nhất một giá trị
      if (
        colorVariant &&
        colorVariant.values &&
        colorVariant.values.length > 0
      ) {
        const firstColorValue = colorVariant.values[0];

        // Cập nhật selectedVariantValues với màu đầu tiên
        setSelectedVariantValues(prev => ({
          ...prev,
          [colorVariant.keyOption]: firstColorValue.id,
        }));

        // Thông báo cho parent component về màu được chọn
        onColorActiveChange?.(firstColorValue.id);
      }
    }
  }, [variantProduct]);

  // Determine if the button is disabled
  const isAddToCartDisabled =
    product?.optionDTOs && product?.optionDTOs.length > 0
      ? Object.keys(selectedVariantValues).length !== variantProduct?.length
      : false;

  /**
   * @function handleAddToCart
   * @description Handles the logic when the user clicks the "Add to Cart" button.
   * Checks if all variants have been selected before adding to cart.
   * Uses addToCart from CartProvider to add the product to the cart.
   */
  const handleAddToCart = async () => {
    // If the button is disabled (meaning not all variants are selected), display an error and stop.
    if (isAddToCartDisabled) {
      toast({
        title: "Error",
        description:
          "Please select all product variants before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use addToCart from CartProvider instead of calling API directly
      await addToCart(product, selectedVariantValues, quantity);

      // Reset form after successful addition
      setQuantity(1);
      setSelectedVariantValues({});
    } catch (error) {
      // Error handling is already managed in CartProvider
      console.log("🚀 ~ handleAddToCart ~ error:", error);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Product Info */}
      <div className="space-y-2">
        {/* Title: smaller size on mobile, increases on md+ */}
        <h1 className="text-2xl md:text-3xl font-bold">{product?.title}</h1>

        <div className="space-y-1">
          {/* Rating/sales/badges block: allows wrapping and even spacing when wrapping */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex items-center gap-0.5">
              <span className="text-base font-medium">
                {product?.star || 0}
              </span>
              <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
            </div>
            <span className="text-foreground/50 text-sm">
              ({product?.totalReview || 0} reviews)
            </span>
            <span className="text-foreground text-sm">
              Sold {product?.totalProductSold || 0}
            </span>
            {product?.isNew && (
              <>
                <span className="bg-new/10 text-new px-2 py-1 rounded-md text-sm font-medium">
                  New
                </span>
              </>
            )}
          </div>
        </div>

        <div className="text-xl md:text-2xl font-bold text-destructive">
          {formatCurrencyUSD(product?.priceSale || 0)}
        </div>
        <div className="space-x-1">
          {/* Strikethrough price: responsive to md */}
          <span className="text-base md:text-lg text-foreground/50 line-through">
            {formatCurrencyUSD(product?.price || 0)}
          </span>
          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md text-sm font-medium">
            -{product?.discount?.discount_percent}%
          </span>
        </div>
      </div>

      {/* Variants Selection */}
      {variantProduct && variantProduct?.length > 0 && (
        <div className="space-y-2">
          {variantProduct?.map(variant => (
            <div key={variant.name} className="space-y-2">
              {/* Variant group title: small on mobile, standard on md+ */}
              <h3 className="font-medium text-gray-700 text-sm md:text-base">
                {variant.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {variant.values?.map(value => (
                  <div
                    key={value.id}
                    // Phát sự kiện hover để ProductDetailPage lọc ảnh theo màu đang hover
                    onMouseEnter={() => {
                      if (variant.name.toLowerCase() === "color") {
                        onColorHover?.(value.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (variant.name.toLowerCase() === "color") {
                        onColorHover?.(null); // trở về màu active khi rời hover
                      }
                    }}
                  >
                    {/* Wrap with div or Fragment */}
                    {variant.name.toLowerCase() === "color" ? (
                      // Kiểm tra nếu value.name là URL ảnh (bắt đầu bằng http hoặc https)
                      value.name
                        .trim()
                        .match(
                          /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i
                        ) ? (
                        <div className="flex flex-col items-center gap-2">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "w-20 h-20 cursor-pointer overflow-hidden border",
                                    selectedVariantValues[variant.keyOption] ===
                                      value.id
                                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                      : "border-gray-300"
                                  )}
                                  onClick={() => {
                                    const newSelectedValues = {
                                      ...selectedVariantValues,
                                      [variant.keyOption]: value.id,
                                    };
                                    setSelectedVariantValues(newSelectedValues);
                                    setQuantity(1);
                                    // Khi chọn màu, thông báo parent để hiển thị ảnh theo màu active
                                    onColorActiveChange?.(value.id);
                                  }}
                                >
                                  <img
                                    src={value.name}
                                    alt={`Color variant ${value.id}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{value.nameVariant}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ) : (
                        <ColorCircle
                          color={getColorValue(value.name)}
                          isSelected={
                            selectedVariantValues[variant.keyOption] ===
                            value.id
                          }
                          onClick={() => {
                            const newSelectedValues = {
                              ...selectedVariantValues,
                              [variant.keyOption]: value.id,
                            };
                            setSelectedVariantValues(newSelectedValues);
                            setQuantity(1);
                            // Khi chọn màu, thông báo parent để hiển thị ảnh theo màu active
                            onColorActiveChange?.(value.id);
                          }}
                        />
                      )
                    ) : (
                      <Button
                        className="px-3"
                        variant={
                          selectedVariantValues[variant.keyOption] === value.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const newSelectedValues = {
                            ...selectedVariantValues,
                            [variant.keyOption]: value.id,
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
      {/* Quantity block: increases spacing on md for better layout */}
      <div className="flex items-center gap-2 md:gap-3 mb-1">
        <span className="text-gray-700">Quantity:</span>
        <Select
          value={String(quantity)}
          onValueChange={value => setQuantity(Number(value))}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            {/* Create quantity options from 1 to max 10 or stock quantity */}
            {[...Array(999)].map((_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions: stack vertically on sm, horizontal on md+; larger spacing */}
      <div className="flex gap-2 sm:flex-col md:flex-row mb-1">
        <Button
          onClick={() => handleAddToCart()}
          className="w-full md:flex-1"
          disabled={isAddToCartDisabled || isCartLoading} // Disable button if variants are not fully selected
        >
          Add to Cart
        </Button>
        {/* <Button
          onClick={() => {
            // Buy product immediately with selected variant
          }}
          className="w-full md:flex-1"
          variant="outline"
        >
          Buy Now
        </Button> */}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["product-description", "product-specifications"]}
        className="w-full"
      >
        <AccordionItem value="product-description">
          <AccordionTrigger className="text-base font-semibold">
            Product Description
          </AccordionTrigger>
          {/* Optimize typography for description content, keep max-width none for full width */}
          <AccordionContent className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
            {product?.description ? (
              <div className="text-foreground leading-normal text-sm">
                {changeDescription(product?.description)}
              </div>
            ) : (
              <p className="text-foreground/50 italic">
                No detailed description available for this product.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-specifications">
          <AccordionTrigger className="text-base font-semibold">
            Product Specifications
          </AccordionTrigger>
          {/* 1-column grid on mobile, 2-columns from md; slightly reduced spacing to match design-system */}
          <AccordionContent className="grid grid-cols-1 gap-x-6 gap-y-3">
            {product?.brand && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Brand:
                </span>
                <span className="text-foreground">{product?.brand}</span>
              </div>
            )}
            {product?.material && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Material:
                </span>
                <span className="text-foreground">{product?.material}</span>
              </div>
            )}
            {product?.origin && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Origin:
                </span>
                <span className="text-foreground">{product?.origin}</span>
              </div>
            )}
            {product?.style && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Style:
                </span>
                <span className="text-foreground">{product?.style}</span>
              </div>
            )}
            {(product?.height || product?.width || product?.length) && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Dimensions:
                </span>
                <span className="text-foreground">
                  {[
                    product?.height && `Height ${product?.height}cm`,
                    product?.width && `Width ${product?.width}cm`,
                    product?.length && `Length ${product?.length}cm`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {product?.weight && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Weight:
                </span>
                <span className="text-foreground">{product?.weight}g</span>
              </div>
            )}
            {product?.isNew !== undefined && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  New Product:
                </span>
                <span className="text-foreground">
                  {product?.isNew ? "Yes" : "No"}
                </span>
              </div>
            )}
            {product?.timeCreate && (
              <div className="flex border-b border-border py-2">
                <span className="font-medium text-foreground w-1/3">
                  Date Posted:
                </span>
                <span className="text-foreground">{product?.timeCreate}</span>
              </div>
            )}
            {product?.totalReview !== undefined && (
              <div className="flex">
                <span className="font-medium text-foreground w-1/3">
                  Number of Reviews:
                </span>
                <span className="text-foreground">{product?.totalReview}</span>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfo;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { productService } from "@/services/productService";
import { Product } from "@/types";
import { capitalizeFirstLetter, formatCurrencyUSD } from "@/utils/formatters";
import { Eye, Heart, Star, Store, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * ProductCard - Component hiển thị card sản phẩm với đầy đủ tính năng
 * Được sử dụng trong trang danh mục, trang chi tiết danh mục con và các trang khác
 */
interface ProductCardSimpleProps {
  product: Product;
  className?: string;
  /**
   * Hiển thị nút thêm vào danh sách yêu thích
   * @default true
   */
  showWishlist?: boolean;
  /**
   * Hiển thị nút xóa khỏi danh sách yêu thích
   * Thường được sử dụng trong trang Wishlist
   * @default false
   */
  showRemoveFromWishlist?: boolean;
  /**
   * Hiển thị nút xem nhanh
   * @default true
   */
  showQuickView?: boolean;
  /**
   * Hiển thị theo kiểu đơn giản (không có các nút tương tác)
   * @default true
   */
  simple?: boolean;
}

const ProductCardSimple = ({
  product,
  className = "",
  showWishlist = true,
  showRemoveFromWishlist = false,
  showQuickView = true,
  simple = true,
}: ProductCardSimpleProps) => {
  const { isAuthenticated } = useUser(); // Use useUser hook
  const { toast } = useToast(); // Use useToast hook for notifications
  const [likedProduct, setLikedProduct] = useState(product.isLike || false);
  const isMobile = useIsMobile(); // Kiểm tra nếu đang ở thiết bị di động

  const handleLikeProduct = async (productId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Not signed in",
        description: "Please sign in to add this product to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLikedProduct(prev => !prev);
      if (likedProduct) {
        await productService.unlikeProduct(productId);
        toast({
          title: "Success",
          description: "Removed product from wishlist.",
        });
      } else {
        await productService.likeProduct(productId);
        toast({
          title: "Success",
          description: "Added product to wishlist.",
        });
      }
    } catch (error) {
      setLikedProduct(prev => !prev);
      toast({
        title: "Error",
        description:
          "An error occurred while updating your wishlist. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className={cn("w-full", className)} data-testid="product-card">
      <Card className="group overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col hover:shadow-lg">
        <div className="bg-muted aspect-square flex items-center justify-center relative overflow-hidden">
          <Link
            to={`/product/${product.slug}`}
            className="block h-full w-full"
            target={isMobile ? "_self" : "_blank"}
            rel="noopener noreferrer"
          >
            <img
              src={product.imagesDTOList?.[0]?.path || ""}
              alt={product.title}
              className="w-full h-full object-cover bg-white"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                New
              </Badge>
            )}
          </div>

          {/* Action Buttons - Chỉ hiển thị khi không ở chế độ đơn giản */}
          {!simple && (
            <>
              {/* Wishlist, Remove from Wishlist, and Quick View buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {showWishlist && !showRemoveFromWishlist && isAuthenticated && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-white hover:text-red-500 transition-colors"
                    onClick={() => handleLikeProduct(product.id)}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        product.isLike ? "fill-red-500 text-red-500" : ""
                      )}
                    />
                  </Button>
                )}
                {showRemoveFromWishlist && isAuthenticated && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-white hover:text-red-500 transition-colors"
                    onClick={() => handleLikeProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                {showQuickView && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-white hover:text-primary transition-colors"
                    asChild
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      target={isMobile ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Quick Add Button */}
              {/* {showQuickAdd && isHovered && (
                <div className="absolute bottom-3 left-3 right-3 transition-all duration-300">
                  <Button
                    className="w-full bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm shadow-sm"
                    size="sm"
                    onClick={handleQuickAdd}
                    disabled={isAddingToCart || !product.amount}
                    data-testid="add-to-cart-button"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isAddingToCart
                      ? "Đang thêm..."
                      : product.amount > 0
                      ? "Thêm vào giỏ"
                      : "Hết hàng"}
                  </Button>
                </div>
              )} */}
            </>
          )}
        </div>
        <CardHeader className="px-4 pt-2 pb-0">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 flex flex-col"
            target={isMobile ? "_self" : "_blank"}
            rel="noopener noreferrer"
          >
            {/* Shop name */}
            <div className="flex items-center gap-1 mb-1">
              <Store className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {product.shop?.name || "Shop"}
              </span>
            </div>

            {/* Product name */}
            <h3
              className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors"
              data-testid="product-name"
            >
              {capitalizeFirstLetter(product.title)}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
          </Link>
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 flex flex-col"
            target={isMobile ? "_self" : "_blank"}
            rel="noopener noreferrer"
          >
            {/* Rating */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(product.star || 0)
                        ? "fill-star text-star"
                        : "fill-gray-400 text-gray-400"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                Sold {product.totalProductSold || 0}
              </span>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="px-4 pb-2 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-destructive">
                {/* Hiển thị giá thấp nhất từ ProductSku */}
                {formatCurrencyUSD(product.priceSale || 0)}
              </span>
              {product.discount?.discount_percent && (
                <span className="flex items-center">
                  <span className="text-xs ml-2 bg-destructive/10 text-destructive px-1 py-0.5 rounded">
                    -{product.discount.discount_percent}%
                  </span>
                </span>
              )}
            </div>
            {/* <div className="text-xs text-muted-foreground">
              {product.amount > 0 ? "Còn hàng" : "Hết hàng"}
            </div> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardSimple;

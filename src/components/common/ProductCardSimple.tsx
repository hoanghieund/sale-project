import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { Eye, Heart, ShoppingCart, Star, Store, Trash2 } from "lucide-react";
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
   * Hiển thị nút thêm vào giỏ hàng nhanh
   * @default true
   */
  showQuickAdd?: boolean;
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
   * @default false
   */
  simple?: boolean;
}

const ProductCardSimple = ({
  product,
  className = "",
  showQuickAdd = true,
  showWishlist = true,
  showRemoveFromWishlist = false,
  showQuickView = true,
  simple = false,
}: ProductCardSimpleProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // isInWishlist đã được cập nhật để hỗ trợ cả kiểu string và number
  const isWishlisted = isInWishlist?.(product.id) || false;

  // Xử lý thêm vào danh sách yêu thích
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted && removeFromWishlist) {
      // removeFromWishlist đã được cập nhật để hỗ trợ cả kiểu string và number
      removeFromWishlist(product.id);
    } else if (addToWishlist) {
      addToWishlist(product);
    }
  };

  // Xử lý thêm vào giỏ hàng nhanh
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Không còn trường sizes và colors trong Product mới
    // Sử dụng ProductSku và VariantValue thay thế
    if (!addToCart) return;

    setIsAddingToCart(true);

    // Thêm sản phẩm vào giỏ hàng với các thông tin cơ bản
    // Truyền null cho size và color vì giờ đây chúng được quản lý qua ProductSku
    addToCart(product, null, null, 1);

    setTimeout(() => setIsAddingToCart(false), 1000);
  };
  return (
    <div
      className={cn("w-full", className)}
      data-testid="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col hover:shadow-xl">
        <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.imagesDTOList[0].path}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount?.percent && (
              <Badge
                variant="destructive"
                className="px-2 py-1 text-xs font-medium"
              >
                -{product.discount?.percent}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                Mới
              </Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium">
                Xu hướng
              </Badge>
            )}
            {product.isFlashSale && (
              <Badge className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium">
                Flash Sale
              </Badge>
            )}
          </div>

          {/* Action Buttons - Chỉ hiển thị khi không ở chế độ đơn giản */}
          {!simple && (
            <>
              {/* Wishlist, Remove from Wishlist, and Quick View buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {showWishlist && !showRemoveFromWishlist && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-white hover:text-red-500 transition-colors"
                    onClick={handleWishlistToggle}
                    data-testid="wishlist-button"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      )}
                    />
                  </Button>
                )}
                {showRemoveFromWishlist && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-white hover:text-red-500 transition-colors"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (removeFromWishlist) {
                        removeFromWishlist(product.id);
                      }
                    }}
                    data-testid="remove-wishlist-button"
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
                    <Link to={`/product/${product.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Quick Add Button */}
              {showQuickAdd && isHovered && (
                <div className="absolute bottom-3 left-3 right-3 transition-all duration-300">
                  {product.status ? (
                    <Button
                      className="w-full bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm shadow-sm"
                      size="sm"
                      onClick={handleQuickAdd}
                      disabled={isAddingToCart}
                      data-testid="add-to-cart-button"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-muted text-muted-foreground backdrop-blur-sm"
                      size="sm"
                      disabled
                    >
                      {product.status === false ? "Hết hàng" : "Xem chi tiết"}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <CardHeader className="p-4 pb-0">
          <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
            {/* Shop name */}
            <div className="flex items-center gap-1 mb-1">
              <Store className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {product.shop?.name || "Shop"}
              </span>
            </div>

            {/* Product name */}
            <h3
              className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors"
              data-testid="product-name"
            >
              {product.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {product.content}
            </p>
          </Link>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {simple ? (
                  <>
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.star || 0}
                    </span>
                  </>
                ) : (
                  [...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(product.star || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-none text-muted"
                      )}
                    />
                  ))
                )}
                {/* Số lượng đánh giá sẽ được tính từ bảng Feedback */}
                <span className="text-xs text-muted-foreground ml-1">(0)</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                Đã bán {product.totalProductSold || 0}
              </span>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {/* Product không còn trường price, cần sử dụng ProductSku */}
                {product.discount ? (
                  <span className="flex items-center">
                    <span>Liên hệ</span>
                    <span className="text-xs ml-2 bg-destructive/10 text-destructive px-1 py-0.5 rounded">
                      -{product.discount.percent}%
                    </span>
                  </span>
                ) : (
                  "Liên hệ"
                )}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {product.status ? "Còn hàng" : "Hết hàng"}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardSimple;

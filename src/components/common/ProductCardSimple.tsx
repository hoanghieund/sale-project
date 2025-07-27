import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Eye, Heart, ShoppingCart, Star, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ProductCard - Component hiển thị card sản phẩm với đầy đủ tính năng
 * Được sử dụng trong trang danh mục, trang chi tiết danh mục con và các trang khác
 */
interface ProductCardProps {
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

const ProductCard = ({
  product,
  className = "",
  showQuickAdd = true,
  showWishlist = true,
  showQuickView = true,
  simple = false
}: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist?.(product.id) || false;

  // Xử lý thêm vào danh sách yêu thích
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted && removeFromWishlist) {
      removeFromWishlist(product.id);
    } else if (addToWishlist) {
      addToWishlist(product);
    }
  };

  // Xử lý thêm vào giỏ hàng nhanh
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Kiểm tra xem sizes và colors có tồn tại không trước khi truy cập length
    if (!product.sizes?.length || !product.colors?.length || !addToCart) return;

    setIsAddingToCart(true);

    // Add with first available size and color
    const firstAvailableSize = product.sizes.find(size => size.available);
    const firstAvailableColor = product.colors.find(color => color.available);

    if (firstAvailableSize && firstAvailableColor) {
      addToCart(product, firstAvailableSize, firstAvailableColor, 1);
    }

    setTimeout(() => setIsAddingToCart(false), 1000);
  };
  return (
    <div 
      className={`w-full ${className}`}
      data-testid="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
      >
        <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden">
          <Link to={`/product/${product.slug}`} className="block h-full">
            {product.images?.[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-4xl text-gray-400">📦</span>
            )}
          </Link>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge
                variant="destructive"
                className="px-2 py-1 text-xs font-medium"
              >
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-emerald-500 text-white px-2 py-1 text-xs font-medium">
                Nổi bật
              </Badge>
            )}
            {product.sale && (
              <Badge
                variant="destructive"
                className="px-2 py-1 text-xs font-medium"
              >
                Sale
              </Badge>
            )}
            {product.inStock === false && (
              <Badge
                variant="outline"
                className="bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-medium"
              >
                Hết hàng
              </Badge>
            )}
          </div>
          
          {/* Action Buttons - Chỉ hiển thị khi không ở chế độ đơn giản */}
          {!simple && (
            <>
              <div
                className={cn(
                  "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-5"
                )}
              >
                {showWishlist && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm",
                      isWishlisted && "text-red-500"
                    )}
                    onClick={handleWishlistToggle}
                    data-testid="wishlist-button"
                  >
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                  </Button>
                )}
                
                {showQuickView && (
                  <Link to={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Quick Add Button */}
              {showQuickAdd && (
                <div
                  className={cn(
                    "absolute bottom-3 left-3 right-3 transition-all duration-300",
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  )}
                >
                  {product.inStock !== false &&
                  product.sizes?.length > 0 &&
                  product.colors?.length > 0 ? (
                    <Button
                      className="w-full bg-emerald-600/90 hover:bg-emerald-600 text-white backdrop-blur-sm shadow-sm"
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
                      className="w-full bg-gray-200/90 text-gray-500 backdrop-blur-sm"
                      size="sm"
                      disabled
                    >
                      {product.inStock === false ? "Hết hàng" : "Xem chi tiết"}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <Link to={`/product/${product.slug}`} className="p-4 flex-1 flex flex-col">
          {/* Shop name */}
          <div className="flex items-center gap-1 mb-1">
            <Store className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">
              {product.shop?.name || product.shopId || "Shop"}
            </span>
          </div>
          
          {/* Product name */}
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors" data-testid="product-name">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {simple ? (
                <>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </>
              ) : (
                [...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-none text-gray-300"
                    )}
                  />
                ))
              )}
              <span className="text-xs text-gray-400 ml-1">({product.reviewCount || 0})</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">Đã bán {product.sold || 0}</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-600">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Còn {product.stock || 0}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

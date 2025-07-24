import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Heart, ShoppingCart, Star, Store } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // Xác định các badge cần hiển thị
  const badges = [];
  if (product.featured) badges.push("Featured");
  if (product.sale) badges.push("Sale");
  if (!product.inStock) badges.push("Out of Stock");

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.sizes.length === 0 || product.colors.length === 0) return;

    setIsAddingToCart(true);

    // Add with first available size and color
    const firstAvailableSize = product.sizes.find(size => size.available);
    const firstAvailableColor = product.colors.find(color => color.available);

    if (firstAvailableSize && firstAvailableColor) {
      addToCart(product, firstAvailableSize, firstAvailableColor, 1);
    }

    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  // Đã di chuyển định nghĩa badges lên trên

  return (
    <div className="w-full" data-testid="product-card">
      <Card
        className="group relative overflow-hidden transition-all duration-300  h-full flex flex-col hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Overlay */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Link to={`/product/${product.id}`} className="block h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.sale && (
              <Badge
                variant="destructive"
                className="px-2 py-1 text-xs font-medium"
              >
                Sale
              </Badge>
            )}
            {product.featured && (
              <Badge className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <Badge
                variant="outline"
                className="bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-medium"
              >
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-5"
            )}
          >
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm",
                isWishlisted ? "text-red-500" : "text-foreground/70"
              )}
              onClick={handleWishlistToggle}
            >
              <Heart
                className={cn("h-4 w-4", isWishlisted ? "fill-current" : "")}
              />
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Quick Add Button */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            )}
          >
            {product.inStock &&
            product.sizes.length > 0 &&
            product.colors.length > 0 ? (
              <Button
                className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm shadow-sm"
                size="sm"
                onClick={handleQuickAdd}
                disabled={isAddingToCart}
                data-testid="add-to-cart-button"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
              <Button
                className="w-full bg-muted/90 backdrop-blur-sm"
                size="sm"
                disabled
              >
                {!product.inStock ? "Out of Stock" : "View Options"}
              </Button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
          <CardHeader className="p-4 pb-2 space-y-1">
            <div className="flex items-center gap-1 mb-1">
              <Store className="h-3.5 w-3.5 text-muted-foreground" />
              <CardDescription className="text-xs">
                <span className="hover:text-accent transition-colors">
                  {product.vendor.name}
                </span>
              </CardDescription>
            </div>
            <CardTitle
              className="line-clamp-2 text-base font-medium group-hover:text-primary transition-colors"
              data-testid="product-name"
            >
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 py-2 mt-auto">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-none text-muted-foreground/40"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
              {product.originalPrice && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs font-medium text-green-600 bg-green-50 border-green-100"
                >
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default ProductCard;

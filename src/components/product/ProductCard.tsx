import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
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

  const isWishlisted = isInWishlist(product.id);

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

  const badges = [];
  if (product.featured) badges.push("Featured");
  if (product.sale) badges.push("Sale");
  if (!product.inStock) badges.push("Out of Stock");

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="group relative bg-card rounded-lg overflow-hidden shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant={badge === "Sale" ? "destructive" : "secondary"} 
                  className={badge === "Featured" ? "bg-accent text-accent-foreground" : ""}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="secondary" 
              className={`h-8 w-8 ${isWishlisted ? 'text-red-500' : ''}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Quick Add Button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.inStock && product.sizes.length > 0 && product.colors.length > 0 ? (
              <Button 
                className="w-full" 
                size="sm"
                onClick={handleQuickAdd}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Quick Add"}
              </Button>
            ) : (
              <Button className="w-full" size="sm" disabled>
                {!product.inStock ? "Out of Stock" : "Select Options"}
              </Button>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-card-foreground mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Vendor: <span className="text-accent">{product.vendor.name}</span>
          </p>
          
          {/* Pricing */}
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-lg text-card-foreground">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { useState } from "react";
import { Heart, Share2, Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product, Size, Color } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors.find(color => color.available) || null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const badges = [];
  if (product.featured) badges.push("Featured");
  if (product.sale) badges.push("Sale");
  if (!product.inStock) badges.push("Out of Stock");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex gap-2">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant={badge === "Sale" ? "destructive" : "secondary"}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Title and Vendor */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">
              by <span className="text-primary font-medium">{product.vendor.name}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <Badge variant="destructive">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <RadioGroup
                value={selectedColor?.id}
                onValueChange={(value) => {
                  const color = product.colors.find(c => c.id === value);
                  setSelectedColor(color || null);
                }}
              >
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <div key={color.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={color.id}
                        id={color.id}
                        disabled={!color.available}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={color.id}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          selectedColor?.id === color.id 
                            ? 'border-primary' 
                            : 'border-gray-300'
                        } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <RadioGroup
                value={selectedSize?.id}
                onValueChange={(value) => {
                  const size = product.sizes.find(s => s.id === value);
                  setSelectedSize(size || null);
                }}
              >
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <div key={size.id}>
                      <RadioGroupItem
                        value={size.id}
                        id={size.id}
                        disabled={!size.available}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={size.id}
                        className={`block text-center py-2 px-3 border rounded-md cursor-pointer transition-colors ${
                          selectedSize?.id === size.id
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {size.value}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || !selectedSize || !selectedColor}
              className="w-full"
              size="lg"
            >
              {!product.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className="flex-1"
              >
                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span>{product.category}</span>
            </div>
            {product.subcategory && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subcategory:</span>
                <span>{product.subcategory}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

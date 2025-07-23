import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    const item = wishlist.find(w => w.product.id === productId);
    if (!item) return;

    const firstAvailableSize = item.product.sizes.find(size => size.available);
    const firstAvailableColor = item.product.colors.find(color => color.available);

    if (firstAvailableSize && firstAvailableColor) {
      setAddingToCart(productId);
      addToCart(item.product, firstAvailableSize, firstAvailableColor, 1);
      setTimeout(() => setAddingToCart(null), 1000);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist and shop them later.
            </p>
            <Link to="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => removeFromWishlist(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {item.product.vendor.name}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {item.product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="font-bold">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(item.product.id)}
                      disabled={addingToCart === item.product.id || !item.product.inStock}
                    >
                      {addingToCart === item.product.id ? (
                        "Adding..."
                      ) : !item.product.inStock ? (
                        "Out of Stock"
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-4">
          {wishlist.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary">
                          {item.product.name}
                        </h3>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => removeFromWishlist(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      by {item.product.vendor.name}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {item.product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-bold text-sm">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleAddToCart(item.product.id)}
                      disabled={addingToCart === item.product.id || !item.product.inStock}
                    >
                      {addingToCart === item.product.id ? (
                        "Adding..."
                      ) : !item.product.inStock ? (
                        "Out of Stock"
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

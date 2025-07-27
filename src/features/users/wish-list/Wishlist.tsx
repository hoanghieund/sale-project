import { Button } from "@/components/ui/button";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { VariantValue } from "@/types";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const handleAddToCart = async (productId: number) => {
    const item = wishlist.find(w => w.product.id === productId);
    if (!item) return;

    // Sử dụng các thuộc tính có sẵn trong Product
    // Giả định rằng chúng ta có đủ thông tin để thêm vào giỏ hàng
    setAddingToCart(productId);
    // Sử dụng null cho size và color theo cập nhật mới của CartContext
    addToCart(item.product, null, null, 1);
    setTimeout(() => setAddingToCart(null), 1000);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(item => (
          <div key={item.id}>
            {/* ProductCardSimple component với các props phù hợp */}
            <ProductCardSimple 
              product={item.product}
              showWishlist={false} // Không hiển thị nút wishlist vì đã trong wishlist
              showRemoveFromWishlist={true} // Hiển thị nút xóa khỏi wishlist
              showQuickView={true}
              showQuickAdd={true}
              simple={false}
            />
          </div>
        ))}
      </div>

      {/* Mobile View - Sử dụng ProductCardSimple với simple=true */}
      <div className="md:hidden space-y-6">
        {wishlist.map(item => (
          <div key={item.id}>
            <ProductCardSimple 
              product={item.product}
              showWishlist={false}
              showRemoveFromWishlist={true} // Hiển thị nút xóa khỏi wishlist
              showQuickView={true}
              showQuickAdd={true}
              simple={true} // Hiển thị dạng đơn giản hơn cho mobile
            />
          </div>
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
    </div>
  );
};

export default Wishlist;

import ProductCard from "@/components/common/ProductCardSimple";
import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

/**
 * Component displays a list of recently viewed products
 * Uses RecentlyViewedContext to fetch and manage the list
 */
const RecentlyViewedProducts = () => {
  const { recentlyViewed } = useRecentlyViewed();

  // Nếu không có sản phẩm nào đã xem gần đây, không hiển thị component
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recently Viewed Products</h2>
          <Link
            to="/products"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {recentlyViewed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;

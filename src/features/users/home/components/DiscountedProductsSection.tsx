import ProductCard from "@/components/common/ProductCardSimple";
import { Product } from "@/types";

/**
 * DiscountedProductsSection Component
 * Displays a list of discounted products on the homepage.
 * @param {Product[]} products - Array of discounted product objects.
 */
interface DiscountedProductsSectionProps {
  products: Product[];
}

const DiscountedProductsSection = ({
  products,
}: DiscountedProductsSectionProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Title and description for the discounted products section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discounted Products</h2>
          <p className="text-gray-600">
            Discover attractive discounted products
          </p>
        </div>

        {/* Display list of discounted products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showWishlist={true}
              showQuickView={false}
              simple={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedProductsSection;

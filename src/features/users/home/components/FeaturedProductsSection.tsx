import ProductCard from "@/components/common/ProductCardSimple";
import { Product } from "@/types";

/**
 * FeaturedProductsSection Component
 * Displays a list of featured products on the homepage.
 * @param {Product[]} products - Mảng các đối tượng sản phẩm nổi bật.
 */
interface FeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection = ({
  products,
}: FeaturedProductsSectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Featured Products - Shop Now!
          </h2>
          <p className="text-gray-600">
            Discover the most loved and best-selling products at Eulotus.
            Quality guaranteed, attractive offers!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showWishlist={true}
              showQuickView={false}
              // simple={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;

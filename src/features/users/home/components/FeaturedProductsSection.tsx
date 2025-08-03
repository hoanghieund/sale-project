import ProductCard from "@/components/common/ProductCardSimple";
import { Product } from "@/types";

/**
 * FeaturedProductsSection Component
 * Hiển thị danh sách các sản phẩm nổi bật trên trang chủ.
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
          <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
          <p className="text-gray-600">
            Khám phá các sản phẩm được yêu thích nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

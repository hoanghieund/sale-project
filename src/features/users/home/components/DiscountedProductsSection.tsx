import ProductCard from "@/components/common/ProductCardSimple";
import { Product } from "@/types";

/**
 * DiscountedProductsSection Component
 * Hiển thị danh sách các sản phẩm giảm giá trên trang chủ.
 * @param {Product[]} products - Mảng các đối tượng sản phẩm giảm giá.
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
        {/* Tiêu đề và mô tả cho phần sản phẩm giảm giá */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sản phẩm giảm giá</h2>
          <p className="text-gray-600">
            Khám phá các sản phẩm giảm giá hấp dẫn
          </p>
        </div>

        {/* Hiển thị danh sách sản phẩm giảm giá */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showQuickAdd={true}
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

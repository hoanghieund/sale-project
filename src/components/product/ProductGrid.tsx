import { FEATURED_PRODUCTS } from "../../data/mockData";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Dynamic Air</h2>
          <p className="text-muted-foreground">
            Discover our latest collection of premium athletic footwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {FEATURED_PRODUCTS.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

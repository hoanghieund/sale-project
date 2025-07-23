import { useParams, Navigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetail from "../components/product/ProductDetail";
import ProductGrid from "../components/product/ProductGrid";
import { MOCK_PRODUCTS } from "../data/mockData";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  // Get related products (same category, different product)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductDetail product={product} />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id}>
                    {/* We'll use a simplified ProductCard here */}
                    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={relatedProduct.images[0]} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                        <div className="flex items-center gap-2">
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${relatedProduct.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="font-bold">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

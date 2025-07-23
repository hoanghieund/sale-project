import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetail from "../components/product/ProductDetail";
import ProductTabs from "../components/product/ProductTabs";
import SimilarProducts from "../components/product/SimilarProducts";
import RecentlyViewedProducts from "../components/product/RecentlyViewedProducts";
import { MOCK_PRODUCTS } from "../data/mockData";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  // Thêm sản phẩm vào danh sách đã xem gần đây
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Product Detail Section */}
        <ProductDetail product={product} />
        
        {/* Product Tabs: Description, Specifications, Reviews, Shipping */}
        <ProductTabs product={product} />
        
        {/* Similar Products - "You might also like" */}
        <SimilarProducts currentProduct={product} />
        
        {/* Recently Viewed Products */}
        <RecentlyViewedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

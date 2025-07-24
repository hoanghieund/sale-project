import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ProductDetail from "../components/product/ProductDetail";
import ProductTabs from "../components/product/ProductTabs";
import RecentlyViewedProducts from "../components/product/RecentlyViewedProducts";
import SimilarProducts from "../components/product/SimilarProducts";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { MOCK_PRODUCTS } from "../data/mockData";

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
    <>
      {/* Product Detail Section */}
      <ProductDetail product={product} />

      {/* Product Tabs: Description, Specifications, Reviews, Shipping */}
      <ProductTabs product={product} />

      {/* Similar Products - "You might also like" */}
      <SimilarProducts currentProduct={product} />

      {/* Recently Viewed Products */}
      <RecentlyViewedProducts />
    </>
  );
};

export default ProductDetailPage;

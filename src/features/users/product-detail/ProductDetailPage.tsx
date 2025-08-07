import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // General spinner for loading state
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageCarousel from "./components/ProductImageCarousel";
import ProductInfo from "./components/ProductInfo"; // Import the new component
import ProductReviews from "./components/ProductReviews";
import ShopInfoCard from "./components/ShopInfoCard"; // Import the new ShopInfoCard component
import { productDetailService } from "./services/productDetailService";

/**
 * ProductDetailPage - C2C Marketplace Product Detail Page
 * Displays product information, seller shop, and related products
 */

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const productData: Product =
          await productDetailService.getProductBySlug(slug);
        setProduct(productData);

        // Fetch shop information from API data
        if (productData.shop) {
          setShop(productData.shop);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product || !shop) {
    return <EmptyStateDisplay />;
  }

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbNav
        items={[
          { label: "Home", to: "/" },
          {
            label: product.collectionResponse?.categoryTree?.name,
            to: `/category/${product.collectionResponse?.categoryTree?.id}`,
          },
          // Render category child breadcrumb only if it exists
          ...(product.collectionResponse?.categoryTree?.child
            ? [
                {
                  label: product.collectionResponse.categoryTree.child.name,
                  to: `/category/${product.collectionResponse.categoryTree.child.id}`,
                },
              ]
            : []),
          { label: product.title },
        ]}
      />

      <div className="container mx-auto px-4 pb-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <ProductImageCarousel
            className="px-8 col-span-1"
            images={product.imagesDTOList || []}
            productTitle={product.title}
          />
          <ProductInfo className="col-span-1" product={product} />
        </div>

        {/* Shop Info */}
        <ShopInfoCard shop={shop} />

        {/* Product Reviews */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
          <ProductReviews
            averageRating={product.star || 0}
            totalReviews={product.totalReview || 0}
            productId={product.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

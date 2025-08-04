import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Spinner chung cho trạng thái loading
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageCarousel from "./components/ProductImageCarousel";
import ProductInfo from "./components/ProductInfo"; // Import the new component
import ProductReviews from "./components/ProductReviews";
import ShopInfoCard from "./components/ShopInfoCard"; // Import the new ShopInfoCard component
import { productDetailService } from "./services/productDetailService";

/**
 * ProductDetailPage - Trang chi tiết sản phẩm C2C Marketplace
 * Hiển thị thông tin sản phẩm, shop bán hàng và các sản phẩm liên quan
 */

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const productData: Product = await productDetailService.getProductById(
          id
        );
        setProduct(productData);

        // Lấy thông tin shop từ dữ liệu API
        if (productData.shop) {
          setShop(productData.shop);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
          { label: "Trang chủ", to: "/" },
          {
            label: product.categoryDto?.parent?.name,
            to: `/category/${product.categoryDto?.parent?.id}`,
          },
          {
            label: product.categoryDto?.name,
            to: `/category/${product.categoryDto?.parent?.id}/${product.categoryDto?.id}`,
          },
          { label: product.title },
        ]}
      />

      <div className="container mx-auto px-4 pb-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          <ProductImageCarousel
            className="px-8 col-span-2"
            images={product.imagesDTOList || []}
            productTitle={product.title}
          />
          <ProductInfo className="col-span-2" product={product} />
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

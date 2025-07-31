import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Không tìm thấy ID sản phẩm.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
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
        setError("Không thể tải thông tin sản phẩm hoặc cửa hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product || !shop) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${product.categoryDto?.parent?.id}`}>
                  {product.categoryDto?.parent?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={`/category/${product.categoryDto?.parent?.id}/${product.categoryDto?.id}`}
                  >
                    {product.categoryDto?.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 pb-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageCarousel
            className="px-8"
            images={product.imagesDTOList || []}
            productTitle={product.title}
          />
          <ProductInfo product={product} />
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

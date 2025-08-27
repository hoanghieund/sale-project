import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { Product, Shop } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageCarousel from "./components/ProductImageCarousel";
import ProductInfo from "./components/ProductInfo"; // Import the new component
import ProductReviews from "./components/ProductReviews";
import RelatedProducts from "./components/RelatedProducts"; // Import RelatedProducts component
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
  // Lưu trạng thái hover và màu đang active để điều khiển ảnh hiển thị ở carousel
  // hoveredColorId: ưu tiên hiển thị ảnh theo màu đang hover
  // activeColorId: hiển thị ảnh theo màu đang chọn khi không hover
  const [hoveredColorId, setHoveredColorId] = useState<number | null>(null);
  const [activeColorId, setActiveColorId] = useState<number | null>(null);

  const fetchData = async () => {
    if (!slug) {
      return;
    }

    try {
      const productData: Product = await productDetailService.getProductBySlug(
        slug
      );
      setProduct(productData);

      // Fetch shop information from API data
      if (productData.shop) {
        setShop({
          ...productData.shop,
        });
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };
  useEffect(() => {
    fetchData();
    // Reset trạng thái tương tác khi đổi sản phẩm
    setHoveredColorId(null);
    setActiveColorId(null);
  }, [slug]);

  // Hiển thị tất cả ảnh, chỉ điều khiển "focus" ảnh theo optionId khi hover/active màu.
  // Lưu ý: Carousel sẽ tự setSelectedImage về ảnh đầu tiên có optionId khớp focusOptionId.
  const imagesToShow = useMemo(() => {
    const list = product?.imagesDTOList || [];
    const filterBy = hoveredColorId ?? activeColorId;
    if (filterBy != null) {
      const filtered = list.filter(img => img?.optionId === filterBy);
      return filtered.length > 0 ? filtered : list; // fallback nếu không có ảnh theo màu
    }
    return list;
  }, [product?.imagesDTOList, hoveredColorId, activeColorId]);

  if (!product) {
    return null; // Trả về null để tránh thay đổi thứ tự Hook giữa các lần render
  }

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbNav
        items={[
          { label: "Home", to: "/" },
          {
            label: product.collectionResponse?.categoryTree?.name,
            to: `/category/${product.collectionResponse?.categoryTree?.slug}`,
          },
          // Render category child breadcrumb only if it exists
          ...(product.collectionResponse?.categoryTree?.child
            ? [
                {
                  label: product.collectionResponse.categoryTree.child.name,
                  to: `/category/${product.collectionResponse.categoryTree?.slug}/${product.collectionResponse.categoryTree.child.slug}`,
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
            // Hiển thị tất cả ảnh, để carousel tự focus theo focusOptionId
            images={imagesToShow}
            // Khi hover/active màu, focus vào ảnh đầu tiên có optionId khớp
            focusOptionId={hoveredColorId ?? activeColorId ?? null}
            productTitle={product.title}
          />
          <ProductInfo
            className="col-span-1"
            product={product}
            // Khi hover vào/ra màu: cập nhật hoveredColorId để ưu tiên hiển thị ảnh theo màu đang hover
            onColorHover={colorId => setHoveredColorId(colorId)}
            // Khi click chọn màu: cập nhật activeColorId để hiển thị ảnh theo màu đang chọn khi không hover
            onColorActiveChange={colorId => setActiveColorId(colorId)}
          />
        </div>

        {/* Shop Info */}
        <ShopInfoCard shop={shop} />

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <RelatedProducts products={product.relatedProducts} />
        )}

        {/* Product Reviews */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
          <ProductReviews
            averageRating={product.star || 0}
            totalReviews={product.totalReview || 0}
            productId={product.id}
            reloadProduct={fetchData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

/**
 * ProductDetailPage - Trang chi tiết sản phẩm C2C Marketplace
 * Hiển thị thông tin sản phẩm, shop bán hàng và các sản phẩm liên quan
 */
const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // TODO: Fetch product data from API based on slug
    // Tạm thời sử dụng mock data
    const mockProduct: Product = {
      id: "1",
      name: "Áo sơ mi nam cao cấp",
      slug: slug || "",
      description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại, phù hợp cho công sở và dự tiệc. Chất liệu thoáng mát, form dáng chuẩn, dễ dàng phối đồ.",
      price: 299000,
      originalPrice: 399000,
      images: [
        "/images/product-1-1.jpg",
        "/images/product-1-2.jpg",
        "/images/product-1-3.jpg",
        "/images/product-1-4.jpg"
      ],
      categoryId: "1",
      subcategoryId: "1",
      shopId: "shop1",
      stock: 50,
      sold: 120,
      rating: 4.5,
      reviewCount: 45,
      inStock: true,
      isActive: true,
      isFeatured: true,
      tags: ["áo sơ mi", "nam", "công sở", "cao cấp"],
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z")
    };

    const mockShop: Shop = {
      id: "shop1",
      name: "Fashion Store VN",
      slug: "fashion-store-vn",
      description: "Chuyên cung cấp thời trang nam nữ cao cấp, chính hãng với giá tốt nhất thị trường.",
      logo: "/images/shop-logo-1.jpg",
      banner: "/images/shop-banner-1.jpg",
      ownerId: "user1",
      address: {
        street: "123 Nguyễn Huệ",
        city: "TP. Hồ Chí Minh",
        state: "Hồ Chí Minh",
        zipCode: "700000",
        country: "Việt Nam",
        phone: "0901234567"
      },
      verified: true,
      rating: 4.8,
      reviewCount: 1250,
      totalProducts: 450,
      totalSales: 15000,
      isActive: true,
      socialLinks: {
        facebook: "https://facebook.com/fashionstore",
        instagram: "https://instagram.com/fashionstore"
      },
      policies: {
        returnPolicy: "Đổi trả trong 7 ngày",
        shippingPolicy: "Miễn phí ship đơn > 500k",
        privacyPolicy: "Bảo mật thông tin khách hàng"
      },
      joinedAt: new Date("2023-01-01T00:00:00Z")
    };

    setProduct(mockProduct);
    setShop(mockShop);
    setLoading(false);

    // Thêm sản phẩm vào danh sách đã xem gần đây
    if (mockProduct) {
      addToRecentlyViewed(mockProduct);
    }
  }, [slug, addToRecentlyViewed]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Added ${quantity} items to cart`);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log(`Buy now ${quantity} items`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!product || !shop) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-emerald-600 hover:text-emerald-700">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/category/thoi-trang`} className="text-emerald-600 hover:text-emerald-700">Thời trang</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/subcategory/ao-nam`} className="text-emerald-600 hover:text-emerald-700">Áo nam</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
              {product.images[selectedImage] ? (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">📦</span>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-emerald-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {image ? (
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl text-gray-400">📦</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-lg font-medium ml-1">{product.rating}</span>
                  <span className="text-gray-500 ml-1">({product.reviewCount} đánh giá)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Đã bán {product.sold}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  {product.price.toLocaleString()}đ
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Shop Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin cửa hàng</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {shop.logo ? (
                    <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">🏪</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Link 
                    to={`/shop/${shop.slug}`}
                    className="text-lg font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    {shop.name}
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>★ {shop.rating} ({shop.reviewCount} đánh giá)</span>
                    <span>•</span>
                    <span>{shop.totalProducts} sản phẩm</span>
                    {shop.verified && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600">✓ Đã xác minh</span>
                      </>
                    )}
                  </div>
                </div>
                <Link 
                  to={`/shop/${shop.slug}`}
                  className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Xem shop
                </Link>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Số lượng:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500">Còn {product.stock} sản phẩm</span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                >
                  Thêm vào giỏ hàng
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Mua ngay
                </button>
              </div>
            </div>

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Mô tả sản phẩm</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Shop Policies */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6">Chính sách cửa hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2">Chính sách đổi trả</h3>
              <p className="text-gray-600 text-sm">{shop.policies.returnPolicy}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold mb-2">Chính sách vận chuyển</h3>
              <p className="text-gray-600 text-sm">{shop.policies.shippingPolicy}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-2">Chính sách bảo mật</h3>
              <p className="text-gray-600 text-sm">{shop.policies.privacyPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

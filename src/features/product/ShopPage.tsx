import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * ShopPage - Trang hiển thị thông tin cửa hàng
 * Hiển thị thông tin cửa hàng và danh sách sản phẩm của cửa hàng
 */
const ShopPage = () => {
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // TODO: Fetch shop data from API
    // Tạm thời sử dụng mock data
    const mockShop: Shop = {
      id: "shop1",
      name: "Fashion Store VN",
      slug: shopSlug || "",
      description: "Chuyên cung cấp thời trang nam nữ cao cấp, chính hãng với giá tốt nhất thị trường. Cam kết chất lượng và dịch vụ tận tâm cho khách hàng.",
      logo: "/images/shop-logo-1.jpg",
      banner: "/images/shop-banner-1.jpg",
      ownerId: "user1",
      verified: true,
      rating: 4.8,
      reviewCount: 1250,
      totalProducts: 450,
      totalSales: 15000,
      joinedAt: new Date("2023-01-15"),
      isActive: true,
      address: {
        street: "123 Nguyễn Huệ",
        city: "TP. Hồ Chí Minh",
        state: "Hồ Chí Minh",
        zipCode: "700000",
        country: "Việt Nam",
        phone: "0901234567"
      },
      socialLinks: {
        facebook: "https://facebook.com/fashionstore",
        instagram: "https://instagram.com/fashionstore"
      },
      policies: {
        returnPolicy: "Đổi trả trong 7 ngày",
        shippingPolicy: "Miễn phí ship đơn > 500k",
        privacyPolicy: "Bảo mật thông tin khách hàng"
      }
    };

    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Áo sơ mi nam cao cấp",
        slug: "ao-so-mi-nam-cao-cap",
        description: "Áo sơ mi nam chất liệu cotton cao cấp",
        price: 299000,
        originalPrice: 399000,
        images: ["/images/product-1-1.jpg", "/images/product-1-2.jpg"],
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
        tags: ["áo sơ mi", "nam", "công sở"],
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z")
      },
      {
        id: "2",
        name: "Quần jean nữ skinny",
        slug: "quan-jean-nu-skinny",
        description: "Quần jean nữ form skinny thời trang",
        price: 450000,
        originalPrice: 550000,
        images: ["/images/product-2-1.jpg", "/images/product-2-2.jpg"],
        categoryId: "1",
        subcategoryId: "2",
        shopId: "shop1",
        stock: 30,
        sold: 85,
        rating: 4.7,
        reviewCount: 32,
        inStock: true,
        isActive: true,
        isFeatured: false,
        tags: ["quần jean", "nữ", "skinny"],
        createdAt: new Date("2024-01-02T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z")
      },
      {
        id: "3",
        name: "Áo khoác bomber unisex",
        slug: "ao-khoac-bomber-unisex",
        description: "Áo khoác bomber phong cách street style",
        price: 650000,
        images: ["/images/product-3-1.jpg"],
        categoryId: "1",
        subcategoryId: "3",
        shopId: "shop1",
        stock: 25,
        sold: 60,
        rating: 4.3,
        reviewCount: 28,
        inStock: true,
        isActive: true,
        isFeatured: true,
        tags: ["áo khoác", "bomber", "unisex"],
        createdAt: new Date("2024-01-03T00:00:00Z"),
        updatedAt: new Date("2024-01-03T00:00:00Z")
      },
      {
        id: "4",
        name: "Váy midi hoa nhí",
        slug: "vay-midi-hoa-nhi",
        description: "Váy midi họa tiết hoa nhí dễ thương",
        price: 320000,
        originalPrice: 420000,
        images: ["/images/product-4-1.jpg"],
        categoryId: "1",
        subcategoryId: "4",
        shopId: "shop1",
        stock: 40,
        sold: 95,
        rating: 4.6,
        reviewCount: 38,
        inStock: true,
        isActive: true,
        isFeatured: false,
        tags: ["váy", "midi", "hoa nhí"],
        createdAt: new Date("2024-01-04T00:00:00Z"),
        updatedAt: new Date("2024-01-04T00:00:00Z")
      },
      {
        id: "5",
        name: "Giày sneaker nam",
        slug: "giay-sneaker-nam",
        description: "Giày sneaker nam thể thao năng động",
        price: 890000,
        originalPrice: 1200000,
        images: ["/images/product-5-1.jpg"],
        categoryId: "2",
        subcategoryId: "5",
        shopId: "shop1",
        stock: 20,
        sold: 75,
        rating: 4.4,
        reviewCount: 42,
        inStock: true,
        isActive: true,
        isFeatured: true,
        tags: ["giày", "sneaker", "nam"],
        createdAt: new Date("2024-01-05T00:00:00Z"),
        updatedAt: new Date("2024-01-05T00:00:00Z")
      },
      {
        id: "6",
        name: "Túi xách nữ da thật",
        slug: "tui-xach-nu-da-that",
        description: "Túi xách nữ chất liệu da thật cao cấp",
        price: 1250000,
        images: ["/images/product-6-1.jpg"],
        categoryId: "3",
        subcategoryId: "6",
        shopId: "shop1",
        stock: 15,
        sold: 45,
        rating: 4.8,
        reviewCount: 25,
        inStock: true,
        isActive: true,
        isFeatured: true,
        tags: ["túi xách", "nữ", "da thật"],
        createdAt: new Date("2024-01-06T00:00:00Z"),
        updatedAt: new Date("2024-01-06T00:00:00Z")
      }
    ];

    setShop(mockShop);
    setProducts(mockProducts);
    setLoading(false);
  }, [shopSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy cửa hàng</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-emerald-600 hover:text-emerald-700">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Cửa hàng</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{shop.name}</span>
          </nav>
        </div>
      </div>

      {/* Shop Banner */}
      <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-600">
        {shop.banner ? (
          <img 
            src={shop.banner} 
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold">Banner cửa hàng</h2>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Shop Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Shop Logo */}
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
              {shop.logo ? (
                <img 
                  src={shop.logo} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">🏪</span>
                </div>
              )}
            </div>

            {/* Shop Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                {shop.verified && (
                  <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                    ✓ Đã xác minh
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{shop.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Đánh giá:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{shop.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá trung bình</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{shop.reviewCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Lượt đánh giá</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{shop.totalProducts}</div>
                  <div className="text-sm text-gray-600">Sản phẩm</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{shop.totalSales.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Đã bán</div>
                </div>
              </div>

              {/* Follow Button */}
              <div className="mt-6">
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  + Theo dõi cửa hàng
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Theo dõi
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Chat ngay
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sản phẩm ({shop.totalProducts})
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "info"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Thông tin
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "reviews"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đánh giá ({shop.reviewCount})
            </button>
          </div>

          <div className="p-8">
            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                {/* Sort Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Sản phẩm của cửa hàng</h2>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="popular">Bán chạy nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-gray-200 overflow-hidden relative">
                        {product.images[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl text-gray-400">📦</span>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isFeatured && (
                            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              Nổi bật
                            </span>
                          )}
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-emerald-600">
                            {product.price.toLocaleString()}đ
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()}đ
                            </span>
                          )}
                        </div>
                        
                        {/* Rating and Sales */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span>{product.rating}</span>
                            <span>({product.reviewCount})</span>
                          </div>
                          <span>Đã bán {product.sold}</span>
                        </div>
                        
                        {/* Stock Status */}
                        <div className="mt-2">
                          {product.inStock ? (
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              Còn hàng
                            </span>
                          ) : (
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              Hết hàng
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Show more products button */}
                {products.length > 0 && (
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
                      Xem thêm sản phẩm
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Địa chỉ</h3>
                  <p className="text-gray-600">
                    {shop.address.street}, {shop.address.city}, {shop.address.state}, {shop.address.country}
                  </p>
                  {shop.address.phone && (
                    <p className="text-gray-600">Điện thoại: {shop.address.phone}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Liên kết mạng xã hội</h3>
                  <div className="flex gap-4">
                    {shop.socialLinks.website && (
                      <a href={shop.socialLinks.website} className="text-blue-600 hover:underline">
                        Website
                      </a>
                    )}
                    {shop.socialLinks.facebook && (
                      <a href={shop.socialLinks.facebook} className="text-blue-600 hover:underline">
                        Facebook
                      </a>
                    )}
                    {shop.socialLinks.instagram && (
                      <a href={shop.socialLinks.instagram} className="text-blue-600 hover:underline">
                        Instagram
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Chính sách</h3>
                  <div className="space-y-2">
                    <p><strong>Đổi trả:</strong> {shop.policies.returnPolicy}</p>
                    <p><strong>Vận chuyển:</strong> {shop.policies.shippingPolicy}</p>
                    <p><strong>Bảo mật:</strong> {shop.policies.privacyPolicy}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="text-center text-gray-500 py-8">
                  Đánh giá của khách hàng sẽ được hiển thị ở đây
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRandomImage } from "../../../utils/random-image";

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
    const mockShop: Shop & {
      slug: string;
      description: string;
      logo: string;
      banner: string;
      verified: boolean;
      rating: number;
      reviewCount: number;
      totalProducts: number;
      totalSales: number;
      joinedAt: Date;
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
      };
      socialLinks: {
        website?: string;
        facebook?: string;
        instagram?: string;
      };
      policies: {
        returnPolicy: string;
        shippingPolicy: string;
        privacyPolicy: string;
      };
    } = {
      id: 1, // Thay đổi từ string sang number theo interface mới
      name: "Fashion Store VN",
      slug: shopSlug || "",
      description:
        "Chuyên cung cấp thời trang nam nữ cao cấp, chính hãng với giá tốt nhất thị trường. Cam kết chất lượng và dịch vụ tận tâm cho khách hàng.",
      logo: getRandomImage(),
      banner: getRandomImage(),
      userId: 1, // Thay đổi từ ownerId sang userId và từ string sang number
      verified: true,
      rating: 4.8,
      reviewCount: 1250,
      totalProducts: 450,
      totalSales: 15000,
      joinedAt: new Date("2023-01-15"),
      status: true, // Thay đổi từ isActive sang status theo interface mới
      address: {
        street: "123 Nguyễn Huệ",
        city: "TP. Hồ Chí Minh",
        state: "Hồ Chí Minh",
        zipCode: "700000",
        country: "Việt Nam",
        phone: "0901234567",
      },
      socialLinks: {
        facebook: "https://facebook.com/fashionstore",
        instagram: "https://instagram.com/fashionstore",
      },
      policies: {
        returnPolicy: "Đổi trả trong 7 ngày",
        shippingPolicy: "Miễn phí ship đơn > 500k",
        privacyPolicy: "Bảo mật thông tin khách hàng",
      },
      // Thêm các trường audit theo interface mới
      createDate: new Date(),
      createBy: "system",
      modifierDate: new Date(),
      modifierBy: "system",
    };

    const mockProducts: Product[] = [
      {
        id: 101,
        name: "Áo thun nam cổ tròn", // Thêm trường name bắt buộc
        images: [getRandomImage()], // Thêm trường images bắt buộc
        title: "Áo thun nam cổ tròn",
        content: "Áo thun nam cổ tròn chất liệu cotton 100%",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.5,
        totalProductSold: 120,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        discount: { id: 1, percent: 10, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 102,
        name: "Quần jean nam slim fit", // Thêm trường name bắt buộc
        images: [getRandomImage()], // Thêm trường images bắt buộc
        title: "Quần jean nam slim fit",
        content: "Quần jean nam slim fit màu xanh đậm",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.8,
        totalProductSold: 85,
        isNew: false,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 2, percent: 15, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 2,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 103,
        name: "Áo sơ mi nữ công sở", // Thêm trường name bắt buộc
        images: [getRandomImage()], // Thêm trường images bắt buộc
        title: "Áo sơ mi nữ công sở",
        content: "Áo sơ mi nữ công sở chất liệu lụa cao cấp",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.6,
        totalProductSold: 95,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 6,
        shopId: 3,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 104,
        name: "Váy liền thân dự tiệc", // Thêm trường name bắt buộc
        images: [getRandomImage()], // Thêm trường images bắt buộc
        title: "Váy liền thân dự tiệc",
        content: "Váy liền thân dự tiệc màu đen sang trọng",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.9,
        totalProductSold: 65,
        isNew: true,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 3, percent: 20, status: true, createDate: new Date() },
        categoriesId: 6,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
    ];

    setShop(mockShop);
    setProducts(mockProducts);
    setLoading(false);
  }, [shopSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-lg text-foreground">Đang tải...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-lg text-destructive">Không tìm thấy cửa hàng</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/20 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary hover:text-primary/80">
              Trang chủ
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Cửa hàng</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{shop.name}</span>
          </nav>
        </div>
      </div>

      {/* Shop Banner */}
      <div className="relative h-96 bg-gradient-to-r from-primary to-primary-foreground/30">
        {shop.banner ? (
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold">Banner cửa hàng</h2>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Shop Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Shop Logo */}
            <div className="w-32 h-32 bg-card rounded-full border-4 border-card shadow-lg overflow-hidden flex-shrink-0">
              {shop.logo ? (
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-4xl">🏪</span>
                </div>
              )}
            </div>

            {/* Shop Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-card-foreground">
                  {shop.name}
                </h1>
                {shop.verified && (
                  <span className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                    ✓ Đã xác minh
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {shop.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Đánh giá:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sport-orange">★</span>
                    <span className="font-semibold">{shop.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Đánh giá trung bình
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {shop.reviewCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lượt đánh giá
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {shop.totalProducts}
                  </div>
                  <div className="text-sm text-muted-foreground">Sản phẩm</div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {shop.totalSales.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Đã bán</div>
                </div>
              </div>

              {/* Follow Button */}
              <div className="mt-6">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  + Theo dõi cửa hàng
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Theo dõi
              </button>
              <button className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
                Chat ngay
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border border-border rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sản phẩm ({shop.totalProducts})
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "info"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Thông tin
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
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
                  <h2 className="text-xl font-semibold text-foreground">
                    Sản phẩm của cửa hàng
                  </h2>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
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
                  {products.map(product => (
                    <ProductCardSimple
                      key={product.id}
                      product={product}
                      showQuickAdd={true}
                      showWishlist={true}
                      showQuickView={false}
                      simple={true}
                    />
                  ))}
                </div>

                {/* Show more products button */}
                {products.length > 0 && (
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
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
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    Thông tin cửa hàng
                  </h3>
                  <p className="text-muted-foreground">
                    Tên cửa hàng: {shop.name}
                  </p>
                  <p className="text-muted-foreground">ID: {shop.id}</p>
                  {shop.userId && (
                    <p className="text-muted-foreground">
                      User ID: {shop.userId}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    Trạng thái: {shop.status ? "Hoạt động" : "Tạm ngưng"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    Thông tin liên hệ
                  </h3>
                  <p className="text-muted-foreground">
                    Hiện tại chưa có thông tin liên hệ của cửa hàng.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    Thời gian tạo
                  </h3>
                  <p className="text-muted-foreground">
                    {shop.createDate
                      ? new Date(shop.createDate).toLocaleDateString("vi-VN")
                      : "Chưa có thông tin"}
                  </p>
                  {shop.createBy && (
                    <p className="text-muted-foreground">
                      Tạo bởi: {shop.createBy}
                    </p>
                  )}
                  {shop.modifierDate && (
                    <p className="text-muted-foreground">
                      Cập nhật lần cuối:{" "}
                      {new Date(shop.modifierDate).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                  {shop.modifierBy && (
                    <p className="text-muted-foreground">
                      Cập nhật bởi: {shop.modifierBy}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Đánh giá ({shop.reviewCount || 0})
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sport-orange text-lg">★</span>
                    <span className="font-semibold text-foreground">
                      {shop.rating || 0}
                    </span>
                    <span className="text-muted-foreground">trung bình</span>
                  </div>
                </div>

                {/* Khi không có đánh giá */}
                <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg bg-muted/20">
                  <div className="text-4xl mb-3">💬</div>
                  <p className="mb-2">
                    Đánh giá của khách hàng sẽ được hiển thị ở đây
                  </p>
                  <p className="text-sm">
                    Hiện tại chưa có đánh giá nào cho cửa hàng này
                  </p>
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

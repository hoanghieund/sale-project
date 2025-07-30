import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByShopId, getShopBySlug } from "./services/shopServices";

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
    const fetchShopData = async () => {
      setLoading(true);
      try {
        if (shopSlug) {
          const fetchedShop = await getShopBySlug(shopSlug);
          setShop(fetchedShop);

          if (fetchedShop && fetchedShop.id) {
            const fetchedProducts = await getProductsByShopId(fetchedShop.id);
            setProducts(fetchedProducts);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cửa hàng:", error);
        setShop(null); // Đặt shop về null để hiển thị thông báo lỗi
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
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
        {/* Banner hiện không tồn tại trong kiểu Shop mới, sử dụng ảnh mặc định hoặc ẩn đi */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <div className="text-6xl mb-4">🏪</div>
            <h2 className="text-2xl font-bold">Banner cửa hàng</h2>
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Shop Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Shop Logo */}
            <div className="w-32 h-32 bg-card rounded-full border-4 border-card shadow-lg overflow-hidden flex-shrink-0">
              {shop.avatar ? (
                <img
                  src={shop.avatar}
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
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {shop.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Đánh giá:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sport-orange">★</span>
                    <span className="font-semibold">N/A</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Đánh giá trung bình
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lượt đánh giá
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {shop.totalQuantity}
                  </div>
                  <div className="text-sm text-muted-foreground">Sản phẩm</div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {shop.totalPrice?.toLocaleString()}
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
              Sản phẩm ({shop.totalQuantity})
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
              Đánh giá (0)
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
                    Đánh giá (0)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sport-orange text-lg">★</span>
                    <span className="font-semibold text-foreground">
                      N/A
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

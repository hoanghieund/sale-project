import { Button } from "@/components/ui/button";
import PolicyInfoCard from "@/features/users/product-detail/components/PolicyInfoCard";
import ProductBreadcrumb from "@/features/users/product-detail/components/ProductBreadcrumb";
import QuantitySelector from "@/features/users/product-detail/components/QuantitySelector";
import { Product, Shop } from "@/types";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

/**
 * ProductDetailPage - Trang chi tiết sản phẩm C2C Marketplace
 * Hiển thị thông tin sản phẩm, shop bán hàng và các sản phẩm liên quan
 */

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "details">(
    "description"
  );

  useEffect(() => {
    // TODO: Fetch product data from API based on slug
    // Tạm thời sử dụng mock data
    // Tạo một object Product theo đúng interface
    const mockProduct: Product = {
      name: "Áo sơ mi nam cao cấp", // Trường bắt buộc
      images: [
        "/assets/product-1.jpg",
        "/assets/product-2.jpg",
        "/assets/product-3.jpg",
        "/assets/product-4.jpg",
      ],
      id: 1,
      title: "Áo sơ mi nam cao cấp",
      description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
      content:
        "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại, phù hợp cho công sở và dự tiệc. Chất liệu thoáng mát, form dáng chuẩn, dễ dàng phối đồ.",
      brand: "Brand A",
      material: "Cotton",
      origin: "Việt Nam",
      style: "Modern",
      star: 4.5,
      totalProductSold: 120,
      status: true,
      isNew: true,
      isFlashSale: false,
      isTrending: true,
      categoriesId: 1,
      shopId: 1,
      discountId: 1,
      createDate: new Date("2024-01-01T00:00:00Z"),
      modifierDate: new Date("2024-01-01T00:00:00Z"),
      // Thông tin discount
      discount: {
        id: 1,
        name: "Giảm giá mùa hè",
        percent: 25,
        status: true,
        createDate: new Date("2024-01-01"),
      },
    };

    // Thêm các trường cho UI (không thuộc interface Product)
    const productUI = {
      ...mockProduct,
      price: 299000,
      originalPrice: 399000,
      stock: 50,
      reviewCount: 45,
      tags: ["áo sơ mi", "nam", "công sở", "cao cấp"],
      slug: id || "",
    };

    // Tạo một object Shop theo đúng interface
    const mockShop: Shop = {
      id: 1,
      name: "Fashion Store VN",
      avatar: "/assets/shop-logo-1.jpg",
      status: true,
      userId: 1,
      createDate: new Date("2023-01-01T00:00:00Z"),
      modifierDate: new Date("2023-01-01T00:00:00Z"),
    };

    // Thêm các trường cho UI (không thuộc interface Shop)
    const shopUI = {
      ...mockShop,
      slug: "fashion-store-vn",
      description:
        "Chuyên cung cấp thời trang nam nữ cao cấp, chính hãng với giá tốt nhất thị trường.",
      logo: "/assets/product-1.jpg",
      banner: "/assets/product-2.jpg",
      ownerId: "user1",
      address: {
        street: "123 Nguyễn Huệ",
        city: "TP. Hồ Chí Minh",
        state: "Hồ Chí Minh",
        zipCode: "700000",
        country: "Việt Nam",
        phone: "0901234567",
      },
      verified: true,
      rating: 4.8,
      reviewCount: 1250,
      totalProducts: 450,
      totalSales: 15000,
      isActive: true,
      socialLinks: {
        facebook: "https://facebook.com/fashionstore",
        instagram: "https://instagram.com/fashionstore",
      },
      policies: {
        returnPolicy: "Đổi trả trong 7 ngày",
        shippingPolicy: "Miễn phí ship đơn > 500k",
        privacyPolicy: "Bảo mật thông tin khách hàng",
      },
      joinedAt: new Date("2023-01-01T00:00:00Z"),
    };

    setProduct(productUI as unknown as Product);
    setShop(shopUI as unknown as Shop);
    setLoading(false);
  }, [id]);

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
      <ProductBreadcrumb product={product} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
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
                    selectedImage === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-lg font-medium ml-1">
                    {product.star || 0}
                  </span>
                  <span className="text-gray-500 ml-1">
                    ({(product as any).reviewCount || 0} đánh giá)
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  Đã bán {product.totalProductSold || 0}
                </span>
                {product.isNew && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                      Mới
                    </span>
                  </>
                )}
                {product.isFlashSale && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm font-medium">
                      Flash Sale
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  {(product as any).price?.toLocaleString() || 0}đ
                </span>
                {(product as any).originalPrice &&
                  (product as any).originalPrice > (product as any).price && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {(product as any).originalPrice.toLocaleString()}đ
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                        -
                        {Math.round(
                          (1 -
                            (product as any).price /
                              (product as any).originalPrice) *
                            100
                        )}
                        %
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
                  {(shop as any).logo ? (
                    <img
                      src={(shop as any).logo}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">🏪</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Link
                    to={`/shop/${(shop as any).slug}`}
                    className="text-lg font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    {shop.name}
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>
                      ★ {(shop as any).rating || 0} (
                      {(shop as any).reviewCount || 0} đánh giá)
                    </span>
                    <span>•</span>
                    <span>{(shop as any).totalProducts || 0} sản phẩm</span>
                    {(shop as any).verified && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600">✓ Đã xác minh</span>
                      </>
                    )}
                  </div>
                </div>
                <Link
                  to={`/shop/${(shop as any).slug}`}
                  className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Xem shop
                </Link>
              </div>
            </div>

            {/* Quantity and Actions */}
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={(product as any).stock || 10}
            />
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                // disabled={product.stock === 0}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1"
                // disabled={product.stock === 0}
              >
                Mua ngay
              </Button>
            </div>

            {/* Product Tags */}
            {(product as any).tags && (product as any).tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Tags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(product as any).tags.map((tag: string, index: number) => (
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
            <p className="text-gray-700 leading-relaxed">{product.content}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Thông số sản phẩm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {product.brand && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Thương hiệu:
                </span>
                <span className="text-gray-600">{product.brand}</span>
              </div>
            )}
            {product.material && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Chất liệu:
                </span>
                <span className="text-gray-600">{product.material}</span>
              </div>
            )}
            {product.origin && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Xuất xứ:
                </span>
                <span className="text-gray-600">{product.origin}</span>
              </div>
            )}
            {product.style && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Phong cách:
                </span>
                <span className="text-gray-600">{product.style}</span>
              </div>
            )}
            {(product.height || product.width || product.length) && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Kích thước:
                </span>
                <span className="text-gray-600">
                  {[
                    product.height && `Cao ${product.height}cm`,
                    product.width && `Rộng ${product.width}cm`,
                    product.length && `Dài ${product.length}cm`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {product.weight && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Trọng lượng:
                </span>
                <span className="text-gray-600">{product.weight}g</span>
              </div>
            )}
            {product.isNew !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Sản phẩm mới:
                </span>
                <span className="text-gray-600">
                  {product.isNew ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isFlashSale !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Flash sale:
                </span>
                <span className="text-gray-600">
                  {product.isFlashSale ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isTrending !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Xu hướng:
                </span>
                <span className="text-gray-600">
                  {product.isTrending ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.createDate && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Ngày đăng:
                </span>
                <span className="text-gray-600">
                  {new Date(product.createDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Shop Policies */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6">Chính sách cửa hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PolicyInfoCard
              icon="🔄"
              title="Chính sách đổi trả"
              description={
                (shop as any).policies?.returnPolicy || "Không có thông tin"
              }
            />
            <PolicyInfoCard
              icon="🚚"
              title="Chính sách vận chuyển"
              description={
                (shop as any).policies?.shippingPolicy || "Không có thông tin"
              }
            />
            <PolicyInfoCard
              icon="🛡️"
              title="Chính sách bảo mật"
              description={
                (shop as any).policies?.privacyPolicy || "Không có thông tin"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

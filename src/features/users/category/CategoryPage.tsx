import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Category, Product, Subcategory } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * CategoryPage - Trang hiển thị danh mục chính
 * Hiển thị danh sách subcategories và các sản phẩm nổi bật trong category
 */
const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch category data from API
    // Tạm thời sử dụng mock data dựa trên categorySlug
    const getCategoryData = (slug: string) => {
      switch (slug) {
        case "thoi-trang":
          return {
            category: {
              id: "1",
              name: "Thời trang",
              slug: "thoi-trang",
              description: "Thời trang nam nữ đa dạng, phong cách hiện đại",
              image: "/images/category-fashion.jpg",
              icon: "👕",
              subcategoryIds: ["1", "2", "3", "4"],
              featured: true,
              isActive: true,
              sortOrder: 1,
              productCount: 1250,
            },
            subcategories: [
              {
                id: "1",
                name: "Áo nam",
                slug: "ao-nam",
                description: "Áo sơ mi, áo thun, áo khoác nam",
                image: "/images/subcategory-men-shirts.jpg",
                categoryId: "1",
                featured: true,
                isActive: true,
                sortOrder: 1,
                productCount: 350,
              },
              {
                id: "2",
                name: "Áo nữ",
                slug: "ao-nu",
                description: "Áo sơ mi, áo thun, áo khoác nữ",
                image: "/images/subcategory-women-shirts.jpg",
                categoryId: "1",
                featured: true,
                isActive: true,
                sortOrder: 2,
                productCount: 420,
              },
              {
                id: "3",
                name: "Quần nam",
                slug: "quan-nam",
                description: "Quần jean, quần tây, quần short nam",
                image: "/images/subcategory-men-pants.jpg",
                categoryId: "1",
                featured: true,
                isActive: true,
                sortOrder: 3,
                productCount: 280,
              },
              {
                id: "4",
                name: "Quần nữ",
                slug: "quan-nu",
                description: "Quần jean, quần tây, chân váy nữ",
                image: "/images/subcategory-women-pants.jpg",
                categoryId: "1",
                featured: true,
                isActive: true,
                sortOrder: 4,
                productCount: 200,
              },
            ],
          };
        case "dien-tu":
          return {
            category: {
              id: "2",
              name: "Điện tử",
              slug: "dien-tu",
              description: "Thiết bị điện tử, công nghệ hiện đại",
              image: "/images/category-electronics.jpg",
              icon: "📱",
              subcategoryIds: ["5", "6", "7"],
              featured: true,
              isActive: true,
              sortOrder: 2,
              productCount: 890,
            },
            subcategories: [
              {
                id: "5",
                name: "Điện thoại",
                slug: "dien-thoai",
                description: "Smartphone, điện thoại di động",
                image: "/images/subcategory-phones.jpg",
                categoryId: "2",
                featured: true,
                isActive: true,
                sortOrder: 1,
                productCount: 280,
              },
              {
                id: "6",
                name: "Laptop",
                slug: "laptop",
                description: "Laptop, máy tính xách tay",
                image: "/images/subcategory-laptops.jpg",
                categoryId: "2",
                featured: true,
                isActive: true,
                sortOrder: 2,
                productCount: 190,
              },
              {
                id: "7",
                name: "Phụ kiện",
                slug: "phu-kien",
                description: "Tai nghe, sạc, ốp lưng, chuột",
                image: "/images/subcategory-accessories.jpg",
                categoryId: "2",
                featured: true,
                isActive: true,
                sortOrder: 3,
                productCount: 420,
              },
            ],
          };
        default:
          return {
            category: {
              id: "1",
              name: "Thời trang",
              slug: "thoi-trang",
              description: "Thời trang nam nữ đa dạng",
              image: "/images/category-fashion.jpg",
              icon: "👕",
              subcategoryIds: ["1", "2"],
              featured: true,
              isActive: true,
              sortOrder: 1,
              productCount: 150,
            },
            subcategories: [],
          };
      }
    };

    const { category: mockCategory, subcategories: mockSubcategories } =
      getCategoryData(categorySlug || "");

    // Mock featured products
    const mockFeaturedProducts: Product[] = [
      {
        id: "1",
        name: "Áo sơ mi nam cao cấp",
        slug: "ao-so-mi-nam-cao-cap",
        description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
        price: 299000,
        originalPrice: 399000,
        images: ["/images/product-1.jpg"],
        categoryId: mockCategory.id,
        subcategoryId: "1",
        shopId: "shop1",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 45,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: "2",
        name: "Áo thun nữ basic",
        slug: "ao-thun-nu-basic",
        description: "Áo thun nữ basic, form rộng thoải mái",
        price: 159000,
        originalPrice: 199000,
        images: ["/images/product-2.jpg"],
        categoryId: mockCategory.id,
        subcategoryId: "2",
        shopId: "shop2",
        stock: 30,
        sold: 85,
        rating: 4.3,
        reviewCount: 32,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: "3",
        name: "Quần jean nam slim fit",
        slug: "quan-jean-nam-slim-fit",
        description: "Quần jean nam slim fit, chất liệu denim cao cấp",
        price: 459000,
        originalPrice: 599000,
        images: ["/images/product-3.jpg"],
        categoryId: mockCategory.id,
        subcategoryId: "3",
        shopId: "shop3",
        stock: 25,
        sold: 67,
        rating: 4.7,
        reviewCount: 28,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: "4",
        name: "Váy nữ dáng A",
        slug: "vay-nu-dang-a",
        description: "Váy nữ dáng A thanh lịch, phù hợp đi làm",
        price: 329000,
        originalPrice: 429000,
        images: ["/images/product-4.jpg"],
        categoryId: mockCategory.id,
        subcategoryId: "4",
        shopId: "shop4",
        stock: 40,
        sold: 93,
        rating: 4.6,
        reviewCount: 41,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      },
    ];

    setCategory(mockCategory);
    setSubcategories(mockSubcategories);
    setFeaturedProducts(mockFeaturedProducts);
    setLoading(false);
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy danh mục</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-gray-600">{category.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <span className="text-5xl">{category.icon}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h1>
                <p className="text-gray-600 text-lg mb-3">
                  {category.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    {category.productCount.toLocaleString()} sản phẩm
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {subcategories.length} danh mục con
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Danh mục con</h2>
            <Link
              to="/categories"
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
            >
              Xem tất cả
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.id}
                to={`/subcategory/${subcategory.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {subcategory.image ? (
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-5xl text-gray-400 group-hover:scale-110 transition-transform duration-300">
                      📦
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {subcategory.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600 font-medium">
                      {subcategory.productCount.toLocaleString()} sản phẩm
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sản phẩm nổi bật
            </h2>
            <Link
              to={`/products?category=${category.slug}`}
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
            >
              Xem tất cả
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400">📦</span>
                    )}
                    {product.originalPrice > product.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        -
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        %
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        Đã bán {product.sold}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-emerald-600">
                        {product.price.toLocaleString()}đ
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-full py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-lg">Chưa có sản phẩm nổi bật</p>
                <p className="text-sm">
                  Hãy quay lại sau để xem các sản phẩm mới nhất
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

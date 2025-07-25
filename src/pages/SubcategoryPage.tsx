import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Subcategory, Product, Category } from "@/types";

/**
 * SubcategoryPage - Trang hiển thị danh mục con
 * Hiển thị tất cả sản phẩm thuộc subcategory
 */
const SubcategoryPage = () => {
  const { subcategorySlug } = useParams<{ subcategorySlug: string }>();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // TODO: Fetch subcategory data from API
    // Tạm thời sử dụng mock data dựa trên subcategorySlug
    const getSubcategoryData = (slug: string) => {
      switch (slug) {
        case "ao-nam":
          return {
            id: "1",
            name: "Áo nam",
            slug: "ao-nam",
            description: "Áo sơ mi, áo thun, áo khoác nam chất lượng cao",
            image: "/images/subcategory-men-shirts.jpg",
            icon: "👔",
            categoryId: "1",
            category: {
              id: "1",
              name: "Thời trang",
              slug: "thoi-trang",
              description: "Thời trang nam nữ đa dạng",
              image: "/images/category-fashion.jpg",
              icon: "👕",
              subcategoryIds: ["1", "2", "3", "4"],
              featured: true,
              isActive: true,
              sortOrder: 1,
              productCount: 1250
            },
            featured: true,
            isActive: true,
            sortOrder: 1,
            productCount: 350
          };
        default:
          return {
            id: "1",
            name: "Áo nam",
            slug: "ao-nam",
            description: "Áo sơ mi, áo thun nam",
            image: "/images/subcategory-men-shirts.jpg",
            icon: "👔",
            categoryId: "1",
            category: {
              id: "1",
              name: "Thời trang",
              slug: "thoi-trang",
              description: "Thời trang nam nữ",
              image: "/images/category-fashion.jpg",
              icon: "👕",
              subcategoryIds: ["1", "2"],
              featured: true,
              isActive: true,
              sortOrder: 1,
              productCount: 150
            },
            featured: true,
            isActive: true,
            sortOrder: 1,
            productCount: 50
          };
      }
    };

    const mockSubcategory = getSubcategoryData(subcategorySlug || "");

    // Mock products data
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Áo sơ mi nam cao cấp",
        slug: "ao-so-mi-nam-cao-cap",
        description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
        price: 299000,
        originalPrice: 399000,
        images: ["/images/product-1.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop1",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 45,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z")
      },
      {
        id: "2",
        name: "Áo thun nam basic",
        slug: "ao-thun-nam-basic",
        description: "Áo thun nam basic, form rộng thoải mái",
        price: 159000,
        originalPrice: 199000,
        images: ["/images/product-2.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop2",
        stock: 30,
        sold: 85,
        rating: 4.3,
        reviewCount: 32,
        inStock: true,
        isActive: true,
        isFeatured: false,
        createdAt: new Date("2024-01-02T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z")
      },
      {
        id: "3",
        name: "Áo khoác nam da thời trang",
        slug: "ao-khoac-nam-da-thoi-trang",
        description: "Áo khoác nam chất liệu da thật, phong cách thời trang",
        price: 899000,
        originalPrice: 1200000,
        images: ["/images/product-3.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop3",
        stock: 15,
        sold: 45,
        rating: 4.8,
        reviewCount: 28,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-03T00:00:00Z"),
        updatedAt: new Date("2024-01-03T00:00:00Z")
      },
      {
        id: "4",
        name: "Áo polo nam cao cấp",
        slug: "ao-polo-nam-cao-cap",
        description: "Áo polo nam chất liệu cotton, thoáng mát",
        price: 249000,
        images: ["/images/product-4.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop4",
        stock: 35,
        sold: 67,
        rating: 4.4,
        reviewCount: 41,
        inStock: true,
        isActive: true,
        isFeatured: false,
        createdAt: new Date("2024-01-04T00:00:00Z"),
        updatedAt: new Date("2024-01-04T00:00:00Z")
      },
      {
        id: "5",
        name: "Áo hoodie nam unisex",
        slug: "ao-hoodie-nam-unisex",
        description: "Áo hoodie nam unisex, chất liệu nỉ mềm mại",
        price: 329000,
        originalPrice: 429000,
        images: ["/images/product-5.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop5",
        stock: 25,
        sold: 93,
        rating: 4.6,
        reviewCount: 55,
        inStock: true,
        isActive: true,
        isFeatured: true,
        createdAt: new Date("2024-01-05T00:00:00Z"),
        updatedAt: new Date("2024-01-05T00:00:00Z")
      },
      {
        id: "6",
        name: "Áo sơ mi nam công sở",
        slug: "ao-so-mi-nam-cong-so",
        description: "Áo sơ mi nam công sở, phù hợp đi làm",
        price: 379000,
        images: ["/images/product-6.jpg"],
        categoryId: mockSubcategory.categoryId,
        subcategoryId: mockSubcategory.id,
        shopId: "shop6",
        stock: 40,
        sold: 78,
        rating: 4.2,
        reviewCount: 36,
        inStock: true,
        isActive: true,
        isFeatured: false,
        createdAt: new Date("2024-01-06T00:00:00Z"),
        updatedAt: new Date("2024-01-06T00:00:00Z")
      }
    ];

    setSubcategory(mockSubcategory);
    setProducts(mockProducts);
    setLoading(false);
  }, [subcategorySlug]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // TODO: Implement sorting logic
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy danh mục con</div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-emerald-600 hover:text-emerald-700">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <Link 
              to={`/category/${subcategory.category?.slug}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {subcategory.category?.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{subcategory.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Subcategory Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <span className="text-5xl">{subcategory.icon}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{subcategory.name}</h1>
                <p className="text-gray-600 text-lg mb-3">{subcategory.description}</p>
                <div className="flex items-center gap-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    {subcategory.productCount.toLocaleString()} sản phẩm
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Danh mục: {subcategory.category?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">
                Hiển thị {products.length} / {subcategory.productCount} sản phẩm
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-gray-600 font-medium">
                Sắp xếp theo:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="popular">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.length > 0 ? (
            products.map((product) => (
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
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}
                  {product.isFeatured && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      Nổi bật
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">Đã bán {product.sold}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-emerald-600">
                        {product.price.toLocaleString()}đ
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Còn {product.stock}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Shop: {product.shopId}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-lg">Chưa có sản phẩm</p>
              <p className="text-sm">Hãy quay lại sau để xem các sản phẩm mới nhất</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;

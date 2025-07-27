import CategoryCard from "@/components/common/CategoryCard";
import CategoryInfo from "@/components/common/CategoryInfo";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Category, Product } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * CategoryPage - Trang hiển thị danh mục chính
 * Hiển thị danh sách subcategories và các sản phẩm nổi bật trong category
 */
const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
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
              id: 1,
              name: "Thời trang",
              icon: "👕",
              active: true,
              isShowSuggests: true,
              totalProduct: 1250,
            },
            subcategories: [
              {
                id: 1,
                name: "Áo nam",
                icon: "👔",
                active: true,
                isShowSuggests: true,
                totalProduct: 350,
                parentId: 1,
              },
              {
                id: 2,
                name: "Áo nữ",
                icon: "👚",
                active: true,
                isShowSuggests: true,
                totalProduct: 420,
                parentId: 1,
              },
              {
                id: 3,
                name: "Quần nam",
                icon: "👖",
                active: true,
                isShowSuggests: true,
                totalProduct: 280,
                parentId: 1,
              },
              {
                id: 4,
                name: "Quần nữ",
                icon: "👗",
                active: true,
                isShowSuggests: true,
                totalProduct: 200,
                parentId: 1,
              },
            ],
          };
        case "dien-tu":
          return {
            category: {
              id: 2,
              name: "Điện tử",
              icon: "📱",
              active: true,
              isShowSuggests: true,
              totalProduct: 890,
            },
            subcategories: [
              {
                id: 5,
                name: "Điện thoại",
                icon: "📱",
                active: true,
                isShowSuggests: true,
                totalProduct: 280,
                parentId: 2,
              },
              {
                id: 6,
                name: "Laptop",
                icon: "💻",
                active: true,
                isShowSuggests: true,
                totalProduct: 190,
                parentId: 2,
              },
              {
                id: 7,
                name: "Phụ kiện",
                icon: "🎧",
                active: true,
                isShowSuggests: true,
                totalProduct: 420,
                parentId: 2,
              },
            ],
          };
        default:
          return {
            category: {
              id: 1,
              name: "Thời trang",
              icon: "👕",
              active: true,
              isShowSuggests: true,
              totalProduct: 150,
            },
            subcategories: [],
          };
      }
    };

    const { category: mockCategory, subcategories: mockSubcategories } =
      getCategoryData(categorySlug || "");

    // Thêm dữ liệu mẫu cho các danh mục con nếu chưa có
    if (mockSubcategories.length === 0 && mockCategory) {
      // Tạo danh sách danh mục con mẫu nếu không có
      const subcategoriesMock = [
        {
          id: mockCategory.id * 100 + 1,
          name: "Áo thun",
          icon: "👕",
          active: true,
          isShowSuggests: true,
          totalProduct: 120,
          parentId: mockCategory.id,
        },
        {
          id: mockCategory.id * 100 + 2,
          name: "Áo sơ mi",
          icon: "👔",
          active: true,
          isShowSuggests: true,
          totalProduct: 85,
          parentId: mockCategory.id,
        },
        {
          id: mockCategory.id * 100 + 3,
          name: "Quần jeans",
          icon: "👖",
          active: true,
          isShowSuggests: true,
          totalProduct: 95,
          parentId: mockCategory.id,
        },
        {
          id: mockCategory.id * 100 + 4,
          name: "Váy đầm",
          icon: "👗",
          active: true,
          isShowSuggests: true,
          totalProduct: 110,
          parentId: mockCategory.id,
        },
        {
          id: mockCategory.id * 100 + 5,
          name: "Giày dép",
          icon: "👟",
          active: true,
          isShowSuggests: true,
          totalProduct: 75,
          parentId: mockCategory.id,
        },
        {
          id: mockCategory.id * 100 + 6,
          name: "Phụ kiện",
          icon: "👜",
          active: true,
          isShowSuggests: true,
          totalProduct: 60,
          parentId: mockCategory.id,
        },
      ];

      // Thêm vào mảng mockSubcategories
      mockSubcategories.push(...subcategoriesMock);
    }

    // Mock featured products với cấu trúc mới theo interface Product
    const mockFeaturedProducts: Product[] = [
      {
        id: 1,
        title: "Áo sơ mi nam cao cấp",
        content: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
        brand: "Brand A",
        material: "Cotton",
        origin: "Vietnam",
        style: "Modern",
        star: 4.5,
        totalProductSold: 120,
        status: true,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 1,
        shopId: 1,
        discount: {
          id: 1,
          percent: 25,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-01T00:00:00Z"),
        modifierDate: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: 2,
        title: "Áo thun nữ basic",
        content: "Áo thun nữ basic, form rộng thoải mái",
        brand: "Brand B",
        material: "Cotton",
        origin: "Vietnam",
        style: "Casual",
        star: 4.3,
        totalProductSold: 85,
        status: true,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 1,
        shopId: 2,
        discount: {
          id: 2,
          percent: 20,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-01T00:00:00Z"),
        modifierDate: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: 3,
        title: "Quần jean nam slim fit",
        content: "Quần jean nam slim fit, chất liệu denim cao cấp",
        brand: "Brand C",
        material: "Denim",
        origin: "Vietnam",
        style: "Slim Fit",
        star: 4.7,
        totalProductSold: 67,
        status: true,
        isNew: false,
        isFlashSale: true,
        isTrending: true,
        categoriesId: 1,
        shopId: 3,
        discount: {
          id: 3,
          percent: 23,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-01T00:00:00Z"),
        modifierDate: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: 4,
        title: "Váy nữ dáng A",
        content: "Váy nữ dáng A thanh lịch, phù hợp đi làm",
        brand: "Brand D",
        material: "Cotton",
        origin: "Vietnam",
        style: "A-line",
        star: 4.6,
        totalProductSold: 93,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 1,
        shopId: 4,
        discount: {
          id: 4,
          percent: 23,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-01T00:00:00Z"),
        modifierDate: new Date("2024-01-01T00:00:00Z"),
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
        {/* Sử dụng component CategoryInfo */}
        <CategoryInfo 
          category={category} 
          subcategoriesCount={subcategories.length} 
          type="category" 
        />

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
              <CategoryCard
                key={subcategory.id}
                category={subcategory}
                linkTo={`/subcategory/${subcategory.id}`}
              />
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
              to={`/products?category=${category.id}`}
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
                <ProductCardSimple
                  key={product.id}
                  product={product}
                  showQuickAdd={true}
                  showWishlist={true}
                  showQuickView={true}
                  simple={false}
                />
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

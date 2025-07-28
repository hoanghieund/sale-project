import CategoryCard from "@/components/common/CategoryCard";
import CategoryInfo from "@/components/common/CategoryInfo";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categoryService } from "@/features/users/category/services/categoryServices";
import { productService } from "@/features/users/category/services/productServices";
import { Category, Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRandomImage } from "../../../utils/random-image";

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

  /**
   * Fetches category data and featured products from the API.
   * @param slug - The slug of the category to fetch.
   */
  const fetchData = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      // Fetch category and subcategories
      const categoryResponse = await categoryService.getCategoryBySlug(slug);
      setCategory(categoryResponse.data.category);
      setSubcategories(categoryResponse.data.subcategories || []);

      // Fetch featured products based on category ID
      if (categoryResponse.data.category?.id) {
        const productsResponse = await productService.getProductsByCategoryId(
          categoryResponse.data.category.id
        );
        // Map products to include an image and ensure the structure matches Product interface
        const mappedProducts: Product[] = productsResponse.data.map(
          (product: Product) => ({
            ...product,
            images: product.images && product.images.length > 0 ? product.images : [getRandomImage()],
            name: product.name || product.title, // Ensure name exists
          })
        );
        setFeaturedProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategory(null); // Reset category on error
      setSubcategories([]);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categorySlug) {
      fetchData(categorySlug);
    }
  }, [categorySlug, fetchData]);

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

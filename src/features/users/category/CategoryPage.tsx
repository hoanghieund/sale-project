import CategoryCard from "@/components/common/CategoryCard";
import CategoryInfo from "@/components/common/CategoryInfo";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
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

/**
 * CategoryPage - Trang hiển thị danh mục chính
 * Hiển thị danh sách subcategories và các sản phẩm nổi bật trong category
 */
const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  /**
   * Fetches category data and featured products from the API.
   * @param id - The id of the category to fetch.
   */
  const fetchData = useCallback(async (id: string) => {
    try {
      // Fetch category and subcategories
      const categoryResponse : Category = await categoryService.getCategoryById(id);
      setCategory(categoryResponse);
      setSubcategories(categoryResponse.child || []);

      // Fetch featured products based on category ID
      if (categoryResponse.id) {
        const productsResponse= await productService.getProductsByCategoryId(
          categoryResponse.id,
          0,
          10
        );
        setFeaturedProducts(productsResponse.content);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategory(null); // Reset category on error
      setSubcategories([]);
      setFeaturedProducts([]);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchData(categoryId);
    }
  }, [categoryId, fetchData]);

  if (!category) {
    return (
      <EmptyStateDisplay />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.length > 0 ? (
              subcategories.map(subcategory => (
                <CategoryCard
                  key={subcategory.id}
                  category={subcategory}
                  linkTo={`/subcategory/${subcategory.id}`}
                />
              ))
            ) : (
              <EmptyStateMessage icon="🛍️" message="Chưa có danh mục con" />
            )}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sản phẩm nổi bật
            </h2>
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
              <EmptyStateMessage icon="🛍️" message="Chưa có sản phẩm nổi bật" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import CategoryCard from "@/components/common/CategoryCard";
import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import InputDebounce from "@/components/common/InputDebounce";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { categoryService } from "@/features/users/category/services/categoryServices";
import { productService } from "@/features/users/category/services/productServices";
import { Category, Product } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * CategoryPage - Main category display page
 * Displays a list of subcategories and products with filters and pagination
 */
const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for new filter system
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 10,
    sort: "asc", // "asc" or "desc"
    keyword: "", // Search keyword
  });

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * Fetches category data and subcategories from the API.
   * @param slug - The slug of the category to fetch.
   */
  const fetchCategoryData = useCallback(async (slug: string) => {
    try {
      // Fetch category and subcategories
      const categoryResponse: Category[] =
        await categoryService.getCategoryBySlug(slug);
      setCategories(categoryResponse);
      if (categoryResponse.length === 1) {
        const subCategoryResponse: Category[] =
          await categoryService.getCategoryByParent(slug);
        setSubcategories(subCategoryResponse);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error loading category data:", error);
      setCategories([]);
      setSubcategories([]);
    }
  }, []);

  /**
   * Fetches product data with filters
   */
  const fetchProductData = async (slug: string) => {
    if (!slug) return;

    setLoading(true);
    try {
      // Standardize payload according to service interface
      const payload = {
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        sort: filters.sort as "asc" | "desc",
        keyword: filters.keyword,
      };

      const response = await productService.getProductsByCategorySlug(
        slug,
        payload
      );

      const products = response?.content || [];

      setProducts(products);

      // Update pagination information
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Error loading product data:", error);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch category data when categoryId changes
  useEffect(() => {
    if (categorySlug) {
      fetchCategoryData(categorySlug);
    }
  }, [categorySlug, fetchCategoryData]);

  // Effect to fetch product data when categoryId or filters change
  useEffect(() => {
    if (categorySlug && categories.length === 1) {
      fetchProductData(categorySlug);
    } else if (categories.length === 2) {
      fetchProductData(categories[1].slug);
    }
  }, [categorySlug, categories, filters]);

  const breadcrumbItems = useMemo(() => {
    if (categories.length === 1) {
      return [
        { label: "Home", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].slug}` },
      ];
    } else if (categories.length === 2) {
      return [
        { label: "Home", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].slug}` },
        { label: categories[1].name, to: `/category/${categories[1].slug}` },
      ];
    } else {
      return [{ label: "Home", to: "/" }, { label: "Category" }];
    }
  }, [categorySlug, categories]);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Subcategories Grid */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">Categories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategories.length > 0 ? (
                subcategories.map(subcategory => (
                  <CategoryCard
                    key={subcategory.id}
                    category={subcategory}
                    linkTo={`/category/${subcategory.slug}`}
                  />
                ))
              ) : (
                <EmptyStateMessage icon="🛍️" message="No subcategories yet" />
              )}
            </div>
          </div>
        )}

        {/* Products with Filters */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              Products in this Category
            </CardTitle>
            <CardDescription>
              Explore a variety of products in this category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-end gap-6">
              {/* Keyword Search */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Search</Label>

                <InputDebounce
                  type="text"
                  placeholder="Enter keyword"
                  value={filters.keyword}
                  onDebounceChange={debouncedKeyword =>
                    setFilters(prev => ({
                      ...prev,
                      keyword: debouncedKeyword,
                      currentPage: 0,
                    }))
                  }
                />
              </div>

              {/* Sort by Price */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Sort</Label>
                <Select
                  value={filters.sort}
                  onValueChange={value => {
                    setFilters(prev => ({
                      ...prev,
                      sort: value,
                      currentPage: 0,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Low to High</SelectItem>
                    <SelectItem value="desc">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Result Information */}
            <div className="text-sm text-muted-foreground">
              Showing {products.length} of {totalElements} products
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {products.length > 0 ? (
                    products.map(product => (
                      <ProductCardSimple
                        key={product.id}
                        product={product}
                        showWishlist={true}
                        showQuickView={false}
                        simple={true}
                      />
                    ))
                  ) : (
                    <div className="col-span-full">
                      {categories === null ? <EmptyStateDisplay /> : <></>}
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <CustomPagination
                      currentPage={filters.currentPage + 1} // API uses 0-based, UI uses 1-based
                      totalPages={totalPages}
                      onPageChange={page => {
                        setFilters(prev => ({
                          ...prev,
                          currentPage: page - 1,
                        })); // Convert to 0-based for API
                      }}
                      className="justify-center"
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;

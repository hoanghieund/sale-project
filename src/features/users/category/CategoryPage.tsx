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
import { Category, Product } from "@/types";
import {
  parseAsIndex,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"; // Đồng bộ q, sort, page với URL
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * CategoryPage - Main category display page
 * Displays a list of subcategories and products with filters and pagination
 */
const CategoryPage = () => {
  const { categorySlug, subCategorySlug, collectionSlug } = useParams<{
    categorySlug: string;
    subCategorySlug?: string;
    collectionSlug?: string;
  }>();
  const [collection, setCollection] = useState([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Nuqs-backed states: page (base-0), sort, keyword
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsIndex.withDefault(0)
  );
  const [sortQ, setSortQ] = useQueryState(
    "sort",
    parseAsStringLiteral(["asc", "desc"] as const).withDefault("asc")
  );
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [pageSize] = useState(72); // Có thể nâng cấp đồng bộ qua URL nếu cần

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * Fetches category data and subcategories from the API.
   * @param slug - The slug of the category to fetch.
   */
  const fetchCategoryData = useCallback(
    async (
      slugCategory: string | undefined,
      slugSubCategory: string | undefined,
      slugCollection: string | undefined,
      page: number,
      size: number,
      sort: "asc" | "desc",
      keyword: string
    ) => {
      try {
        setLoading(true);
        // Fetch category and subcategories
        const categoryResponse = await categoryService.getDataBySlug(
          slugCategory,
          slugSubCategory,
          slugCollection,
          page,
          size,
          sort,
          keyword
        );
        setSubcategories(categoryResponse.category || []);
        setCollection(categoryResponse.collections || []);
        setProducts(categoryResponse.productPage.content || []);
        setTotalPages(categoryResponse.productPage.totalPages || 0);
        setTotalElements(categoryResponse.productPage.totalElements || 0);
      } catch (error) {
        console.error("Error loading category data:", error);
        setSubcategories([]);
        setCollection([]);
        setProducts([]);
        setTotalPages(0);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Effect to fetch category data when categoryId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (categorySlug || subCategorySlug || collectionSlug) {
      fetchCategoryData(
        categorySlug,
        subCategorySlug,
        collectionSlug,
        pageIndex,
        pageSize,
        sortQ,
        q
      );
    }
  }, [
    categorySlug,
    subCategorySlug,
    collectionSlug,
    pageIndex,
    pageSize,
    sortQ,
    q,
  ]);

  const breadcrumbItems = useMemo(() => {
    console.log("🚀 ~ CategoryPage ~ categorySlug:", categorySlug);
    console.log("🚀 ~ CategoryPage ~ subCategorySlug:", subCategorySlug);
    console.log("🚀 ~ CategoryPage ~ collectionSlug:", collectionSlug);

    if (categorySlug && !subCategorySlug && !collectionSlug) {
      return [
        { label: "Home", to: "/" },
        { label: categorySlug, to: `/category/${categorySlug}` },
      ];
    } else if (categorySlug && subCategorySlug && !collectionSlug) {
      return [
        { label: "Home", to: "/" },
        { label: categorySlug, to: `/category/${categorySlug}` },
        {
          label: subCategorySlug,
          to: `/category/${categorySlug}/${subCategorySlug}`,
        },
      ];
    } else if (categorySlug && subCategorySlug && collectionSlug) {
      return [
        { label: "Home", to: "/" },
        { label: categorySlug, to: `/category/${categorySlug}` },
        {
          label: subCategorySlug,
          to: `/category/${categorySlug}/${subCategorySlug}`,
        },
        {
          label: collectionSlug,
          to: `/category/${categorySlug}/${subCategorySlug}/${collectionSlug}`,
        },
      ];
    } else {
      return [{ label: "Home", to: "/" }, { label: "Category" }];
    }
  }, [categorySlug, subCategorySlug, collectionSlug]);

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

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {subcategories.length > 0 ? (
                subcategories.map(subcategory => (
                  <CategoryCard
                    key={subcategory.id}
                    category={subcategory}
                    linkTo={`/category/${categorySlug}/${subcategory.slug}`}
                  />
                ))
              ) : (
                <EmptyStateMessage icon="🛍️" message="No subcategories yet" />
              )}
            </div>
          </div>
        )}

        {collection.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">Collections</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {collection.length > 0 ? (
                collection.map(collection => (
                  <CategoryCard
                    key={collection.id}
                    category={collection}
                    linkTo={`/category/${categorySlug}/${subCategorySlug}/${collection.slug}`}
                  />
                ))
              ) : (
                <EmptyStateMessage icon="🛍️" message="No collections yet" />
              )}
            </div>
          </div>
        )}

        {/* Products with Filters */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              Products in this {collectionSlug ? "collection" : "category"}
            </CardTitle>
            <CardDescription>
              Explore a variety of products in this{" "}
              {collectionSlug ? "collection" : "category"}
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
                  value={q}
                  onDebounceChange={debouncedKeyword => {
                    // Bỏ qua nếu không thay đổi (tránh reset khi mount với giá trị sẵn có)
                    if (debouncedKeyword === q) return;
                    // Cập nhật q trên URL; rỗng -> remove param
                    setQ(debouncedKeyword ? debouncedKeyword : null);
                    // Người dùng thay đổi keyword -> luôn reset về trang đầu
                    setPageIndex(0);
                  }}
                />
              </div>

              {/* Sort by Price */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Sort</Label>
                <Select
                  value={sortQ}
                  onValueChange={value => {
                    // Reset trang khi đổi sort
                    setPageIndex(0);
                    setSortQ(value as "asc" | "desc");
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
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
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
                      <EmptyStateDisplay />
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <CustomPagination
                      // currentPage hiển thị base-1; map từ pageIndex (base-0)
                      currentPage={pageIndex + 1}
                      totalPages={totalPages}
                      onPageChange={page => {
                        // Đồng bộ URL với page mới (base-1 -> base-0)
                        setPageIndex(page - 1);
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

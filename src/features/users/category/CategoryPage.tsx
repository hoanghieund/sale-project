import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import CategoryCard from "@/components/common/CategoryCard";
import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import InputNumber from "@/components/common/InputNumber";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * CategoryPage - Main category display page
 * Displays a list of subcategories and products with filters and pagination
 */
const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for new filter system
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 20,
    popular: false,
    latest: false,
    bestSell: false,
    price: "",
    priceFrom: "",
    priceTo: "",
  });

  // Separate state for price inputs for debounce
  const [priceInputs, setPriceInputs] = useState({
    priceFrom: "",
    priceTo: "",
  });

  // Timer reference for debounce
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * Fetches category data and subcategories from the API.
   * @param id - The id of the category to fetch.
   */
  const fetchCategoryData = useCallback(async (id: string) => {
    try {
      // Fetch category and subcategories
      const categoryResponse: Category[] =
        await categoryService.getCategoryById(id);
      setCategories(categoryResponse);
      if (categoryResponse.length === 1) {
        const subCategoryResponse: Category[] =
          await categoryService.getCategoryByParent(id);
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
   * Debounced function to update price filters
   * Waits 800ms after user stops typing before calling API
   */
  const debouncedUpdatePriceFilters = useCallback(
    (priceFrom: string, priceTo: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setFilters(prev => ({
          ...prev,
          priceFrom,
          priceTo,
          currentPage: 0, // Reset to first page when changing filters
        }));
      }, 800); // Delay 800ms
    },
    []
  );

  /**
   * Handles price input changes with debounce
   */
  const handlePriceInputChange = useCallback(
    (field: "priceFrom" | "priceTo", value: string) => {
      // Immediately update UI state
      setPriceInputs(prev => ({
        ...prev,
        [field]: value,
      }));

      // Call debounced update for filters
      const newPriceFrom =
        field === "priceFrom" ? value : priceInputs.priceFrom;
      const newPriceTo = field === "priceTo" ? value : priceInputs.priceTo;
      debouncedUpdatePriceFilters(newPriceFrom, newPriceTo);
    },
    [priceInputs, debouncedUpdatePriceFilters]
  );

  /**
   * Fetches product data with filters
   */
  const fetchProductData = async (
    categoryParentId: number,
    categoryChildId?: number
  ) => {
    if (!categoryId) return;

    setLoading(true);
    try {
      // Standardize payload according to service interface
      const payload = {
        categoryParentId,
        categoryChildId,
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        popular: !!filters.popular,
        latest: !!filters.latest,
        bestSell: !!filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
      };

      const response = await productService.getProductsByCategoryId(payload);

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
    if (categoryId) {
      fetchCategoryData(categoryId);
    }
  }, [categoryId, fetchCategoryData]);

  // Effect to fetch product data when categoryId or filters change
  useEffect(() => {
    if (categoryId && categories.length === 1) {
      fetchProductData(Number(categoryId));
    } else if (categories.length === 2) {
      fetchProductData(Number(categories[0].id), Number(categories[1].id));
    }
  }, [categoryId, categories, filters]);

  // Sync priceInputs with initial filters
  useEffect(() => {
    setPriceInputs({
      priceFrom: filters.priceFrom,
      priceTo: filters.priceTo,
    });
  }, [filters.priceFrom, filters.priceTo]);

  // Cleanup debounce timer when component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const breadcrumbItems = useMemo(() => {
    if (categories.length === 1) {
      return [
        { label: "Home", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].id}` },
      ];
    } else if (categories.length === 2) {
      return [
        { label: "Home", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].id}` },
        { label: categories[1].name, to: `/category/${categories[1].id}` },
      ];
    } else {
      return [{ label: "Home", to: "/" }, { label: "Category" }];
    }
  }, [categoryId, categories]);

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
                    linkTo={`/category/${subcategory.id}`}
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 rounded-lg">
              {/* Subcategories Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Product Type</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {/* Additional Filters - Popular, Latest, Best Sell */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={filters.popular}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          popular: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="popular"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Popular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="latest"
                      checked={filters.latest}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          latest: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="latest"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Latest
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bestSell"
                      checked={filters.bestSell}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          bestSell: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="bestSell"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Best Selling
                    </Label>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Price Range (VND)</Label>
                <div className="space-y-2">
                  <InputNumber
                    value={Number(priceInputs.priceFrom)}
                    onChange={value =>
                      handlePriceInputChange("priceFrom", value.toString())
                    }
                  />
                  <InputNumber
                    value={Number(priceInputs.priceTo)}
                    onChange={value =>
                      handlePriceInputChange("priceTo", value.toString())
                    }
                  />
                </div>
              </div>

              {/* Sort by Price */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sort by Price</Label>
                <Select
                  value={filters.price}
                  onValueChange={value => {
                    setFilters(prev => ({
                      ...prev,
                      price: value,
                      currentPage: 0,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Price: Low to High</SelectItem>
                    <SelectItem value="desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products per page */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Display</Label>
                <Select
                  value={filters.pageSize.toString()}
                  onValueChange={value =>
                    setFilters(prev => ({
                      ...prev,
                      pageSize: Number(value),
                      currentPage: 0,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 products</SelectItem>
                    <SelectItem value="20">20 products</SelectItem>
                    <SelectItem value="40">40 products</SelectItem>
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

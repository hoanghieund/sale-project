import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Category, Product, Shop } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByShopId } from "./services/shopServices";
// Import Breadcrumb from shadcn to replace manual breadcrumb
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import InputNumber from "@/components/common/InputNumber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Star } from "lucide-react";
// Tabs removed as no longer in use

interface shopUi extends Shop {
  star?: number;
}

/**
 * ShopPage - Shop Information Display Page
 * Displays shop information and a list of shop products
 */
const ShopPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<shopUi>({} as shopUi);
  console.log("🚀 ~ ShopPage ~ shop:", shop);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State for the new filtering system
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 20,
    listIdChild: [] as number[],
    popular: false,
    latest: false,
    bestSell: false,
    price: "",
    priceFrom: "",
    priceTo: "",
  });

  // Separate state for price inputs to debounce
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
          currentPage: 0, // Reset to first page when filters change
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

  // Function to fetch data with filters
  const fetchShopData = async () => {
    setLoading(true);
    try {
      // Normalize payload according to service interface:
      // - 'price' must be a string (e.g., '', 'asc', 'desc'), not a boolean.
      // - 'priceFrom'/'priceTo' allow string | number, keep as is.
      // - listIdChild ensures it's number[].
      const payload = {
        id: Number(shopId),
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        listIdChild: (filters.listIdChild || []).map(v => Number(v)),
        popular: !!filters.popular,
        latest: !!filters.latest,
        bestSell: !!filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
      };

      const response = await getProductsByShopId(payload);

      const products = response.productDTOPage?.content || [];
      const categories = response.categoryDtoList || [];
      const shop = {
        ...response.shop,
        star: response.shopRating || 0,
        totalQuantity: response?.productDTOPage?.totalElements || 0,
      };

      setProducts(products);
      setShop(shop);
      setCategories(categories);

      // Update pagination information
      setTotalPages(response.productDTOPage?.totalPages || 0);
      setTotalElements(response.productDTOPage?.totalElements || 0);
    } catch (error) {
      console.error("Error loading shop data:", error);
      setShop(null);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when shopId or filters change
  useEffect(() => {
    if (shopId) {
      fetchShopData();
    }
  }, [shopId, filters]);

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

  if (!shop) {
    return <EmptyStateDisplay />;
  }

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbNav
        items={[
          { label: "Home", to: "/" },
          { label: "Shop" },
          { label: shop.name },
        ]}
      />
      {/* Shop Banner */}
      {/* Dynamic shop banner based on shop.banner; fallbacks to placeholder if missing */}
      <div
        className="relative h-80 bg-primary"
        style={{
          // Use cover background to display full width, maintain aspect ratio
          backgroundImage: `url(${shop?.banner?.trim()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay to ensure good contrast for content above */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Shop Info (refactored to Shadcn UI Card) */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Using Card to ensure UI consistency and accessibility */}
        <Card className="mb-8 shadow-lg bg-white">
          {/*
            Optimized CardHeader layout:
            - Main axis: Avatar | Shop information (name + short description + stats) | Actions
            - Using grid for stats area for balance and prominence
            - Using colors/spacing from design-system: text-xl/lg, gap-4/6, rounded-lg, bg-muted, shadow-sm
          */}
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Shop Avatar */}
              <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-white shadow-lg rounded-full">
                {/* Defensive src/alt */}
                <AvatarImage
                  src={shop?.avatar?.trim() || ""}
                  alt={shop?.name || "Shop"}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {shop?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Central content block: Name + description + metrics */}
              <div className="flex-1 w-full">
                {/* Shop Name */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl md:text-3xl leading-none tracking-wide">
                    {shop?.name}
                  </CardTitle>
                  {/* Actions placed on the same line in wide viewports to save vertical space */}
                  <div className="hidden lg:flex items-center gap-2">
                    <Button variant="outline" className="h-9">
                      Chat now
                    </Button>
                  </div>
                </div>

                {/* Metrics area: highlighted, easy to scan */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {/* Average Rating */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Rating
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <span className="text-base font-medium">
                          {shop.star || 0}
                        </span>
                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Total products */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Products
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-primary leading-none">
                      {shop?.totalQuantity}
                    </div>
                  </div>

                  {/* Listing Date */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Product Listing Date
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-primary leading-none">
                      {shop?.timeRequest}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right action group - displayed at the bottom on mobile */}
              <div className="flex lg:hidden w-full">
                <Button variant="outline" className="w-full">
                  Chat now
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* CATEGORY + PRODUCT AREA (Tabs system removed) */}
        <Card className="mb-8 border border-border rounded-xl shadow-sm bg-white">
          {/* Suggested shop categories: derived from products[0]?.categoryDto and expanded into unique categories */}
          <CardHeader className="pb-2">
            {/* Title and filters */}
            <div className="space-y-4">
              <div>
                <CardTitle className="text-xl">Shop Products</CardTitle>
                <CardDescription>
                  Search and filter products according to your needs
                </CardDescription>
              </div>

              {/* Category strip displayed above the product grid */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-foreground">
                  Related Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/*
                    Clearly display Category vs Subcategory:
                    - With parent: display "Category" badge for parent and "Sub" badge for current, separated by "›"
                    - Without parent: display "Category" badge for itself
                    Maintain style according to design-system, use colors from shadcn: badge outline + text-muted-foreground for easy differentiation.
                  */}
                  {categories.length > 0 ? (
                    categories?.map((cat: Category) => {
                      if (cat?.parent) {
                        // With parent: display Category (parent) › Subcategory (current) pair
                        return (
                          <div
                            key={`${cat.parent.id}-${cat.id}`}
                            className="flex flex-wrap items-center gap-2 rounded-md border border-gray-100 p-2"
                          >
                            {/* Badge & link for Category (parent) */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                                Category
                              </span>
                              <Button variant="outline" asChild className="h-8">
                                <Link
                                  to={`/category/${cat.parent.id}`}
                                  className="text-sm"
                                >
                                  {cat.parent.name}
                                </Link>
                              </Button>
                            </div>

                            {/* Visual separator character */}
                            <span className="text-muted-foreground">›</span>

                            {/* Badge & link for Subcategory (current) */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                                Sub
                              </span>
                              <Button variant="outline" asChild className="h-8">
                                <Link
                                  to={`/category/${cat.id}`}
                                  className="text-sm"
                                >
                                  {cat.name}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        );
                      }

                      // Without parent: it is the Category itself
                      return (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 rounded-md border border-gray-100 p-2"
                        >
                          <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                            Category
                          </span>
                          <Button variant="outline" asChild className="h-8">
                            <Link
                              to={`/category/${cat.id}`}
                              className="text-sm"
                            >
                              {cat.name}
                            </Link>
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No categories yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="mx-6" />

          <CardContent className="pt-6 space-y-6">
            {/* Product filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filter by special type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Product Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={filters.popular}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          popular: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="popular" className="text-sm">
                      Popular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="latest"
                      checked={filters.latest}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          latest: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="latest" className="text-sm">
                      Latest
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bestSell"
                      checked={filters.bestSell}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          bestSell: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="bestSell" className="text-sm">
                      Best Selling
                    </Label>
                  </div>
                </div>
              </div>

              {/* Filter by price range */}
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

              {/* Sort by price (boolean): false = descending, true = ascending */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sort by Price</Label>
                <Select
                  value={String(filters.price)} // "true" | "false"
                  onValueChange={value => {
                    const mapped = value === "true";
                    setFilters(prev => ({
                      ...prev,
                      price: mapped ? "true" : "false",
                      currentPage: 0, // reset pagination when sorting changes
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Price: Low to High</SelectItem>
                    <SelectItem value="false">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products per page */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Show</Label>
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

            {/* Result Information */}
            <div className="text-sm text-muted-foreground">
              Displaying {products.length} of {totalElements} products
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {products.map(product => (
                    <ProductCardSimple
                      key={product.id}
                      product={product}
                      showWishlist={true}
                      showQuickView={false}
                      simple={true}
                    />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <CustomPagination
                      currentPage={filters.currentPage + 1} // API uses base-0, UI uses base-1
                      totalPages={totalPages}
                      onPageChange={page => {
                        setFilters(prev => ({
                          ...prev,
                          currentPage: page - 1,
                        })); // Convert to base-0 for API
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

export default ShopPage;

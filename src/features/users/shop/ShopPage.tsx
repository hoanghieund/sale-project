import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Category, Product, Shop } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByShopId } from "./services/shopServices";
// Import Breadcrumb from shadcn to replace manual breadcrumb
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    pageSize: 12,
    listIdChild: [] as number[],
    popular: false,
    latest: false,
    bestSell: false,
    price: true,
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

      const products = response?.content || [];
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
        <Card className="mb-8 shadow-sm bg-white">
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
                    <div className="text-xs text-muted-foreground">Rating</div>
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

        {/* LAYOUT CHÍNH: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* SIDEBAR BÊN TRÁI - BỘ LỌC */}
          <div className="w-full lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold">Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1">
              {/* Categories */}
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer lg:border-r-2">
                <p className="text-sm">All</p>
              </div>
              {categories.length > 0 &&
                categories.map((cat: Category) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer lg:border-r-2"
                  >
                    <p className="text-sm">{cat.name}</p>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {cat.totalProduct || 0}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>

          {/* CONTENT BÊN PHẢI */}
          <div className="flex-1">
            {/* Header với sort và view options */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <h2 className="text-2xl font-bold">Featured items</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort:</span>
                    <Select
                      value={String(!!filters.price)}
                      onValueChange={value => {
                        setFilters(prev => ({
                          ...prev,
                          price: value === "true",
                          currentPage: 0,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-[120px] sm:w-32">
                        <SelectValue placeholder="Custom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Low to High</SelectItem>
                        <SelectItem value="false">High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Result Information */}
              <div className="text-sm text-muted-foreground mb-4">
                Displaying {products.length} of {totalElements} products
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                      currentPage={filters.currentPage + 1}
                      totalPages={totalPages}
                      onPageChange={page => {
                        setFilters(prev => ({
                          ...prev,
                          currentPage: page - 1,
                        }));
                      }}
                      className="justify-center"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

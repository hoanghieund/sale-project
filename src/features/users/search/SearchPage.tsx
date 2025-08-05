import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import InputNumber from "@/components/common/InputNumber";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Product } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productService } from "./services/productServices";

/**
 * SearchPage - Product Search Results Page
 * Displays a list of products with filters and pagination based on search keywords
 */
const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the new filter system
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

  // Separate state for price inputs for debouncing
  const [priceInputs, setPriceInputs] = useState({
    priceFrom: "",
    priceTo: "",
  });

  // Timer reference for debounce
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [keyword, setKeyword] = useState("");

  /**
   * @function fetchProducts
   * @description Fetches the list of products based on filters and keyword.
   * Updates the loading, products, totalPages, and error states.
   */
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // API call to fetch products based on filters and keyword
      const response = await productService.getProductsBySearchKeyword({
        keyword: keyword,
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        popular: filters.popular,
        latest: filters.latest,
        bestSell: filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom ? Number(filters.priceFrom) : undefined,
        priceTo: filters.priceTo ? Number(filters.priceTo) : undefined,
      });
      setProducts(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      setError("Could not load products. Please try again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

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
   *
   * Immediately updates the UI state
   * Calls the debounced update for filters
   */
  const handlePriceInputChange = useCallback(
    (field: "priceFrom" | "priceTo", value: string) => {
      // Immediately updates the UI state
      setPriceInputs(prev => ({
        ...prev,
        [field]: value,
      }));

      // Calls the debounced update for filters
      if (field === "priceFrom") {
        debouncedUpdatePriceFilters(value, priceInputs.priceTo);
      } else {
        debouncedUpdatePriceFilters(priceInputs.priceFrom, value);
      }
    },
    [debouncedUpdatePriceFilters, priceInputs.priceFrom, priceInputs.priceTo]
  );

  // Effect to update keyword from URL when component mounts or URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchKeyword = queryParams.get("keyword") || "";
    setKeyword(searchKeyword);

    // Reset filters when keyword changes
    setFilters(prev => ({
      ...prev,
      currentPage: 0,
    }));

    // Sync priceInputs with filters
    setPriceInputs({
      priceFrom: "",
      priceTo: "",
    });
  }, [location.search]);

  // Effect to call API when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, keyword]);

  // Cleanup effect to clear debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Results Section */}
        <div className="w-full">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Search Results for: "{keyword}"</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Product Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Filter by product type */}
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
                  <Label className="text-sm font-medium">
                    Price Range (VND)
                  </Label>
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
                      <SelectItem value="true">Price Ascending</SelectItem>
                      <SelectItem value="false">Price Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of products per page */}
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

              <Separator />

              {/* Result Information */}
              <div className="text-sm text-muted-foreground mb-4">
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
                        <EmptyStateDisplay />
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
    </div>
  );
};

export default SearchPage;

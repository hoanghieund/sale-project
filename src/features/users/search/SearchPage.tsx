import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productService } from "./services/productServices";

/**
 * SearchPage - Product Search Results Page
 * Displays a list of products with filters and pagination based on search keywords
 */
const SearchPage: React.FC = () => {
  const location = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for the new filter system
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 10,
  });

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
    try {
      // API call to fetch products based on filters and keyword
      const response = await productService.getProductsBySearchKeyword({
        keyword: keyword,
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
      });
      setProducts(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

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
  }, [location.search]);

  // Effect to call API when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, keyword]);

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

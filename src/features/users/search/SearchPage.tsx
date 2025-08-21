import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { parseAsIndex, parseAsString, useQueryState } from "nuqs"; // Đồng bộ q & page với URL
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Đọc query để nhận biết legacy params và page
import { productService } from "./services/productServices";

/**
 * SearchPage - Product Search Results Page
 * Displays a list of products with filters and pagination based on search keywords
 */
const SearchPage: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination: pageIndex base-0 từ URL (?page= base-1 hiển thị)
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsIndex.withDefault(0)
  );
  const [pageSize] = useState(12); // Có thể nâng cấp đồng bộ qua URL nếu cần

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  // Từ khóa tìm kiếm đọc/ghi từ URL (?q=)
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));

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
        keyword: q,
        currentPage: pageIndex,
        pageSize,
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

  // Reset về trang đầu khi q thay đổi, TRỪ khi URL đã có tham số page (giữ page theo link chia sẻ)
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const hasPage = sp.has("page");
    if (!hasPage) {
      setPageIndex(0);
    }
  }, [q, location.search]);

  // Effect to call API when filters change
  useEffect(() => {
    fetchProducts();
  }, [pageIndex, pageSize, q]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Results Section */}
        <div className="w-full">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Search Results for: {q || "all"}</CardTitle>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
    </div>
  );
};

export default SearchPage;

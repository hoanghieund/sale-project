import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productService } from "./services/productServices";

/**
 * @component SearchPage
 * @description Trang hiển thị danh sách sản phẩm và phân trang.
 * Trang này được tinh gọn để chỉ tập trung vào việc hiển thị sản phẩm.
 */
const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * @function fetchProducts
   * @description Lấy danh sách sản phẩm dựa trên trang hiện tại.
   * Cập nhật trạng thái loading, products, totalPages và error.
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // API call to fetch all products or products based on current page
      const response = await productService.getProductsBySearchKeyword({
        keyword: "", // Không sử dụng từ khóa tìm kiếm
        currentPage: currentPage - 1, // API sử dụng chỉ mục 0-based
        pageSize: 12, // Số lượng sản phẩm trên mỗi trang
      });
      setProducts(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Không thể tải sản phẩm. Vui lòng thử lại.");
      console.error("Lỗi khi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function handlePageChange
   * @description Xử lý khi người dùng chuyển trang.
   * Cập nhật URL với trang mới.
   * @param page - Trang mới được chọn.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/search?page=${page}`);
  };

  // Effect để cập nhật currentPage từ URL khi component mount hoặc URL thay đổi
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [location.search]);

  // Effect để gọi API khi currentPage thay đổi
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Results Section */}
        <div className="w-full">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <EmptyStateDisplay />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCardSimple key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Section */}
              <div className="mt-8 flex justify-center">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <EmptyStateDisplay />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

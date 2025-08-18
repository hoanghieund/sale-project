import { productService } from "@/features/users/home/services/productService";
import { Product } from "@/types";
import { parseAsIndex, useQueryState } from "nuqs"; // Đồng bộ page với URL
import { useEffect, useState } from "react";
import { AllProductsSection } from "./components/AllProductsSection"; // Import AllProductsSection
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import HeroSection from "./components/HeroSection";

/**
 * Index - Trang chủ C2C Marketplace
 * Hiển thị hero section, categories và subcategories nổi bật
 */
const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // State cho tất cả sản phẩm
  // Page đồng bộ URL: dùng base-0 trong code, base-1 hiển thị
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsIndex.withDefault(0)
  );
  const [totalPages, setTotalPages] = useState<number>(1); // State cho tổng số trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredProductsResponse, allProductsResponse] =
          await Promise.allSettled([
            productService.getFeaturedProducts(),
            // API nhận base-0: truyền trực tiếp pageIndex
            productService.getAllProductsWithPagination(pageIndex, 25), // Lấy tất cả sản phẩm với phân trang
          ]);
        if (featuredProductsResponse.status === "fulfilled") {
          setFeaturedProducts(featuredProductsResponse.value);
        }
        if (allProductsResponse.status === "fulfilled") {
          setAllProducts(allProductsResponse.value.content);
          setTotalPages(allProductsResponse.value.totalPages); // Tính toán tổng số trang
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, [pageIndex]); // Gọi lại khi pageIndex thay đổi

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    // UI base-1 -> URL/base-0
    setPageIndex(page - 1);
  };

  return (
    <div>
      <HeroSection />

      <FeaturedProductsSection products={featuredProducts ?? []} />

      <AllProductsSection
        products={allProducts ?? []}
        // UI cần base-1
        currentPage={pageIndex + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Index;

import { productService } from "@/features/users/home/services/productService";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { AllProductsSection } from "./components/AllProductsSection"; // Import AllProductsSection
import CallToActionSection from "./components/CallToActionSection";
import DiscountedProductsSection from "./components/DiscountedProductsSection"; // Import DiscountedProductsSection
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";

/**
 * Index - Trang chủ C2C Marketplace
 * Hiển thị hero section, categories và subcategories nổi bật
 */
const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]); // Thêm state cho sản phẩm giảm giá
  const [allProducts, setAllProducts] = useState<Product[]>([]); // State cho tất cả sản phẩm
  const [currentPage, setCurrentPage] = useState<number>(1); // State cho trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State cho tổng số trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          featuredProductsResponse,
          discountedProductsResponse,
          allProductsResponse,
        ] = await Promise.allSettled([
          productService.getFeaturedProducts(),
          productService.getDiscountedProducts(), // Gọi service để lấy sản phẩm giảm giá
          productService.getAllProductsWithPagination(currentPage - 1, 40), // Lấy tất cả sản phẩm với phân trang
        ]);
        if (featuredProductsResponse.status === "fulfilled") {
          setFeaturedProducts(featuredProductsResponse.value);
        }
        if (discountedProductsResponse.status === "fulfilled") {
          // Cập nhật state discountedProducts
          setDiscountedProducts(discountedProductsResponse.value);
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
  }, [currentPage]); // Thêm currentPage vào dependency array để gọi lại khi trang thay đổi

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeroSection />

      <FeaturedProductsSection products={featuredProducts} />

      <DiscountedProductsSection products={discountedProducts} />

      <AllProductsSection
        products={allProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CallToActionSection />

      <StatsSection />
    </>
  );
};

export default Index;

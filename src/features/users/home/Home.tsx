import { productService } from "@/features/users/home/services/productService";
import { categoryService } from "@/services/categoryService";
import { Category, Product } from "@/types";
import { parseAsIndex, useQueryState } from "nuqs"; // Đồng bộ page với URL
import { useEffect, useState } from "react";
import { AllProductsSection } from "./components/AllProductsSection"; // Import AllProductsSection
import CategorySection from "./components/CategorySection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import FeaturedShopSection from "./components/FeaturedShopSection";
import HeroSection from "./components/HeroSection";

/**
 * Index - Trang chủ C2C Marketplace
 * Hiển thị hero section, categories và subcategories nổi bật
 */
const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // State cho tất cả sản phẩm
  const [categories, setCategories] = useState<Category[]>([]); // State cho tất cả danh mục
  // Page đồng bộ URL: dùng base-0 trong code, base-1 hiển thị
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsIndex.withDefault(0)
  );
  const [totalPages, setTotalPages] = useState<number>(1); // State cho tổng số trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          featuredProductsResponse,
          allProductsResponse,
          categoriesResponse,
        ] = await Promise.allSettled([
          productService.getFeaturedProducts(),
          // API nhận base-0: truyền trực tiếp pageIndex
          productService.getAllProductsWithPagination(pageIndex, 24), // Lấy tất cả sản phẩm với phân trang
          categoryService.getAllCategory(0, 10000),
        ]);
        if (featuredProductsResponse.status === "fulfilled") {
          setFeaturedProducts(featuredProductsResponse.value);
        }
        if (allProductsResponse.status === "fulfilled") {
          setAllProducts(allProductsResponse.value.content);
          setTotalPages(allProductsResponse.value.totalPages); // Tính toán tổng số trang
        }
        if (categoriesResponse.status === "fulfilled") {
          // Tạo mảng mới chứa cả danh mục cha và con
          let allCategories: Category[] = [];

          // Xử lý dữ liệu để lấy cả danh mục cha và con
          categoriesResponse.value.forEach((category: Category) => {
            // Thêm danh mục cha vào mảng
            allCategories.push(category);

            // Nếu có danh mục con, thêm vào mảng
            if (category.child && Array.isArray(category.child)) {
              allCategories = [...allCategories, ...category.child];
            }
          });

          // Cập nhật state với mảng chứa cả danh mục cha và con
          setCategories(allCategories);
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

      <CategorySection categories={categories ?? []} />

      <FeaturedProductsSection products={featuredProducts ?? []} />

      <FeaturedShopSection />

      <AllProductsSection
        products={allProducts ?? []}
        // UI cần base-1
        currentPage={pageIndex + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* <StatsSection /> */}
    </div>
  );
};

export default Index;

import { productService } from "@/features/users/home/services/productService";
import { categoryService } from "@/services/categoryService";
import { Category, Product } from "@/types";
import { useEffect, useState } from "react";
import CallToActionSection from "./components/CallToActionSection";
import CategoriesSection from "./components/CategoriesSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import FeaturedSubcategoriesSection from "./components/FeaturedSubcategoriesSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";

/**
 * Index - Trang chủ C2C Marketplace
 * Hiển thị hero section, categories và subcategories nổi bật
 */
const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredSubcategories, setFeaturedSubcategories] = useState<
    Category[]
  >([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, featuredSubcategoriesResponse, featuredProductsResponse] = await Promise.allSettled([
          categoryService.getCategories(0, 10),
          categoryService.getCategoryTree(0, 10),
          productService.getFeaturedProducts(),
        ]);
        if (categoriesResponse.status === "fulfilled") {
          setCategories(categoriesResponse.value.content);
        }
        if (featuredSubcategoriesResponse.status === "fulfilled") {
          setFeaturedSubcategories(featuredSubcategoriesResponse.value);
        }
        if (featuredProductsResponse.status === "fulfilled") {
          setFeaturedProducts(featuredProductsResponse.value);
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <HeroSection />

      <CategoriesSection categories={categories} />

      <FeaturedSubcategoriesSection subcategories={featuredSubcategories} />

      <FeaturedProductsSection products={featuredProducts} />

      <CallToActionSection />

      <StatsSection />
    </>
  );
};

export default Index;

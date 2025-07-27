import { useUser } from "@/hooks/use-user";
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
  const user = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredSubcategories, setFeaturedSubcategories] = useState<
    Category[]
  >([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch categories and subcategories from API
    // Tạm thời sử dụng mock data
    const mockCategories: Category[] = [
      {
        id: 1,
        name: "Thời trang",
        icon: "👕",
        active: true,
        isShowSuggests: true,
        totalProduct: 1250,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 2,
        name: "Điện tử",
        icon: "📱",
        active: true,
        isShowSuggests: true,
        totalProduct: 890,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 3,
        name: "Nhà cửa & Đời sống",
        icon: "🏠",
        active: true,
        isShowSuggests: true,
        totalProduct: 650,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 4,
        name: "Thể thao & Du lịch",
        icon: "⚽",
        active: true,
        isShowSuggests: true,
        totalProduct: 420,
        createBy: "system",
        createDate: new Date(),
      },
    ];

    const mockSubcategories: Category[] = [
      {
        id: 5,
        name: "Áo nam",
        icon: "👕",
        active: true,
        isShowSuggests: true,
        totalProduct: 350,
        parentId: 1, // Danh mục cha là "Thời trang"
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 6,
        name: "Áo nữ",
        icon: "👗",
        active: true,
        isShowSuggests: true,
        totalProduct: 420,
        parentId: 1, // Danh mục cha là "Thời trang"
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 7,
        name: "Điện thoại",
        icon: "📱",
        active: true,
        isShowSuggests: true,
        totalProduct: 280,
        parentId: 2, // Danh mục cha là "Điện tử"
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 8,
        name: "Laptop",
        icon: "💻",
        active: true,
        isShowSuggests: true,
        totalProduct: 190,
        parentId: 2, // Danh mục cha là "Điện tử"
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 9,
        name: "Nội thất",
        icon: "🛋",
        active: true,
        isShowSuggests: true,
        totalProduct: 320,
        parentId: 3, // Danh mục cha là "Nhà cửa & Đời sống"
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 10,
        name: "Dụng cụ thể thao",
        icon: "⚽",
        active: true,
        isShowSuggests: true,
        totalProduct: 180,
        parentId: 4, // Danh mục cha là "Thể thao & Du lịch"
        createBy: "system",
        createDate: new Date(),
      },
    ];

    // Mock data cho sản phẩm nổi bật
    const mockFeaturedProducts: Product[] = [
      {
        id: 101,
        title: "Áo thun nam cổ tròn",
        content: "Áo thun nam cổ tròn chất liệu cotton 100%",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.5,
        totalProductSold: 120,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        discount: { id: 1, percent: 10, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 102,
        title: "Quần jean nam slim fit",
        content: "Quần jean nam slim fit màu xanh đậm",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.8,
        totalProductSold: 85,
        isNew: false,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 2, percent: 15, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 2,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 103,
        title: "Áo sơ mi nữ công sở",
        content: "Áo sơ mi nữ công sở chất liệu lụa cao cấp",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.6,
        totalProductSold: 95,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 6,
        shopId: 3,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 104,
        title: "Váy liền thân dự tiệc",
        content: "Váy liền thân dự tiệc màu đen sang trọng",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.9,
        totalProductSold: 65,
        isNew: true,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 3, percent: 20, status: true, createDate: new Date() },
        categoriesId: 6,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 105,
        title: "Điện thoại Samsung Galaxy S23",
        content: "Điện thoại Samsung Galaxy S23 Ultra 256GB",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.7,
        totalProductSold: 45,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        discount: { id: 4, percent: 5, status: true, createDate: new Date() },
        categoriesId: 7,
        shopId: 4,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 106,
        title: "Laptop Dell XPS 13",
        content: "Laptop Dell XPS 13 Intel Core i7 Gen 12",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.8,
        totalProductSold: 30,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 8,
        shopId: 5,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 107,
        title: "Ghế sofa phòng khách",
        content: "Ghế sofa phòng khách chất liệu da cao cấp",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.5,
        totalProductSold: 15,
        isNew: false,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 1, percent: 10, status: true, createDate: new Date() },
        categoriesId: 9,
        shopId: 6,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 108,
        title: "Bộ dụng cụ tập gym tại nhà",
        content: "Bộ dụng cụ tập gym tại nhà đa năng",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.4,
        totalProductSold: 50,
        isNew: false,
        isFlashSale: false,
        isTrending: true,
        discount: { id: 2, percent: 15, status: true, createDate: new Date() },
        categoriesId: 10,
        shopId: 7,
        createBy: "system",
        createDate: new Date(),
      },
    ];

    setCategories(mockCategories);
    setFeaturedSubcategories(mockSubcategories);
    setFeaturedProducts(mockFeaturedProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

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

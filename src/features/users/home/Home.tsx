import { useUser } from "@/hooks/use-user";
import { Category, Subcategory } from "@/types";
import { useEffect, useState } from "react";
import CallToActionSection from "./components/CallToActionSection";
import CategoriesSection from "./components/CategoriesSection";
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
  const [featuredSubcategories, setFeaturedSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch categories and subcategories from API
    // Tạm thời sử dụng mock data
    const mockCategories: Category[] = [
      {
        id: "1",
        name: "Thời trang",
        slug: "thoi-trang",
        description: "Thời trang nam nữ đa dạng",
        image: "/images/category-fashion.jpg",
        icon: "👕",
        subcategoryIds: ["1", "2", "3"],
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 1250
      },
      {
        id: "2",
        name: "Điện tử",
        slug: "dien-tu",
        description: "Thiết bị điện tử, công nghệ",
        image: "/images/category-electronics.jpg",
        icon: "📱",
        subcategoryIds: ["4", "5", "6"],
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 890
      },
      {
        id: "3",
        name: "Nhà cửa & Đời sống",
        slug: "nha-cua-doi-song",
        description: "Nội thất, trang trí nhà",
        image: "/images/category-home.jpg",
        icon: "🏠",
        subcategoryIds: ["7", "8", "9"],
        featured: true,
        isActive: true,
        sortOrder: 3,
        productCount: 650
      },
      {
        id: "4",
        name: "Thể thao & Du lịch",
        slug: "the-thao-du-lich",
        description: "Dụng cụ thể thao, đồ du lịch",
        image: "/images/category-sports.jpg",
        icon: "⚽",
        subcategoryIds: ["10", "11"],
        featured: true,
        isActive: true,
        sortOrder: 4,
        productCount: 420
      }
    ];

    const mockSubcategories: Subcategory[] = [
      {
        id: "1",
        name: "Áo nam",
        slug: "ao-nam",
        description: "Áo sơ mi, áo thun nam",
        image: "/images/subcategory-men-shirts.jpg",
        categoryId: "1",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 350
      },
      {
        id: "2",
        name: "Áo nữ",
        slug: "ao-nu",
        description: "Áo sơ mi, áo thun nữ",
        image: "/images/subcategory-women-shirts.jpg",
        categoryId: "1",
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 420
      },
      {
        id: "4",
        name: "Điện thoại",
        slug: "dien-thoai",
        description: "Smartphone, điện thoại di động",
        image: "/images/subcategory-phones.jpg",
        categoryId: "2",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 280
      },
      {
        id: "5",
        name: "Laptop",
        slug: "laptop",
        description: "Laptop, máy tính xách tay",
        image: "/images/subcategory-laptops.jpg",
        categoryId: "2",
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 190
      },
      {
        id: "7",
        name: "Nội thất",
        slug: "noi-that",
        description: "Bàn, ghế, tủ, giường",
        image: "/images/subcategory-furniture.jpg",
        categoryId: "3",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 320
      },
      {
        id: "10",
        name: "Dụng cụ thể thao",
        slug: "dung-cu-the-thao",
        description: "Bóng đá, bóng rổ, tennis",
        image: "/images/subcategory-sports.jpg",
        categoryId: "4",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 180
      }
    ];

    setCategories(mockCategories);
    setFeaturedSubcategories(mockSubcategories);
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
    <div className="bg-background">
      <HeroSection />

      <CategoriesSection categories={categories} />

      <FeaturedSubcategoriesSection subcategories={featuredSubcategories} />

      <CallToActionSection />

      <StatsSection />
    </div>
  );
};

export default Index;

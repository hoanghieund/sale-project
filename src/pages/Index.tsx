import HeroSection from "@/components/HeroSection";
import LatestGreatest from "@/components/LatestGreatest";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductGrid from "@/components/product/ProductGrid";
import ShopBySports from "@/components/ShopBySports";
import TopFootwearSelects from "@/components/TopFootwearSelects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductGrid />
      <LatestGreatest />
      <TopFootwearSelects />
      <ShopBySports />
      <Footer />
    </div>
  );
};

export default Index;

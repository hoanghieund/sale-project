import HeroSection from "@/components/HeroSection";
import LatestGreatest from "@/components/LatestGreatest";
import ProductGrid from "@/components/product/ProductGrid";
import ShopBySports from "@/components/ShopBySports";
import TopFootwearSelects from "@/components/TopFootwearSelects";
import { useUser } from "@/hooks/use-user";

const Index = () => {
  const user = useUser();
  console.log("🚀 ~ Index ~ user:", user);
  return (
    <div className="bg-background">
      <HeroSection />
      <ProductGrid />
      <LatestGreatest />
      <TopFootwearSelects />
      <ShopBySports />
    </div>
  );
};

export default Index;

import ShopCard from "@/components/common/ShopCard";
import { Shop } from "@/types";
import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";

/**
 * FeaturedShopSection Component
 * Hiển thị danh sách các shop nổi bật trên trang chủ
 */
const FeaturedShopSection = () => {
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedShops = async () => {
      try {
        setLoading(true);
        // Lấy 6 shop nổi bật
        const shops = await shopService.getFeaturedShops(6);
        setFeaturedShops(shops);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách shop nổi bật:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedShops();
  }, []);

  // Hiển thị loading state
  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Shops</h2>
            <p className="text-gray-600">
              Discover trusted sellers and amazing stores on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm animate-pulse"
              >
                <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Nếu không có shop nào
  if (featuredShops.length === 0) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Shops</h2>
            <p className="text-gray-600">
              No featured shops available at the moment
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Shops</h2>
          <p className="text-gray-600">
            Discover trusted sellers and amazing stores on our platform. Quality
            products, excellent service!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredShops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShopSection;

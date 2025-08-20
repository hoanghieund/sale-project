import CategoryCard from "@/components/common/CategoryCard";
import { Category } from "@/types";
import * as React from "react";

// Import AutoPlay từ embla-carousel-react thay vì embla-carousel-autoplay
import useEmblaCarousel from "embla-carousel-react";

/**
 * CategorySection Component
 * Hiển thị danh sách các danh mục sản phẩm trong một carousel một hàng
 * với các nút điều hướng để tối ưu trải nghiệm người dùng
 */
const CategorySection = ({ categories }: { categories: Category[] }) => {
  // Sử dụng useState để theo dõi slide hiện tại
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Sử dụng useEmblaCarousel hook trực tiếp
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  // Thiết lập tự động chuyển slide sau mỗi 2 giây
  React.useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 2000);

    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categories</h2>
          <p className="text-muted-foreground">Find product you need</p>
        </div>

        <div className="relative px-10">
          {" "}
          {/* Thêm padding để chừa chỗ cho nút điều hướng */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="pl-4 min-w-0 shrink-0 grow-0 md:basis-1/2 lg:basis-1/4"
                >
                  <CategoryCard
                    category={category}
                    linkTo={`/category/${category.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

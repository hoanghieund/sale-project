import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ICON_CATEGORIES } from "../data/constants";

const TopFootwearSelects = () => {
  // Sử dụng tất cả các danh mục nhưng hiển thị nhiều hơn 4 danh mục ban đầu
  const categories = ICON_CATEGORIES;
  const sliderRef = useRef<HTMLDivElement>(null);

  // Xử lý điều hướng slider
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Footwear Selects</h2>
            <p className="text-muted-foreground">
              Discover our most popular footwear categories
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group block w-full min-w-[300px] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-16px)] xl:min-w-[calc(25%-16px)] snap-start"
            >
              <div className="relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 h-full">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <Button variant="secondary" size="sm" className="w-full">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFootwearSelects;

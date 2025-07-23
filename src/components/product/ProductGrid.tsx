import { FEATURED_PRODUCTS } from "../../data/mockData";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const ProductGrid = () => {
  // Ref để truy cập container slider
  const sliderRef = useRef<HTMLDivElement>(null);

  // Xử lý điều hướng slider
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Thêm CSS để ẩn thanh cuộn
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Dynamic Air</h2>
            <p className="text-muted-foreground">
              Discover our latest collection of premium athletic footwear
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
          className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURED_PRODUCTS.slice(0, 8).map(product => (
            <div 
              key={product.id} 
              className="min-w-[280px] max-w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

/**
 * RelatedProducts - Component hiển thị danh sách sản phẩm liên quan
 * Sử dụng carousel để hiển thị nhiều sản phẩm với khả năng cuộn ngang
 */
interface RelatedProductsProps {
  products: Product[];
  className?: string;
}

const RelatedProducts = ({
  products,
  className = "",
}: RelatedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hàm cuộn sang trái
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        window.innerWidth < 640
          ? 200
          : window.innerWidth < 768
          ? 220
          : window.innerWidth < 1024
          ? 240
          : 260;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth, // Cuộn responsive theo kích thước card
        behavior: "smooth",
      });
    }
  };

  // Hàm cuộn sang phải
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        window.innerWidth < 640
          ? 200
          : window.innerWidth < 768
          ? 220
          : window.innerWidth < 1024
          ? 240
          : 260;
      scrollContainerRef.current.scrollBy({
        left: cardWidth, // Cuộn responsive theo kích thước card
        behavior: "smooth",
      });
    }
  };

  // Không hiển thị nếu không có sản phẩm liên quan
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 ${className}`}>
      {/* Header với tiêu đề và nút điều hướng */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Related Products</h2>

        {/* Nút điều hướng - chỉ hiển thị khi có nhiều hơn 3 sản phẩm trên mobile, 4 trên desktop */}
        {products.length > 3 && (
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Container cuộn ngang cho danh sách sản phẩm */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:gap-6"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="flex-none w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64" // Kích thước nhỏ hơn để hiển thị nhiều sản phẩm hơn
          >
            <ProductCardSimple product={product} className="h-full" />
          </div>
        ))}
      </div>

      {/* Thông báo khi có ít sản phẩm */}
      {products.length < 4 && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Showing {products.length} related product
          {products.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;

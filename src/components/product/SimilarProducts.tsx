import { useMemo } from "react";
import { Product } from "../../types";
import { MOCK_PRODUCTS } from "../../data/mockData";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimilarProductsProps {
  currentProduct: Product;
  title?: string;
}

/**
 * Component displays similar products based on category, brand, and tags
 * Helps users discover more products related to the one they're viewing
 */
const SimilarProducts = ({ currentProduct, title = "You May Also Like" }: SimilarProductsProps) => {
  // Tìm các sản phẩm tương tự dựa trên danh mục, thương hiệu và tags
  const similarProducts = useMemo(() => {
    // Loại bỏ sản phẩm hiện tại
    const otherProducts = MOCK_PRODUCTS.filter(p => p.id !== currentProduct.id);
    
    // Tính điểm tương đồng cho mỗi sản phẩm
    const scoredProducts = otherProducts.map(product => {
      let score = 0;
      
      // Cùng danh mục
      if (product.category === currentProduct.category) {
        score += 5;
      }
      
      // Cùng danh mục phụ
      if (product.subcategory && product.subcategory === currentProduct.subcategory) {
        score += 3;
      }
      
      // Cùng thương hiệu
      if (product.brand === currentProduct.brand) {
        score += 4;
      }
      
      // Có tags trùng nhau
      const commonTags = product.tags.filter(tag => currentProduct.tags.includes(tag));
      score += commonTags.length * 2;
      
      return { product, score };
    });
    
    // Sắp xếp theo điểm tương đồng giảm dần và lấy 8 sản phẩm đầu tiên
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.product);
  }, [currentProduct]);

  // Nếu không có sản phẩm tương tự, không hiển thị component
  if (similarProducts.length === 0) {
    return null;
  }

  // Xử lý điều hướng carousel
  const scrollLeft = () => {
    const container = document.getElementById('similar-products-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('similar-products-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
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
          id="similar-products-container"
          className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {similarProducts.map(product => (
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

export default SimilarProducts;

// Thêm CSS để ẩn thanh cuộn
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

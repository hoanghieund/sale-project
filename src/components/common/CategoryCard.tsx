import { Card } from "@/components/ui/card";
import { Category } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CategoryCard Component
 * Hiển thị thông tin của một danh mục sản phẩm với giao diện hiện đại, gradient và hiệu ứng hover.
 * @param {Category} category - Đối tượng danh mục.
 * @param {string} linkTo - Đường dẫn khi click vào card. Mặc định là /category/:id.
 */
interface CategoryCardProps {
  category: Category;
  linkTo?: string; // Đường dẫn tùy chỉnh khi click vào card
}

const CategoryCard = ({ category, linkTo }: CategoryCardProps) => {
  return (
    <Link to={linkTo || `/category/${category.id}`} className="group">
      <Card className="relative overflow-hidden bg-transparent border-0 shadow-none hover:shadow-none transition-all duration-300 transform hover:-translate-y-1">
        {/* Content */}
        <div className="relative p-4 pb-0 flex flex-col items-center justify-center min-h-32 space-y-3">
          {/* Icon */}
          <div
            className="aspect-square rounded-full w-24"
            style={{
              backgroundImage: `url('/assets/hero-running.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Category Name */}
          <h3 className="font-semibold text-lg text-center leading-tight group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>

          {/* Arrow Icon */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;

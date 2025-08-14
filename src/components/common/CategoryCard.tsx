import { Card } from "@/components/ui/card";
import { Category } from "@/types";
import { ArrowRight, Tag } from "lucide-react";
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
      <Card className="relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-white to-secondary opacity-60" />

        {/* Content */}
        <div className="relative p-6 flex flex-col items-center justify-center min-h-32 space-y-3">
          {/* Icon */}
          <div className="p-3 rounded-full bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <Tag className="h-6 w-6 text-primary" />
          </div>

          {/* Category Name */}
          <h3 className="font-semibold text-lg text-center leading-tight group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>

          {/* Arrow Icon */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </Link>
  );
};

export default CategoryCard;

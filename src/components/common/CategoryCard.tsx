import { Card } from "@/components/ui/card";
import { Category } from "@/types";
import { Link } from "react-router-dom";

/**
 * CategoryCard Component
 * Hiển thị thông tin của một danh mục sản phẩm với giao diện hiện đại, đơn giản.
 * @param {Category} category - Đối tượng danh mục.
 * @param {string} linkTo - Đường dẫn khi click vào card. Mặc định là /category/:id.
 */
interface CategoryCardProps {
  category: Category;
  linkTo?: string; // Đường dẫn tùy chỉnh khi click vào card
}

const CategoryCard = ({ category, linkTo }: CategoryCardProps) => {
  return (
    <Link to={linkTo || `/category/${category.id}`}>
      <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-4xl mb-4">{category.icon}</div>
        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
        <p className="text-gray-500 text-sm">{category.totalProduct ? category.totalProduct.toLocaleString() : 0} items</p>
      </Card>
    </Link>
  );
};

export default CategoryCard;

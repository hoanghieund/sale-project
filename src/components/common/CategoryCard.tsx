import { Card } from "@/components/ui/card";
import { Category } from "@/types";
import { Link } from "react-router-dom";

/**
 * CategoryCard Component
 * Hiển thị thông tin của một danh mục sản phẩm với giao diện hiện đại, đơn giản.
 * @param {Category} category - Đối tượng danh mục.
 */
interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-4xl mb-4">{category.icon}</div>
        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
        <p className="text-gray-500 text-sm">{category.productCount} items</p>
      </Card>
    </Link>
  );
};

export default CategoryCard;

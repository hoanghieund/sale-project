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
      <Card className="p-4 flex justify-center items-center h-full">
        <h3 className="font-semibold text-lg text-foreground uppercase">
          {category.name}
        </h3>
      </Card>
    </Link>
  );
};

export default CategoryCard;

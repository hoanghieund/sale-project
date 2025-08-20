import { Category } from "@/types";
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
      <div
        key={category.id}
        className="group relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-2">
          <h3 className="text-3xl font-bold text-white">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

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
  // Kiểm tra xem đây là danh mục cha hay con
  const isParentCategory =
    category.parentId === undefined || category.parentId === null;

  return (
    <Link to={linkTo || `/category/${category.id}`} className="group">
      <div
        key={category.id}
        className={`group relative overflow-hidden rounded-lg bg-card shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className={`absolute inset-0 ${
              isParentCategory ? "bg-black/30" : "bg-black/50"
            }`}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <h3
            className={`${
              isParentCategory ? "text-2xl" : "text-xl"
            } font-bold text-white`}
          >
            {category.name}
          </h3>

          {/* Hiển thị nhãn cho danh mục con */}
          {!isParentCategory && (
            <span className="mt-2 px-2 py-1 bg-primary/80 text-white text-xs rounded-full">
              Subcategory
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

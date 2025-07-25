import { Category } from "@/types";
import { Link } from "react-router-dom";

/**
 * CategoryCard Component
 * Hiển thị thông tin của một danh mục sản phẩm.
 * @param {Category} category - Đối tượng danh mục.
 */
interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      key={category.id}
      to={`/category/${category.slug}`}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{category.description}</p>
        <p className="text-sm text-emerald-600 font-medium">
          {category.productCount.toLocaleString()} sản phẩm
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
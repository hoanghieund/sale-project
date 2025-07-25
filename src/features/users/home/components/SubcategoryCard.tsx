import { Subcategory } from "@/types";
import { Link } from "react-router-dom";

/**
 * SubcategoryCard Component
 * Hiển thị thông tin của một danh mục con nổi bật.
 * @param {Subcategory} subcategory - Đối tượng danh mục con.
 */
interface SubcategoryCardProps {
  subcategory: Subcategory;
}

const SubcategoryCard = ({ subcategory }: SubcategoryCardProps) => {
  return (
    <Link
      key={subcategory.id}
      to={`/subcategory/${subcategory.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {subcategory.image ? (
          <img 
            src={subcategory.image} 
            alt={subcategory.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl text-gray-400">📦</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
          {subcategory.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{subcategory.description}</p>
        <p className="text-sm text-emerald-600 font-medium">
          {subcategory.productCount.toLocaleString()} sản phẩm
        </p>
      </div>
    </Link>
  );
};

export default SubcategoryCard;
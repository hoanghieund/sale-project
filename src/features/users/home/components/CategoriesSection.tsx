import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

/**
 * CategoriesSection Component
 * Hiển thị danh sách các danh mục nổi bật.
 * @param {Category[]} categories - Mảng các đối tượng danh mục.
 */
interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Danh mục nổi bật</h2>
          <p className="text-gray-600">Khám phá các danh mục sản phẩm đa dạng</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
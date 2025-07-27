import CategoryCard from "@/components/common/CategoryCard";
import { Category } from "@/types";

/**
 * FeaturedSubcategoriesSection Component
 * Hiển thị danh sách các danh mục con nổi bật.
 * @param {Category[]} subcategories - Mảng các đối tượng danh mục con (Category với parentId).
 */
interface FeaturedSubcategoriesSectionProps {
  subcategories: Category[]; // Sử dụng Category thay vì Subcategory
}

const FeaturedSubcategoriesSection = ({
  subcategories,
}: FeaturedSubcategoriesSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Subcategories</h2>
          <p className="text-gray-600">Most popular shopping categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map(subcategory => (
            <CategoryCard 
              key={subcategory.id} 
              category={subcategory} 
              linkTo={`/subcategory/${subcategory.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSubcategoriesSection;

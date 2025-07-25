import { Subcategory } from "@/types";
import SubcategoryCard from "./SubcategoryCard";

/**
 * FeaturedSubcategoriesSection Component
 * Hiển thị danh sách các danh mục con nổi bật.
 * @param {Subcategory[]} subcategories - Mảng các đối tượng danh mục con.
 */
interface FeaturedSubcategoriesSectionProps {
  subcategories: Subcategory[];
}

const FeaturedSubcategoriesSection = ({ subcategories }: FeaturedSubcategoriesSectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Danh mục con phổ biến</h2>
          <p className="text-gray-600">Những danh mục được mua sắm nhiều nhất</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((subcategory) => (
            <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSubcategoriesSection;
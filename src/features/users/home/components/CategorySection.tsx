import CategoryCard from "@/components/common/CategoryCard";
import { Category } from "@/types";

/**
 * CategorySection Component
 * Hiển thị danh sách các danh mục sản phẩm trong một carousel một hàng
 * với các nút điều hướng để tối ưu trải nghiệm người dùng
 */
const CategorySection = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map(category => (
          <div key={category.id}>
            <CategoryCard
              category={category}
              linkTo={`/category/${category.slug}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

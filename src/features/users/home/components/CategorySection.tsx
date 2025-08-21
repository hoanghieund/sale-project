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
      <div className="container mx-auto px-4">
        <div className="relative px-10">
          <div className="overflow-hidden">
            <div className="flex -ml-4">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="pl-4 min-w-0 shrink-0 grow-0 md:basis-1/2 lg:basis-1/4"
                >
                  <CategoryCard
                    category={category}
                    linkTo={`/category/${category.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

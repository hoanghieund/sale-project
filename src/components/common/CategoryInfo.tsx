import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Category } from "@/types";

/**
 * CategoryInfo - Component hiển thị thông tin của danh mục
 * Sử dụng cho cả CategoryPage và SubcategoryPage
 */
interface CategoryInfoProps {
  /**
   * Đối tượng danh mục cần hiển thị
   */
  category: Category;
  
  /**
   * Danh mục cha (nếu có)
   */
  parentCategory?: Category | null;
  
  /**
   * Số lượng danh mục con (nếu có)
   */
  subcategoriesCount?: number;
  
  /**
   * Kiểu hiển thị: 'category' cho danh mục chính, 'subcategory' cho danh mục con
   */
  type: 'category' | 'subcategory';
}

const CategoryInfo = ({ 
  category, 
  parentCategory, 
  subcategoriesCount = 0, 
  type 
}: CategoryInfoProps) => {
  return (
    <div className="mb-12">
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-none">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <span className="text-5xl">{category.icon}</span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
                {category.name}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg mb-3">
                {type === 'category' ? `Danh mục sản phẩm ${category.name}` : `${category.name} - Chất lượng cao`}
              </CardDescription>
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  {category.totalProduct?.toLocaleString() || 0} sản phẩm
                </Badge>
                
                {type === 'category' && subcategoriesCount > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                  >
                    {subcategoriesCount} danh mục con
                  </Badge>
                )}
                
                {type === 'subcategory' && parentCategory && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                  >
                    Danh mục: {parentCategory.name}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryInfo;

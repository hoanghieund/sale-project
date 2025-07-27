import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Category } from "@/types";
import { Link } from "react-router-dom";

/**
 * CategoryHeader - Component hiển thị thông tin header của danh mục
 * Sử dụng cho cả CategoryPage và SubcategoryPage
 */
interface CategoryHeaderProps {
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

const CategoryHeader = ({ 
  category, 
  parentCategory, 
  subcategoriesCount = 0, 
  type 
}: CategoryHeaderProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              
              {type === 'category' ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/categories">Danh mục</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {parentCategory && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to={`/category/${parentCategory.id}`}>
                            {parentCategory.name}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{category.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Category Header */}
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
    </>
  );
};

export default CategoryHeader;

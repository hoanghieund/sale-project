import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryInfo from "@/components/common/CategoryInfo";
import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { productService } from "@/features/users/sub-category/services/productServices";
import { subcategoryService } from "@/features/users/sub-category/services/subcategoryServices";
import { Category, Product } from "@/types";

/**
 * SubcategoryPage - Trang hiển thị danh mục con
 * Hiển thị tất cả sản phẩm thuộc subcategory
 */
const SubcategoryPage = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [subcategory, setSubcategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại, mặc định là 1
  const [totalPages, setTotalPages] = useState(1); // State cho tổng số trang, mặc định là 1

  useEffect(() => {
    /**
     * @function fetchSubcategoryAndProducts
     * @description Hàm bất đồng bộ để lấy dữ liệu danh mục con và sản phẩm liên quan từ API.
     * Sử dụng `subcategoryId` từ `useParams` để gọi API.
     * Cập nhật trạng thái `subcategory`, `products` và `loading`.
     * @param {string} id - Id của danh mục con.
     * @returns {void}
     */
    const fetchSubcategoryAndProducts = async (id: string , page : number = 1) => {
      try {
        // Lấy thông tin danh mục con từ API
        const subcategoryData = await subcategoryService.getSubcategoryById(
          parseInt(id)
        );
        setSubcategory(subcategoryData); // Cập nhật trạng thái danh mục con

        // Lấy danh sách sản phẩm theo ID danh mục con và trang hiện tại
        const productsData = await productService.getProductsBySubCategoryId(
          subcategoryData.parent?.id, 
          Number(subcategoryData.id),
          page - 1,
          12
        );
        setProducts(productsData.content); // Cập nhật trạng thái sản phẩm
        setTotalPages(productsData.totalPages); // Cập nhật tổng số trang
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu danh mục con hoặc sản phẩm:", error);
        setSubcategory(null); // Đặt danh mục con về null nếu có lỗi
        setProducts([]); // Đặt sản phẩm về mảng rỗng nếu có lỗi
      }
    };

    // Gọi hàm fetchSubcategoryAndProducts khi subcategoryId thay đổi
    if (subcategoryId) {
      fetchSubcategoryAndProducts(subcategoryId , currentPage);
    }
  }, [subcategoryId, currentPage]); // Dependency array đảm bảo useEffect chạy lại khi subcategoryId hoặc currentPage thay đổi

  /**
   * @function handlePageChange
   * @description Cập nhật trạng thái `currentPage` khi người dùng chuyển trang.
   * Đồng thời gọi lại `fetchSubcategoryAndProducts` để tải dữ liệu cho trang mới.
   * @param {number} page - Số trang mới.
   * @returns {void}
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!subcategory) {
    return <EmptyStateDisplay />;
  }

  return (
    <div className="bg-background min-h-screen">
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
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/categories">Danh mục</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${subcategory.parent?.id}`}>
                    {subcategory.parent?.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sử dụng component CategoryInfo */}
        <CategoryInfo
          category={subcategory}
          parentCategory={subcategory.parent}
          type="subcategory"
        />

        {/* Filters and Sort */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">
                  Hiển thị {products.length} / {subcategory.totalProduct} sản
                  phẩm
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCardSimple key={product.id} product={product} />
            ))
          ) : (
            <Card className="text-center text-gray-500 col-span-full py-12">
              <CardContent>
                <div className="text-6xl mb-4">🛍️</div>
                <CardTitle className="text-lg mb-2">Chưa có sản phẩm</CardTitle>
                <CardDescription>
                  Hãy quay lại sau để xem các sản phẩm mới nhất
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;

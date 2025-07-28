import CategoryInfo from "@/components/common/CategoryInfo";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { productService } from "@/features/users/sub-category/services/productServices";
import { subcategoryService } from "@/features/users/sub-category/services/subcategoryServices";
import { Category, Product } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import các component Shadcn
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * SubcategoryPage - Trang hiển thị danh mục con
 * Hiển thị tất cả sản phẩm thuộc subcategory
 */
const SubcategoryPage = () => {
  const { subcategorySlug } = useParams<{ subcategorySlug: string }>();
  const [subcategory, setSubcategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    /**
     * @function fetchSubcategoryAndProducts
     * @description Hàm bất đồng bộ để lấy dữ liệu danh mục con và sản phẩm liên quan từ API.
     * Sử dụng `subcategorySlug` từ `useParams` để gọi API.
     * Cập nhật trạng thái `subcategory`, `products` và `loading`.
     * @param {string} slug - Slug của danh mục con.
     * @returns {void}
     */
    const fetchSubcategoryAndProducts = async (slug: string) => {
      setLoading(true); // Bắt đầu tải dữ liệu, đặt trạng thái loading là true
      try {
        // Lấy thông tin danh mục con từ API
        const subcategoryData = await subcategoryService.getSubcategoryBySlug(
          slug,
        );
        setSubcategory(subcategoryData); // Cập nhật trạng thái danh mục con

        // Lấy danh sách sản phẩm theo ID danh mục con
        const productsData = await productService.getProductsBySubCategoryId(
          subcategoryData.id,
        );
        setProducts(productsData.data.data); // Cập nhật trạng thái sản phẩm
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu danh mục con hoặc sản phẩm:", error);
        setSubcategory(null); // Đặt danh mục con về null nếu có lỗi
        setProducts([]); // Đặt sản phẩm về mảng rỗng nếu có lỗi
      } finally {
        setLoading(false); // Hoàn tất tải dữ liệu, đặt trạng thái loading là false
      }
    };

    // Gọi hàm fetchSubcategoryAndProducts khi subcategorySlug thay đổi
    if (subcategorySlug) {
      fetchSubcategoryAndProducts(subcategorySlug);
    }
  }, [subcategorySlug]); // Dependency array đảm bảo useEffect chạy lại khi subcategorySlug thay đổi

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log(`Đã chọn sắp xếp theo: ${value}`);

    // Logic sắp xếp sản phẩm
    let sortedProducts = [...products];

    switch (value) {
      case "price-low":
        // Sắp xếp sản phẩm theo giá từ thấp đến cao (cần ProductSku.price khi có dữ liệu thực)
        // Hiện tại dùng ID làm placeholder
        sortedProducts.sort((a, b) => a.id - b.id);
        break;
      case "price-high":
        // Sắp xếp sản phẩm theo giá từ cao đến thấp (cần ProductSku.price khi có dữ liệu thực)
        // Hiện tại dùng ID làm placeholder
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        // Sắp xếp sản phẩm theo số lượng bán chạy nhất
        sortedProducts.sort((a, b) => b.totalProductSold - a.totalProductSold);
        break;
      case "rating":
        // Sắp xếp sản phẩm theo đánh giá cao nhất
        sortedProducts.sort((a, b) => b.star - a.star);
        break;
      case "newest":
      default:
        // Sắp xếp sản phẩm theo ngày tạo mới nhất
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
        );
        break;
    }

    setProducts(sortedProducts); // Cập nhật danh sách sản phẩm đã sắp xếp
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy danh mục</div>
      </div>
    );
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

              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">Sắp xếp theo:</span>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  </SelectContent>
                </Select>
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;

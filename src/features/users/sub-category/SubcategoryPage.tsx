import CategoryInfo from "@/components/common/CategoryInfo";
import ProductCardSimple from "@/components/common/ProductCardSimple";
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
    // TODO: Fetch subcategory data from API
    // Tạm thởi sử dụng mock data dựa trên subcategorySlug
    const getSubcategoryData = (slug: string) => {
      switch (slug) {
        case "ao-nam":
          return {
            id: 101,
            name: "Áo nam",
            icon: "👔",
            active: true,
            isShowSuggests: true,
            totalProduct: 350,
            parentId: 1,
            parent: {
              id: 1,
              name: "Thời trang",
              icon: "👕",
              active: true,
              isShowSuggests: true,
              totalProduct: 1250,
            },
          };
        default:
          return {
            id: 101,
            name: "Áo nam",
            icon: "👔",
            active: true,
            isShowSuggests: true,
            totalProduct: 50,
            parentId: 1,
            parent: {
              id: 1,
              name: "Thời trang",
              icon: "👕",
              active: true,
              isShowSuggests: true,
              totalProduct: 150,
            },
          };
      }
    };

    const mockSubcategory = getSubcategoryData(subcategorySlug || "");

    // Mock products data
    const mockProducts: Product[] = [
      {
        id: 101,
        name: "Áo thun nam cổ tròn", // Thêm trường name bắt buộc
        images: ["/assets/product-1.jpg"], // Thêm trường images bắt buộc
        title: "Áo thun nam cổ tròn",
        content: "Áo thun nam cổ tròn chất liệu cotton 100%",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.5,
        totalProductSold: 120,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        discount: { id: 1, percent: 10, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 102,
        name: "Quần jean nam slim fit", // Thêm trường name bắt buộc
        images: ["/assets/product-2.jpg"], // Thêm trường images bắt buộc
        title: "Quần jean nam slim fit",
        content: "Quần jean nam slim fit màu xanh đậm",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.8,
        totalProductSold: 85,
        isNew: false,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 2, percent: 15, status: true, createDate: new Date() },
        categoriesId: 5,
        shopId: 2,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 103,
        name: "Áo sơ mi nữ công sở", // Thêm trường name bắt buộc
        images: ["/assets/product-3.jpg"], // Thêm trường images bắt buộc
        title: "Áo sơ mi nữ công sở",
        content: "Áo sơ mi nữ công sở chất liệu lụa cao cấp",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.6,
        totalProductSold: 95,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: 6,
        shopId: 3,
        createBy: "system",
        createDate: new Date(),
      },
      {
        id: 104,
        name: "Váy liền thân dự tiệc", // Thêm trường name bắt buộc
        images: ["/assets/product-4.jpg"], // Thêm trường images bắt buộc
        title: "Váy liền thân dự tiệc",
        content: "Váy liền thân dự tiệc màu đen sang trọng",
        status: true,
        // price không còn trong Product interface, sẽ được xử lý qua ProductSku
        star: 4.9,
        totalProductSold: 65,
        isNew: true,
        isFlashSale: true,
        isTrending: true,
        discount: { id: 3, percent: 20, status: true, createDate: new Date() },
        categoriesId: 6,
        shopId: 1,
        createBy: "system",
        createDate: new Date(),
      },
    ];

    setSubcategory(mockSubcategory);
    setProducts(mockProducts);
    setLoading(false);
  }, [subcategorySlug]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log(`Đã chọn sắp xếp theo: ${value}`);

    // Logic sắp xếp sản phẩm
    let sortedProducts = [...products];

    switch (value) {
      case "price-low":
        // Giả định rằng product có trường price
        // Khi có API thực tế, có thể gọi API với tham số sắp xếp
        sortedProducts.sort((a, b) => {
          // Tạm thời dùng id để demo, thay bằng price khi có dữ liệu thực
          return a.id - b.id;
        });
        break;
      case "price-high":
        sortedProducts.sort((a, b) => {
          // Tạm thời dùng id để demo, thay bằng price khi có dữ liệu thực
          return b.id - a.id;
        });
        break;
      case "popular":
        sortedProducts.sort((a, b) => b.totalProductSold - a.totalProductSold);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.star - a.star);
        break;
      case "newest":
      default:
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );
        break;
    }

    // Cập nhật danh sách sản phẩm đã sắp xếp
    setProducts(sortedProducts);
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

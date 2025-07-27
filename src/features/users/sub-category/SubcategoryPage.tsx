import ProductCardSimple from "@/components/common/ProductCardSimple";
import CategoryInfo from "@/components/common/CategoryInfo";
import { Product, Category } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import các component Shadcn
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
        id: 1,
        title: "Áo sơ mi nam cao cấp",
        description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
        content:
          "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại, phù hợp cho nhiều dịp khác nhau",
        brand: "Brand A",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Casual",
        star: 4.5,
        totalProductSold: 120,
        status: true,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: mockSubcategory.parentId,
        shopId: 1,
        discountId: 1,
        discount: {
          id: 1,
          percent: 25,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-01T00:00:00Z"),
        modifierDate: new Date("2024-01-01T00:00:00Z"),
      },
      {
        id: 2,
        title: "Áo thun nam basic",
        description: "Áo thun nam basic, form rộng thoải mái",
        content:
          "Áo thun nam basic, form rộng thoải mái, chất liệu cotton thoáng mát",
        brand: "Brand B",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Basic",
        star: 4.3,
        totalProductSold: 85,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: false,
        categoriesId: mockSubcategory.parentId,
        shopId: 2,
        discountId: 2,
        discount: {
          id: 2,
          percent: 20,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-02T00:00:00Z"),
        modifierDate: new Date("2024-01-02T00:00:00Z"),
      },
      {
        id: 3,
        title: "Áo khoác nam bomber",
        description: "Áo khoác bomber phong cách, chống nắng, chống gió",
        content:
          "Áo khoác bomber phong cách, chống nắng, chống gió, phù hợp cho mùa thu đông",
        brand: "Brand C",
        material: "Polyester",
        origin: "Việt Nam",
        style: "Casual",
        star: 4.7,
        totalProductSold: 62,
        status: true,
        isNew: true,
        isFlashSale: true,
        isTrending: true,
        categoriesId: mockSubcategory.parentId,
        shopId: 1,
        discountId: 3,
        discount: {
          id: 3,
          percent: 23,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-03T00:00:00Z"),
        modifierDate: new Date("2024-01-03T00:00:00Z"),
      },
      {
        id: 4,
        title: "Áo polo nam cổ bẻ",
        description: "Áo polo nam cổ bẻ, chất liệu cao cấp",
        content:
          "Áo polo nam cổ bẻ, chất liệu cao cấp, thoáng mát, phù hợp cho mùa hè",
        brand: "Brand D",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Smart Casual",
        star: 4.4,
        totalProductSold: 95,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: true,
        categoriesId: mockSubcategory.parentId,
        shopId: 3,
        discountId: 4,
        discount: {
          id: 4,
          percent: 13,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-04T00:00:00Z"),
        modifierDate: new Date("2024-01-04T00:00:00Z"),
      },
      {
        id: 5,
        title: "Áo len nam dày dặn",
        description: "Áo len nam dày dặn, giữ ấm tốt mùa đông",
        content:
          "Áo len nam dày dặn, giữ ấm tốt mùa đông, chất liệu len cao cấp",
        brand: "Brand E",
        material: "Wool",
        origin: "Việt Nam",
        style: "Winter",
        star: 4.6,
        totalProductSold: 48,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: false,
        categoriesId: mockSubcategory.parentId,
        shopId: 2,
        discountId: 5,
        discount: {
          id: 5,
          percent: 10,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-05T00:00:00Z"),
        modifierDate: new Date("2024-01-05T00:00:00Z"),
      },
      {
        id: 6,
        title: "Áo sơ mi nam trắng công sở",
        description: "Áo sơ mi nam trắng, chất liệu cotton pha polyester",
        content:
          "Áo sơ mi nam trắng, chất liệu cotton pha polyester, phù hợp cho công sở",
        brand: "Brand F",
        material: "Cotton Polyester",
        origin: "Việt Nam",
        style: "Formal",
        star: 4.8,
        totalProductSold: 130,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: false,
        categoriesId: mockSubcategory.parentId,
        shopId: 1,
        discountId: 6,
        discount: {
          id: 6,
          percent: 7,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-06T00:00:00Z"),
        modifierDate: new Date("2024-01-06T00:00:00Z"),
      },
      {
        id: 7,
        title: "Áo thun nam in hình",
        description: "Áo thun nam in hình phong cách, trẻ trung",
        content:
          "Áo thun nam in hình phong cách, trẻ trung, chất liệu cotton thoáng mát",
        brand: "Brand G",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Streetwear",
        star: 4.2,
        totalProductSold: 78,
        status: true,
        isNew: true,
        isFlashSale: true,
        isTrending: false,
        categoriesId: mockSubcategory.parentId,
        shopId: 3,
        discountId: 7,
        discount: {
          id: 7,
          percent: 13,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-07T00:00:00Z"),
        modifierDate: new Date("2024-01-07T00:00:00Z"),
      },
      {
        id: 8,
        title: "Áo sơ mi nam kẻ sọc",
        description: "Áo sơ mi nam kẻ sọc, phong cách trẻ trung",
        content:
          "Áo sơ mi nam kẻ sọc, phong cách trẻ trung, chất liệu cotton cao cấp",
        brand: "Brand H",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Casual",
        star: 4.5,
        totalProductSold: 65,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: true,
        categoriesId: mockSubcategory.parentId,
        shopId: 2,
        discountId: 8,
        discount: {
          id: 8,
          percent: 12,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-08T00:00:00Z"),
        modifierDate: new Date("2024-01-08T00:00:00Z"),
      },
      {
        id: 9,
        title: "Áo thun nam oversize",
        description: "Áo thun nam oversize, phong cách đường phố",
        content:
          "Áo thun nam oversize, phong cách đường phố, chất liệu cotton mềm mại",
        brand: "Brand I",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Streetwear",
        star: 4.4,
        totalProductSold: 112,
        status: true,
        isNew: true,
        isFlashSale: false,
        isTrending: true,
        categoriesId: mockSubcategory.parentId,
        shopId: 3,
        discountId: 9,
        discount: {
          id: 9,
          percent: 14,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-09T00:00:00Z"),
        modifierDate: new Date("2024-01-09T00:00:00Z"),
      },
      {
        id: 10,
        title: "Áo sơ mi nam dài tay",
        description: "Áo sơ mi nam dài tay, chất liệu cao cấp",
        content:
          "Áo sơ mi nam dài tay, chất liệu cao cấp, phù hợp cho mùa thu đông",
        brand: "Brand J",
        material: "Cotton",
        origin: "Việt Nam",
        style: "Formal",
        star: 4.6,
        totalProductSold: 87,
        status: true,
        isNew: false,
        isFlashSale: false,
        isTrending: false,
        categoriesId: mockSubcategory.parentId,
        shopId: 1,
        discountId: 10,
        discount: {
          id: 10,
          percent: 8,
          status: true,
          createDate: new Date("2024-01-01"),
        },
        createDate: new Date("2024-01-10T00:00:00Z"),
        modifierDate: new Date("2024-01-10T00:00:00Z"),
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

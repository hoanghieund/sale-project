import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import CategoryCard from "@/components/common/CategoryCard";
import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { categoryService } from "@/features/users/category/services/categoryServices";
import { productService } from "@/features/users/category/services/productServices";
import { Category, Product } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * CategoryPage - Trang hiển thị danh mục chính
 * Hiển thị danh sách subcategories và sản phẩm với bộ lọc và phân trang
 */
const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho hệ thống lọc mới
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 20,
    popular: false,
    latest: false,
    bestSell: false,
    price: "",
    priceFrom: "",
    priceTo: "",
  });

  // Separate state cho price inputs để debounce
  const [priceInputs, setPriceInputs] = useState({
    priceFrom: "",
    priceTo: "",
  });

  // Timer reference cho debounce
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // State cho phân trang
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * Fetches category data and subcategories from the API.
   * @param id - The id of the category to fetch.
   */
  const fetchCategoryData = useCallback(async (id: string) => {
    try {
      // Fetch category and subcategories
      const categoryResponse: Category[] =
        await categoryService.getCategoryById(id);
      setCategories(categoryResponse);
      if (categoryResponse.length === 1) {
        const subCategoryResponse: Category[] =
          await categoryService.getCategoryByParent(id);
        setSubcategories(subCategoryResponse);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu danh mục:", error);
      setCategories([]);
      setSubcategories([]);
    }
  }, []);

  /**
   * Debounced function để cập nhật price filters
   * Chờ 800ms sau khi người dùng ngừng nhập mới gọi API
   */
  const debouncedUpdatePriceFilters = useCallback(
    (priceFrom: string, priceTo: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setFilters(prev => ({
          ...prev,
          priceFrom,
          priceTo,
          currentPage: 0, // Reset về trang đầu khi thay đổi bộ lọc
        }));
      }, 800); // Delay 800ms
    },
    []
  );

  /**
   * Xử lý thay đổi price input với debounce
   */
  const handlePriceInputChange = useCallback(
    (field: "priceFrom" | "priceTo", value: string) => {
      // Cập nhật ngay lập tức UI state
      setPriceInputs(prev => ({
        ...prev,
        [field]: value,
      }));

      // Gọi debounced update cho filters
      const newPriceFrom =
        field === "priceFrom" ? value : priceInputs.priceFrom;
      const newPriceTo = field === "priceTo" ? value : priceInputs.priceTo;
      debouncedUpdatePriceFilters(newPriceFrom, newPriceTo);
    },
    [priceInputs, debouncedUpdatePriceFilters]
  );

  /**
   * Fetch dữ liệu sản phẩm với filters
   */
  const fetchProductData = async (
    categoryParentId: number,
    categoryChildId?: number
  ) => {
    if (!categoryId) return;

    setLoading(true);
    try {
      // Chuẩn hoá payload theo interface service
      const payload = {
        categoryParentId,
        categoryChildId,
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        popular: !!filters.popular,
        latest: !!filters.latest,
        bestSell: !!filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
      };

      const response = await productService.getProductsByCategoryId(payload);

      const products = response?.content || [];

      setProducts(products);

      // Cập nhật thông tin phân trang
      setTotalPages(response?.totalPages || 0);
      setTotalElements(response?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect để fetch dữ liệu category khi categoryId thay đổi
  useEffect(() => {
    if (categoryId) {
      fetchCategoryData(categoryId);
    }
  }, [categoryId, fetchCategoryData]);

  // Effect để fetch dữ liệu sản phẩm khi categoryId hoặc filters thay đổi
  useEffect(() => {
    if (categoryId && categories.length === 1) {
      fetchProductData(Number(categoryId));
    } else if (categories.length === 2) {
      fetchProductData(Number(categories[0].id), Number(categories[1].id));
    }
  }, [categoryId, categories, filters]);

  // Sync priceInputs với filters ban đầu
  useEffect(() => {
    setPriceInputs({
      priceFrom: filters.priceFrom,
      priceTo: filters.priceTo,
    });
  }, [filters.priceFrom, filters.priceTo]);

  // Cleanup debounce timer khi component unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const breadcrumbItems = useMemo(() => {
    if (categories.length === 1) {
      return [
        { label: "Trang chủ", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].id}` },
      ];
    } else if (categories.length === 2) {
      return [
        { label: "Trang chủ", to: "/" },
        { label: categories[0].name, to: `/category/${categories[0].id}` },
        { label: categories[1].name, to: `/category/${categories[1].id}` },
      ];
    } else {
      return [{ label: "Trang chủ", to: "/" }, { label: "Danh mục" }];
    }
  }, [categoryId, categories]);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Subcategories Grid */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">Danh mục</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategories.length > 0 ? (
                subcategories.map(subcategory => (
                  <CategoryCard
                    key={subcategory.id}
                    category={subcategory}
                    linkTo={`/category/${subcategory.id}`}
                  />
                ))
              ) : (
                <EmptyStateMessage icon="🛍️" message="Chưa có danh mục con" />
              )}
            </div>
          </div>
        )}

        {/* Products with Filters */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Sản phẩm trong danh mục</CardTitle>
            <CardDescription>
              Khám phá các sản phẩm đa dạng trong danh mục này
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bộ lọc */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 rounded-lg">
              {/* Subcategories Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Loại sản phẩm</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {/* Bộ lọc bổ sung - Popular, Latest, Best Sell */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={filters.popular}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          popular: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="popular"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Phổ biến
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="latest"
                      checked={filters.latest}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          latest: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="latest"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Mới nhất
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bestSell"
                      checked={filters.bestSell}
                      onCheckedChange={checked => {
                        setFilters(prev => ({
                          ...prev,
                          bestSell: !!checked,
                          currentPage: 0,
                        }));
                      }}
                    />
                    <Label
                      htmlFor="bestSell"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Bán chạy
                    </Label>
                  </div>
                </div>
              </div>

              {/* Khoảng giá */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Khoảng giá (VNĐ)</Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Giá từ"
                    value={priceInputs.priceFrom}
                    onChange={e =>
                      handlePriceInputChange("priceFrom", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Giá đến"
                    value={priceInputs.priceTo}
                    onChange={e =>
                      handlePriceInputChange("priceTo", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Sắp xếp theo giá */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sắp xếp giá</Label>
                <Select
                  value={filters.price}
                  onValueChange={value => {
                    setFilters(prev => ({
                      ...prev,
                      price: value,
                      currentPage: 0,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sắp xếp giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Giá tăng dần</SelectItem>
                    <SelectItem value="desc">Giá giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Số sản phẩm trên trang */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Hiển thị</Label>
                <Select
                  value={filters.pageSize.toString()}
                  onValueChange={value =>
                    setFilters(prev => ({
                      ...prev,
                      pageSize: Number(value),
                      currentPage: 0,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 sản phẩm</SelectItem>
                    <SelectItem value="20">20 sản phẩm</SelectItem>
                    <SelectItem value="40">40 sản phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Thông tin kết quả */}
            <div className="text-sm text-muted-foreground">
              Hiển thị {products.length} trong tổng số {totalElements} sản phẩm
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Lưới sản phẩm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {products.length > 0 ? (
                    products.map(product => (
                      <ProductCardSimple
                        key={product.id}
                        product={product}
                        showWishlist={true}
                        showQuickView={false}
                        simple={true}
                      />
                    ))
                  ) : (
                    <div className="col-span-full">
                      {categories === null ? <EmptyStateDisplay /> : <></>}
                    </div>
                  )}
                </div>

                {/* Phân trang */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <CustomPagination
                      currentPage={filters.currentPage + 1} // API sử dụng base-0, UI sử dụng base-1
                      totalPages={totalPages}
                      onPageChange={page => {
                        setFilters(prev => ({
                          ...prev,
                          currentPage: page - 1,
                        })); // Chuyển về base-0 cho API
                      }}
                      className="justify-center"
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;

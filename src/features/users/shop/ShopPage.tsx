import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Category, Product, Shop } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByShopId } from "./services/shopServices";
// Import Breadcrumb từ shadcn để thay thế breadcrumb thủ công
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Star } from "lucide-react";
// Loại bỏ Tabs vì không còn sử dụng

interface shopUi extends Shop {
  star?: number;
}

/**
 * ShopPage - Trang hiển thị thông tin cửa hàng
 * Hiển thị thông tin cửa hàng và danh sách sản phẩm của cửa hàng
 */
const ShopPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<shopUi>({} as shopUi);
  console.log("🚀 ~ ShopPage ~ shop:", shop);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho hệ thống lọc mới
  const [filters, setFilters] = useState({
    currentPage: 0,
    pageSize: 20,
    listIdChild: [] as number[],
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

  // Hàm fetch dữ liệu với filters
  const fetchShopData = async () => {
    setLoading(true);
    try {
      // Chuẩn hoá payload theo interface service:
      // - 'price' phải là string (ví dụ: '', 'asc', 'desc'), không phải boolean.
      // - 'priceFrom'/'priceTo' cho phép string | number, giữ nguyên.
      // - listIdChild đảm bảo là number[].
      const payload = {
        id: Number(shopId),
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        listIdChild: (filters.listIdChild || []).map(v => Number(v)),
        popular: !!filters.popular,
        latest: !!filters.latest,
        bestSell: !!filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
      };

      const response = await getProductsByShopId(payload);

      const products = response.productDTOPage?.content || [];
      const categories = response.categoryDtoList || [];
      const shop = {
        ...response.shop,
        star: response.shopRating || 0,
        totalQuantity: response?.productDTOPage?.totalElements || 0,
      };

      setProducts(products);
      setShop(shop);
      setCategories(categories);

      // Cập nhật thông tin phân trang
      setTotalPages(response.productDTOPage?.totalPages || 0);
      setTotalElements(response.productDTOPage?.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu cửa hàng:", error);
      setShop(null);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect để fetch dữ liệu khi shopId hoặc filters thay đổi
  useEffect(() => {
    if (shopId) {
      fetchShopData();
    }
  }, [shopId, filters]);

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

  if (!shop) {
    return <EmptyStateDisplay />;
  }

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbNav
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Cửa hàng" },
          { label: shop.name },
        ]}
      />
      {/* Shop Banner */}
      {/* Banner cửa hàng động theo shop.banner; fallback về placeholder nếu thiếu */}
      <div
        className="relative h-80 bg-primary"
        style={{
          // dùng hình nền cover để hiển thị đủ chiều ngang, giữ tỉ lệ
          backgroundImage: `url(${shop?.banner?.trim()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Lớp phủ tối để đảm bảo nội dung phía trên có độ tương phản tốt */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Shop Info (refactored to Shadcn UI Card) */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Sử dụng Card để đảm bảo tính nhất quán UI và khả năng truy cập */}
        <Card className="mb-8 shadow-lg bg-white">
          {/*
            Tối ưu bố cục CardHeader:
            - Trục chính: Avatar | Thông tin shop (tên + mô tả ngắn + stats) | Hành động
            - Sử dụng grid cho khu vực stats để cân bằng và nổi bật hơn
            - Dùng màu/spacing theo design-system: text-xl/lg, gap-4/6, rounded-lg, bg-muted, shadow-sm
          */}
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Avatar cửa hàng */}
              <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-white shadow-lg rounded-full">
                {/* Phòng thủ src/alt */}
                <AvatarImage
                  src={shop?.avatar?.trim() || ""}
                  alt={shop?.name || "Shop"}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {shop?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Khối nội dung trung tâm: Tên + mô tả + chỉ số */}
              <div className="flex-1 w-full">
                {/* Tên shop */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl md:text-3xl leading-none tracking-wide">
                    {shop?.name}
                  </CardTitle>
                  {/* Hành động đặt lên cùng hàng ở viewport rộng để tiết kiệm chiều dọc */}
                  <div className="hidden lg:flex items-center gap-2">
                    <Button variant="outline" className="h-9">
                      Chat ngay
                    </Button>
                  </div>
                </div>

                {/* Khu vực chỉ số: làm nổi bật, dễ quét mắt */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {/* Đánh giá trung bình */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Đánh giá
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <span className="text-base font-medium">
                          {shop.star || 0}
                        </span>
                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Tổng số sản phẩm */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Sản phẩm
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-primary leading-none">
                      {shop?.totalQuantity}
                    </div>
                  </div>

                  {/* Ngày đăng */}
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      Ngày đăng sản phẩm
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-primary leading-none">
                      {shop?.timeRequest}
                    </div>
                  </div>
                </div>
              </div>

              {/* Nhóm hành động bên phải - hiển thị trên mobile dưới cùng */}
              <div className="flex lg:hidden w-full">
                <Button variant="outline" className="w-full">
                  Chat ngay
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* KHU VỰC DANH MỤC + SẢN PHẨM (đã bỏ hệ Tabs) */}
        <Card className="mb-8 border border-border rounded-xl shadow-sm bg-white">
          {/* Gợi ý danh mục của cửa hàng: lấy từ products[0]?.categoryDto và mở rộng thành danh mục duy nhất */}
          <CardHeader className="pb-2">
            {/* Tiêu đề và bộ lọc */}
            <div className="space-y-4">
              <div>
                <CardTitle className="text-xl">Sản phẩm của cửa hàng</CardTitle>
                <CardDescription>
                  Tìm kiếm và lọc sản phẩm theo nhu cầu của bạn
                </CardDescription>
              </div>

              {/* Dải danh mục hiển thị phía trên lưới sản phẩm */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-foreground">
                  Danh mục liên quan
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/*
                    Hiển thị rõ ràng Category vs Subcategory:
                    - Có parent: hiển thị badge "Category" cho parent và badge "Sub" cho current, phân tách bằng "›"
                    - Không có parent: hiển thị badge "Category" cho chính nó
                    Giữ style theo design-system, dùng màu từ shadcn: badge outline + text-muted-foreground để dễ phân biệt.
                  */}
                  {categories.length > 0 ? (
                    categories?.map((cat: Category) => {
                      if (cat?.parent) {
                        // Có parent: hiển thị cặp Category (parent) › Subcategory (current)
                        return (
                          <div
                            key={`${cat.parent.id}-${cat.id}`}
                            className="flex items-center gap-2 rounded-md border border-gray-100 p-2"
                          >
                            {/* Badge & link cho Category (parent) */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                                Category
                              </span>
                              <Button variant="outline" asChild className="h-8">
                                <Link
                                  to={`/category/${cat.parent.id}`}
                                  className="text-sm"
                                >
                                  {cat.parent.name}
                                </Link>
                              </Button>
                            </div>

                            {/* Ký tự phân tách trực quan */}
                            <span className="text-muted-foreground">›</span>

                            {/* Badge & link cho Subcategory (current) */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                                Sub
                              </span>
                              <Button variant="outline" asChild className="h-8">
                                <Link
                                  to={`/category/${cat.id}`}
                                  className="text-sm"
                                >
                                  {cat.name}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        );
                      }

                      // Không có parent: chính nó là Category
                      return (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 rounded-md border border-gray-100 p-2"
                        >
                          <span className="text-xs text-muted-foreground px-2 py-0.5 border border-border rounded">
                            Category
                          </span>
                          <Button variant="outline" asChild className="h-8">
                            <Link
                              to={`/category/${cat.id}`}
                              className="text-sm"
                            >
                              {cat.name}
                            </Link>
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Chưa có danh mục
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="mx-6" />

          <CardContent className="pt-6 space-y-6">
            {/* Bộ lọc sản phẩm */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Lọc theo loại đặc biệt */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Loại sản phẩm</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={filters.popular}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          popular: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="popular" className="text-sm">
                      Phổ biến
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="latest"
                      checked={filters.latest}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          latest: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="latest" className="text-sm">
                      Mới nhất
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bestSell"
                      checked={filters.bestSell}
                      onCheckedChange={checked =>
                        setFilters(prev => ({
                          ...prev,
                          bestSell: !!checked,
                          currentPage: 0,
                        }))
                      }
                    />
                    <Label htmlFor="bestSell" className="text-sm">
                      Bán chạy
                    </Label>
                  </div>
                </div>
              </div>

              {/* Lọc theo khoảng giá */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Khoảng giá (VNĐ)</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Giá từ"
                    type="number"
                    value={priceInputs.priceFrom}
                    onChange={e =>
                      handlePriceInputChange("priceFrom", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Giá đến"
                    type="number"
                    value={priceInputs.priceTo}
                    onChange={e =>
                      handlePriceInputChange("priceTo", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Sắp xếp theo giá (boolean): false = giảm dần, true = tăng dần */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sắp xếp giá</Label>
                <Select
                  value={String(filters.price)} // "true" | "false"
                  onValueChange={value => {
                    const mapped = value === "true";
                    setFilters(prev => ({
                      ...prev,
                      price: mapped ? "true" : "false",
                      currentPage: 0, // reset phân trang khi đổi sort
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sắp xếp giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Giá tăng dần</SelectItem>
                    <SelectItem value="false">Giá giảm dần</SelectItem>
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
                  {products.map(product => (
                    <ProductCardSimple
                      key={product.id}
                      product={product}
                      showWishlist={true}
                      showQuickView={false}
                      simple={true}
                    />
                  ))}
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

export default ShopPage;

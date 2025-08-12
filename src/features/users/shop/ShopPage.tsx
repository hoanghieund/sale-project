import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import Breadcrumb from shadcn to replace manual breadcrumb
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search, Star } from "lucide-react";
import { shopService } from "./services/shopServices";
// Tabs removed as no longer in use

/**
 * Mục collection trong Shop chỉ cần 3 trường tối giản cho sidebar
 * Dùng type riêng để tránh nhầm lẫn với `Category` đầy đủ từ domain
 */
type ShopCollectionItem = {
  id: string | number;
  name: string;
  totalProduct: number;
};

interface shopUi {
  shopName?: string;
  banner?: string;
  avatar?: string;
  star?: number;
  totalProduct?: number;
  collections?: ShopCollectionItem[];
  timeRequest?: string;
  totalReview?: number;
}

const PAGE_SIZE = 15;

/**
 * ShopPage - Shop Information Display Page
 * Displays shop information and a list of shop products
 */
const ShopPage = () => {
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const [shop, setShop] = useState<shopUi>({} as shopUi);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<
    number | string | null
  >(null);
  const [sort, setSort] = useState("asc");
  // State tìm kiếm: tách UI input và giá trị áp dụng (keyword) để tránh gọi API mỗi ký tự
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  // State for the new filtering system
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZE,
  });

  // State for pagination
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Function to fetch data with pagination
  const fetchProductsByCategoryId = async (
    categoryId: number | string,
    sort: "asc" | "desc",
    page: number,
    size: number
  ) => {
    setLoading(true);
    try {
      const payload = {
        id: Number(categoryId),
        page: page,
        size: size,
        sort: sort,
        keywword: keyword,
      };

      const responseProduct = await shopService.getProductsByCategoryId(
        payload
      );
      const products = responseProduct?.content || [];
      setProducts(products);

      // Update pagination information
      setTotalPages(responseProduct?.totalPages || 0);
      setTotalElements(responseProduct?.totalElements || 0);
    } catch (error) {
      console.error("Error loading shop data:", error);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchShopInfo = async () => {
    setLoading(true);
    try {
      const responseShopInfo = await shopService.getShopInfo(shopSlug);
      const shopInfo = responseShopInfo;
      setShop(shopInfo);
    } catch (error) {
      console.error("Error loading shop data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch data with pagination
  const fetchProductsByAll = async (
    sort: "asc" | "desc",
    page: number,
    size: number
  ) => {
    setLoading(true);
    try {
      const payload = {
        page: page,
        size: size,
        sort: sort,
        // Truyền từ khóa tìm kiếm theo key backend yêu cầu (`keywword`)
        keywword: keyword,
      };

      const responseProduct = await shopService.getProductsByAll(
        shopSlug,
        payload
      );
      const products = responseProduct?.content || [];
      setProducts(products);

      // Update pagination information
      setTotalPages(responseProduct?.totalPages || 0);
      setTotalElements(responseProduct?.totalElements || 0);
    } catch (error) {
      console.error("Error loading shop data:", error);
      setProducts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when shopId or pagination change
  useEffect(() => {
    if (shopSlug) {
      fetchShopInfo();
    }
  }, [shopSlug]);

  // Đã bỏ reset bằng effect để tránh double-fetch khi category thay đổi

  // Fetch dữ liệu khi thay đổi category | sort | trang
  // Giải quyết lỗi: đổi trang không gọi API (phân trang không hoạt động)
  useEffect(() => {
    // Guard cho trường hợp chưa có category id hợp lệ
    if (activeCategoryId === null || activeCategoryId === undefined) {
      fetchProductsByAll(
        sort as "asc" | "desc",
        pagination.currentPage,
        pagination.pageSize
      );
      return;
    }

    // Gọi API theo base-0 của backend (currentPage là base-0)
    fetchProductsByCategoryId(
      activeCategoryId,
      sort as "asc" | "desc",
      pagination.currentPage,
      pagination.pageSize
    );
  }, [
    activeCategoryId,
    sort,
    pagination.currentPage,
    pagination.pageSize,
    keyword,
  ]);

  /**
   * Thực thi tìm kiếm khi người dùng nhấn Enter hoặc click nút Search
   * - Reset về trang 0 để đảm bảo kết quả đúng ngữ cảnh
   * - Áp dụng keyword đã được trim; nếu rỗng sẽ bỏ qua (undefined)
   */
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, currentPage: 0 }));
    const value = searchInput.trim();
    setKeyword(value || undefined);
  };

  /**
   * Chọn category: gom tất cả cập nhật state vào 1 event để React batch và chỉ fetch 1 lần
   * - Reset trang về 0, sort về asc
   * - Clear searchInput và keyword trước khi effect fetch chạy
   */
  const handleSelectCategory = (id: number | null) => {
    setActiveCategoryId(id);
    setPagination(prev => ({ ...prev, currentPage: 0 }));
    setSort("asc");
    setSearchInput("");
    setKeyword(undefined);
  };

  if (!shop) {
    return <EmptyStateDisplay />;
  }

  // Build collections with an "All" item at the beginning immutably
  // Avoid using Array.push here because it mutates and returns a number, not the array
  const collections: ShopCollectionItem[] = [
    {
      id: "all",
      name: "All",
      totalProduct: shop?.totalProduct || 0,
    },
    ...(shop?.collections || []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Shop Banner */}
      {/* Dynamic shop banner based on shop.banner; fallbacks to placeholder if missing */}
      <div
        className="relative h-96 bg-primary"
        style={{
          // Use cover background to display full width, maintain aspect ratio
          backgroundImage: `url(${shop?.banner?.trim()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay to ensure good contrast for content above */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Shop Info (refactored to Shadcn UI Card) */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Using Card to ensure UI consistency and accessibility */}
        <Card className="mb-8 shadow-sm bg-white">
          {/*
            Optimized CardHeader layout:
            - Main axis: Avatar | Shop information (name + short description + stats) | Actions
            - Using grid for stats area for balance and prominence
            - Using colors/spacing from design-system: text-xl/lg, gap-4/6, rounded-lg, bg-muted, shadow-sm
          */}
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Shop Avatar */}
              <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-white shadow-lg rounded-full">
                {/* Defensive src/alt */}
                <AvatarImage
                  src={shop?.avatar?.trim() || ""}
                  alt={shop?.shopName || "Shop"}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {shop?.shopName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Central content block: Name + description + metrics */}
              <div className="flex-1 w-full">
                {/* Shop Name */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl md:text-3xl leading-none tracking-wide">
                    {shop?.shopName}
                  </CardTitle>
                  {/* Actions placed on the same line in wide viewports to save vertical space */}
                  {/* <div className="hidden lg:flex items-center gap-2">
                    <Button variant="outline" className="h-9">
                      Chat now
                    </Button>
                  </div> */}
                </div>

                {/* Metrics area: highlighted, easy to scan */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Average Rating */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Rating</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {/* <span className="text-base font-medium">
                          {shop.star || 0}
                        </span> */}
                        {/* Hiển thị 5 sao, sao tô đầy theo điểm số; sao rỗng vẫn giữ stroke vàng để đồng bộ brand */}
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={cn(
                              "w-4 h-4 text-yellow-400",
                              idx < Math.round(shop?.star || 0) &&
                                "fill-yellow-400"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Total Reviews */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Reviews</div>
                    <div className="text-xs font-bold text-primary leading-none">
                      {shop?.totalReview}
                    </div>
                  </div>

                  {/* Total products */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">
                      Products
                    </div>
                    <div className="text-xs font-bold text-primary leading-none">
                      {shop?.totalProduct}
                    </div>
                  </div>

                  {/* Time since created */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Created</div>
                    <div className="text-xs font-bold text-primary leading-none whitespace-nowrap">
                      {shop?.timeRequest}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right action group - displayed at the bottom on mobile */}
              {/* <div className="flex lg:hidden w-full">
                <Button variant="outline" className="w-full">
                  Chat now
                </Button>
              </div> */}
            </div>
          </CardHeader>
        </Card>

        {/* LAYOUT CHÍNH: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 relative">
          {/* SIDEBAR BÊN TRÁI - BỘ LỌC */}
          <div className="w-full lg:w-48 lg:flex-shrink-0 mb-6 lg:mb-0 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]">
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold">Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1">
              {/* Categories */}
              {collections?.length > 0 &&
                collections?.map((cat: ShopCollectionItem) => (
                  <div
                    key={cat.id}
                    onClick={() =>
                      handleSelectCategory(
                        typeof cat.id === "string" ? null : Number(cat.id)
                      )
                    }
                    className={cn(
                      "flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer lg:border-r-2",
                      activeCategoryId ===
                        (typeof cat.id === "string" ? null : Number(cat.id)) &&
                        "bg-gray-50 border-black"
                    )}
                  >
                    <p className="text-sm">{cat.name}</p>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {cat.totalProduct || 0}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>

          {/* CONTENT BÊN PHẢI */}
          <div className="flex-1">
            {/* Header với sort và view options */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 flex-wrap">
                <h2 className="text-2xl font-bold">Featured items</h2>
                <div className="flex flex-wrap items-center gap-4 justify-end">
                  {/* Ô tìm kiếm theo yêu cầu: nhập từ khóa và click/Enter để tìm */}
                  <div className="flex items-center gap-2">
                    <Input
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      placeholder="Search products..."
                      className="w-48 sm:w-64"
                    />

                    <Select
                      value={sort}
                      onValueChange={value => {
                        setPagination(prev => ({
                          ...prev,
                          currentPage: 0,
                        }));
                        setSort(value as "asc" | "desc");
                        // Không gọi API trực tiếp, đã có effect theo dõi deps để fetch.
                      }}
                    >
                      <SelectTrigger className="w-[120px] sm:w-32">
                        <SelectValue placeholder="Custom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Low to High</SelectItem>
                        <SelectItem value="desc">High to Low</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Nút tìm kiếm chỉ hiển thị icon để gọn UI */}
                    <Button
                      onClick={handleSearch}
                      size="icon"
                      aria-label="Search products"
                      title="Search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Result Information */}
              <div className="text-sm text-muted-foreground mb-4">
                Displaying {products.length} of {totalElements} products
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <CustomPagination
                      currentPage={pagination.currentPage + 1}
                      totalPages={totalPages}
                      onPageChange={page => {
                        setPagination(prev => ({
                          ...prev,
                          currentPage: page - 1,
                        }));
                      }}
                      className="justify-center"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import InputNumber from "@/components/common/InputNumber";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCardSimple from "@/components/common/ProductCardSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productService } from "./services/productServices";

/**
 * SearchPage - Trang hiển thị kết quả tìm kiếm sản phẩm
 * Hiển thị danh sách sản phẩm với bộ lọc và phân trang dựa trên từ khóa tìm kiếm
 */
const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const [keyword, setKeyword] = useState("");

  /**
   * @function fetchProducts
   * @description Lấy danh sách sản phẩm dựa trên filters và keyword.
   * Cập nhật trạng thái loading, products, totalPages và error.
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // API call to fetch products based on filters and keyword
      const response = await productService.getProductsBySearchKeyword({
        keyword: keyword,
        currentPage: filters.currentPage,
        pageSize: filters.pageSize,
        popular: filters.popular,
        latest: filters.latest,
        bestSell: filters.bestSell,
        price: filters.price,
        priceFrom: filters.priceFrom ? Number(filters.priceFrom) : undefined,
        priceTo: filters.priceTo ? Number(filters.priceTo) : undefined,
      });
      setProducts(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      setError("Không thể tải sản phẩm. Vui lòng thử lại.");
      console.error("Lỗi khi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

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
      if (field === "priceFrom") {
        debouncedUpdatePriceFilters(value, priceInputs.priceTo);
      } else {
        debouncedUpdatePriceFilters(priceInputs.priceFrom, value);
      }
    },
    [debouncedUpdatePriceFilters, priceInputs.priceFrom, priceInputs.priceTo]
  );

  // Effect để cập nhật keyword từ URL khi component mount hoặc URL thay đổi
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchKeyword = queryParams.get("keyword") || "";
    setKeyword(searchKeyword);

    // Reset filters khi keyword thay đổi
    setFilters(prev => ({
      ...prev,
      currentPage: 0,
    }));

    // Sync priceInputs với filters
    setPriceInputs({
      priceFrom: "",
      priceTo: "",
    });
  }, [location.search]);

  // Effect để gọi API khi filters thay đổi
  useEffect(() => {
    fetchProducts();
  }, [filters, keyword]);

  // Cleanup effect để clear debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Results Section */}
        <div className="w-full">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Kết quả tìm kiếm cho: "{keyword}"</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Bộ lọc sản phẩm */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <Label className="text-sm font-medium">
                    Khoảng giá (VNĐ)
                  </Label>
                  <div className="space-y-2">
                    <InputNumber
                      value={Number(priceInputs.priceFrom)}
                      onChange={value =>
                        handlePriceInputChange("priceFrom", value.toString())
                      }
                    />
                    <InputNumber
                      value={Number(priceInputs.priceTo)}
                      onChange={value =>
                        handlePriceInputChange("priceTo", value.toString())
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

              <Separator />

              {/* Thông tin kết quả */}
              <div className="text-sm text-muted-foreground mb-4">
                Hiển thị {products.length} trong tổng số {totalElements} sản
                phẩm
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
                        <EmptyStateDisplay />
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
    </div>
  );
};

export default SearchPage;

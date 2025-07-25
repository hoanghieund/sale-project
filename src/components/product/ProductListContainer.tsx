import ProductCard from '@/components/product/ProductCard'; // Default import for ProductCard
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types'; // Assuming Product type is defined here
import React from 'react';

// Định nghĩa kiểu dữ liệu cho ProductFilters, có thể cần điều chỉnh
interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}

interface ProductListContainerProps {
  products: Product[];
  title: string;
  subtitle?: string;
  enableFilters?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  availableCategories?: string[];
  onFilterChange?: (filters: ProductFilters) => void;
  onSortChange?: (sortBy: string) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

/**
 * @component ProductListContainer
 * @param {ProductListContainerProps} props - Props cho component ProductListContainer.
 * @param {Product[]} props.products - Mảng các sản phẩm để hiển thị.
 * @param {string} props.title - Tiêu đề của trang danh sách sản phẩm.
 * @param {string} [props.subtitle] - Tiêu đề phụ của trang danh sách sản phẩm.
 * @param {boolean} [props.enableFilters=false] - Cho phép bật/tắt bộ lọc.
 * @param {boolean} [props.enableSorting=false] - Cho phép bật/tắt sắp xếp.
 * @param {boolean} [props.enablePagination=false] - Cho phép bật/tắt phân trang.
 * @param {string[]} [props.availableCategories] - Danh sách các danh mục có sẵn cho bộ lọc.
 * @param {(filters: ProductFilters) => void} [props.onFilterChange] - Callback khi bộ lọc thay đổi.
 * @param {(sortBy: string) => void} [props.onSortChange] - Callback khi tùy chọn sắp xếp thay đổi.
 * @param {(page: number) => void} [props.onPageChange] - Callback khi trang thay đổi.
 * @param {number} [props.currentPage=1] - Trang hiện tại cho phân trang.
 * @param {number} [props.totalPages=1] - Tổng số trang cho phân trang.
 * @returns {JSX.Element} Component ProductListContainer.
 */
const ProductListContainer: React.FC<ProductListContainerProps> = ({
  products,
  title,
  subtitle,
  enableFilters = false,
  enableSorting = false,
  enablePagination = false,
  availableCategories,
  onFilterChange,
  onSortChange,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}) => {
  const [currentFilters, setCurrentFilters] = React.useState<ProductFilters>({});
  const [currentSort, setCurrentSort] = React.useState<string>('');

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...currentFilters, [key]: value };
    setCurrentFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    onSortChange?.(value);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600 mb-6">{subtitle}</p>}

      {(enableFilters || enableSorting) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {enableFilters && (
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-grow"
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          )}
          {enableFilters && availableCategories && availableCategories.length > 0 && (
            <Select onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {enableSorting && (
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Giá: Thấp đến Cao</SelectItem>
                <SelectItem value="price-desc">Giá: Cao đến Thấp</SelectItem>
                <SelectItem value="name-asc">Tên: A-Z</SelectItem>
                <SelectItem value="name-desc">Tên: Z-A</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
          </div>
        )}
      </div>

      {enablePagination && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductListContainer;
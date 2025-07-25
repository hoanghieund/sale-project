import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { XCircle } from 'lucide-react'; // Assuming lucide-react for XCircle icon
import React from 'react';

interface SearchAndFilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterOptions: Array<{ label: string; value: string }>;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  clearFiltersAction?: () => void;
  showClearButton?: boolean;
}

/**
 * @component SearchAndFilterControls
 * @param {SearchAndFilterControlsProps} props - Props cho component SearchAndFilterControls.
 * @param {string} props.searchTerm - Giá trị hiện tại của thanh tìm kiếm.
 * @param {(term: string) => void} props.onSearchChange - Callback khi giá trị tìm kiếm thay đổi.
 * @param {Array<{ label: string; value: string }>} props.filterOptions - Các tùy chọn cho bộ lọc dropdown.
 * @param {string} props.selectedFilter - Giá trị bộ lọc hiện đang được chọn.
 * @param {(filter: string) => void} props.onFilterChange - Callback khi bộ lọc thay đổi.
 * @param {() => void} [props.clearFiltersAction] - Hàm callback để xóa tất cả các bộ lọc.
 * @param {boolean} [props.showClearButton=false] - Hiển thị nút xóa bộ lọc.
 * @returns {JSX.Element} Component SearchAndFilterControls.
 */
const SearchAndFilterControls: React.FC<SearchAndFilterControlsProps> = ({
  searchTerm,
  onSearchChange,
  filterOptions,
  selectedFilter,
  onFilterChange,
  clearFiltersAction,
  showClearButton = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg shadow-sm bg-white">
      <Input
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-auto flex-grow"
      />
      <Select onValueChange={onFilterChange} value={selectedFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Lọc theo..." />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showClearButton && clearFiltersAction && (
        <Button variant="outline" onClick={clearFiltersAction} className="w-full sm:w-auto">
          <XCircle className="h-4 w-4 mr-2" />
          Xóa lọc
        </Button>
      )}
    </div>
  );
};

export default SearchAndFilterControls;
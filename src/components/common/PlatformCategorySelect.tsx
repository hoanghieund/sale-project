/**
 * @file PlatformCategorySelect - Component chọn danh mục nền tảng (platform category)
 * Tái sử dụng cho các form khác nhau. Tự fetch cây danh mục và render đệ quy SelectItem.
 *
 * Lưu ý: Khi module logger Winston sẵn sàng, thay console.error bằng logger để thống nhất ghi nhật ký.
 */

import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesService } from "@/features/seller/categories/services/categoriesService";
import { Category } from "@/types";
import React, { useEffect, useState } from "react";

/**
 * @interface PlatformCategorySelectProps
 * @description Props cho component PlatformCategorySelect.
 * @property {string} value - Giá trị hiện tại (id danh mục dưới dạng string)
 * @property {(value: string) => void} onChange - Hàm gọi khi chọn danh mục
 * @property {boolean} [disabled] - Vô hiệu hoá Select
 * @property {string} [placeholder] - Placeholder cho Select
 * @property {string} [className] - Class bổ sung cho SelectTrigger
 */
interface PlatformCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

/**
 * @function PlatformCategorySelect
 * @description Component Select để chọn Platform category. Tự fetch dữ liệu và render đệ quy.
 */
export const PlatformCategorySelect: React.FC<PlatformCategorySelectProps> = ({
  value,
  onChange,
  disabled,
  placeholder = "Select platform category",
  className,
}) => {
  // State: dữ liệu cây danh mục và trạng thái loading
  const [tree, setTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch danh mục cha/con để hiển thị
  useEffect(() => {
    let mounted = true; // tránh setState khi unmounted
    const fetchTree = async () => {
      setLoading(true);
      try {
        const res: Category[] = await categoriesService.getTreeCategory(
          0,
          1000
        );
        if (mounted) setTree(res);
      } catch (err) {
        // TODO: thay thế bằng Winston logger khi module sẵn sàng
        console.error("Failed to load platform categories:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTree();
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * @function renderOptions
   * @description Render đệ quy các SelectItem với indent theo depth.
   */
  const renderOptions = (cats: Category[], depth = 0): JSX.Element[] => {
    const prefix = depth > 0 ? `${"— ".repeat(depth)}` : ""; // indent trực quan
    return cats.flatMap(cat => {
      const label = `${prefix}${cat.name ?? `Category #${cat.id}`}`;
      const nodes: JSX.Element[] = [
        <SelectItem key={`cat-${cat.id}`} value={String(cat.id)}>
          {label}
        </SelectItem>,
      ];
      if (cat.child && cat.child.length > 0) {
        nodes.push(...renderOptions(cat.child, depth + 1));
      }
      return nodes;
    });
  };

  return (
    <Select
      onValueChange={onChange}
      value={value}
      disabled={disabled || loading}
    >
      {/* FormControl để đảm bảo SelectTrigger nhận ARIA/id từ FormField context nếu có */}
      <FormControl>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>{renderOptions(tree)}</SelectContent>
    </Select>
  );
};

export default PlatformCategorySelect;

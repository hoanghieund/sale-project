/**
 * @file Component CategoryTable để hiển thị và quản lý danh sách danh mục sản phẩm.
 * Cung cấp chức năng tìm kiếm, chỉnh sửa, xóa danh mục và tạo danh mục mới.
 * Sử dụng shadcn/ui components cho giao diện bảng và dropdown menu.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/features/seller/types";
import { Edit, GripVertical, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

/**
 * @interface CategoryTableProps
 * @description Props cho component CategoryTable.
 * @property {Category[]} categories - Danh sách các danh mục cần hiển thị.
 * @property {(category: Category) => void} onEdit - Hàm xử lý khi người dùng click chỉnh sửa danh mục.
 * @property {(category: Category) => void} onDelete - Hàm xử lý khi người dùng click xóa danh mục.
 * @property {() => void} onCreateNew - Hàm xử lý khi người dùng click tạo danh mục mới.
 */
interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onCreateNew: () => void;
}

/**
 * @function CategoryTable
 * @description Component bảng hiển thị danh sách danh mục.
 * @param {CategoryTableProps} props - Props của component.
 * @returns {JSX.Element} Component CategoryTable.
 */
export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
  onCreateNew,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const { state } = useSeller(); // Có thể sử dụng state từ context nếu cần thông tin global

  // Lọc danh mục dựa trên từ khóa tìm kiếm
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * @function handleDelete
   * @description Xử lý logic khi người dùng muốn xóa một danh mục.
   * Kiểm tra nếu là danh mục mặc định "All" thì không cho xóa.
   * Yêu cầu xác nhận trước khi xóa.
   * @param {Category} category - Danh mục cần xóa.
   */
  const handleDelete = (category: Category) => {
    if (category.isDefault) {
      alert("Không thể xóa danh mục mặc định 'All'");
      return;
    }
    // TODO: Cần thêm logic kiểm tra xem danh mục có sản phẩm hay không trước khi xóa
    // Nếu có sản phẩm, cần cảnh báo và yêu cầu chuyển sản phẩm sang danh mục khác (ví dụ "All")
    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.name}"?`)) {
      onDelete(category);
    }
  };

  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm và nút Thêm danh mục */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* Bảng hiển thị danh mục */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead> {/* Cột kéo thả */}
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-right">Loại</TableHead>
              <TableHead className="w-[100px] text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {/* Icon kéo thả */}
                  <GripVertical className="h-4 w-4 text-gray-400" />
                </TableCell>
                <TableCell className="font-medium">
                  {category.name}
                  {/* Badge "Mặc định" cho danh mục "All" */}
                  {category.isDefault && (
                    <Badge variant="secondary" className="ml-2">
                      Mặc định
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{category.description || "-"}</TableCell>
                <TableCell className="text-right">
                  {/* Hiển thị loại danh mục dựa trên isDefault */}
                  <Badge variant={category.isDefault ? "default" : "secondary"}>
                    {category.isDefault ? "Mặc định" : "Thông thường"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* Dropdown menu hành động */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* Nút Chỉnh sửa */}
                      <DropdownMenuItem onClick={() => onEdit(category)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      {/* Nút Xóa (không hiển thị cho danh mục mặc định) */}
                      {!category.isDefault && (
                        <DropdownMenuItem
                          onClick={() => handleDelete(category)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Thông báo khi không tìm thấy danh mục */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy danh mục nào
        </div>
      )}
    </div>
  );
};
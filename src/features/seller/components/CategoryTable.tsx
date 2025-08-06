import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

/**
 * @typedef {object} Category
 * @property {string} id - ID của danh mục.
 * @property {string} name - Tên của danh mục.
 * @property {string} [description] - Mô tả của danh mục (tùy chọn).
 */
interface Category {
  id: string;
  name: string;
  description?: string;
}

/**
 * @typedef {object} CategoryTableProps
 * @property {Category[]} categories - Mảng các danh mục để hiển thị.
 * @property {(category: Category) => void} onEdit - Hàm callback khi người dùng click chỉnh sửa.
 * @property {(categoryId: string) => void} onDelete - Hàm callback khi người dùng click xóa.
 */
interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

/**
 * CategoryTable component
 *
 * Component này hiển thị danh sách các danh mục trong một bảng.
 * Mỗi hàng bao gồm thông tin danh mục và các nút hành động (chỉnh sửa, xóa).
 *
 * @param {CategoryTableProps} props - Props của component.
 * @returns {JSX.Element}
 */
const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên danh mục</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              Không có danh mục nào.
            </TableCell>
          </TableRow>
        ) : (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description || 'N/A'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(category)}
                  className="mr-2"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(category.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
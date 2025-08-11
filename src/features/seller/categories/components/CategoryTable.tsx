/**
 * @file Component CategoryTable để hiển thị và quản lý danh sách danh mục sản phẩm.
 * Cung cấp chức năng tìm kiếm, chỉnh sửa, xóa danh mục và tạo danh mục mới.
 * Sử dụng shadcn/ui components cho giao diện bảng và dropdown menu.
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Dialog xác nhận UI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CollectionResponse } from "@/types";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Điều hướng tới trang sửa danh mục
import { toast } from "sonner"; // Thông báo người dùng
import { categoriesService } from "../services/categoriesService"; // Gọi API xóa danh mục

interface Category extends CollectionResponse {
  isAll: boolean;
}

/**
 * @interface CategoryTableProps
 * @description Props cho component CategoryTable.
 * @property {Category[]} categories - Danh sách các danh mục cần hiển thị.
 * @property {() => void} [onDeleted] - Callback để parent re-fetch sau khi xóa thành công.
 */
interface CategoryTableProps {
  categories: Category[];
  onDeleted?: () => void;
}

/**
 * @function CategoryTable
 * @description Component bảng hiển thị danh sách danh mục.
 * @param {CategoryTableProps} props - Props của component.
 * @returns {JSX.Element} Component CategoryTable.
 */
export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onDeleted,
}) => {
  // Hook điều hướng
  const navigate = useNavigate();
  // State quản lý dialog xác nhận xóa
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  /**
   * @function handleDelete
   * @description Xử lý logic khi người dùng muốn xóa một danh mục.
   * Kiểm tra nếu là danh mục mặc định "All" thì không cho xóa.
   * Yêu cầu xác nhận trước khi xóa.
   * @param {Category} category - Danh mục cần xóa.
   */
  const handleDelete = (category: Category) => {
    // Không cho xóa danh mục mặc định
    if (category.isAll) return;
    setDeleteTarget(category);
    setIsConfirmOpen(true);
  };

  /**
   * @function confirmDelete
   * @description Xác nhận xóa và gọi API xóa danh mục.
   */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await categoriesService.deleteCollection(String(deleteTarget.id));
      toast.success("Category deleted successfully");
      // Đóng dialog và reset target
      setIsConfirmOpen(false);
      setDeleteTarget(null);
      // Gọi callback parent để re-fetch danh sách sau khi xóa
      onDeleted?.();
    } catch (err: any) {
      toast.error("Failed to delete category", {
        description: err?.message ?? "Please try again later.",
      });
    }
  };

  /**
   * @function handleEdit
   * @description Điều hướng đến trang chỉnh sửa danh mục.
   */
  const handleEdit = (category: Category) => {
    if (category.isAll) return; // An toàn: không cho sửa danh mục mặc định
    navigate(`/seller/categories/edit/${category.id}`);
  };

  return (
    <div className="space-y-4">
      {/* Bảng hiển thị danh mục */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category name</TableHead>
              <TableHead className="text-right">Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {category.name}
                    {/* Badge "Mặc định" cho danh mục "All" */}
                    {category.isAll && (
                      <Badge variant="secondary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Hiển thị loại danh mục dựa trên isDefault */}
                    <Badge variant={category.isAll ? "default" : "secondary"}>
                      {category.isAll ? "Default" : "Regular"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Dropdown menu hành động */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled={category.isAll}
                          title={
                            category.isAll
                              ? "Default category cannot be edited/deleted"
                              : "No available actions"
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Nút Chỉnh sửa: chỉ hiển thị khi KHÔNG phải mặc định */}
                        {!category.isAll && (
                          <DropdownMenuItem
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {/* Nút Xóa: chỉ hiển thị khi KHÔNG phải mặc định */}
                        {!category.isAll && (
                          <DropdownMenuItem
                            onClick={() => handleDelete(category)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center py-8 text-gray-500 w-full">
                <TableCell colSpan={3}>No categories found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog xác nhận xóa danh mục */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm delete category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete category{" "}
              <span className="font-semibold">{deleteTarget?.name}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

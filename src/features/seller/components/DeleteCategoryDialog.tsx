/**
 * @file Component DeleteCategoryDialog hiển thị hộp thoại xác nhận xóa danh mục.
 * Cung cấp một giao diện người dùng để xác nhận hành động xóa và hiển thị thông tin danh mục sẽ bị xóa.
 * Sử dụng shadcn/ui AlertDialog components.
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/seller"; // Import Category interface
import React from "react";

/**
 * @interface DeleteCategoryDialogProps
 * @description Props cho component DeleteCategoryDialog.
 * @property {boolean} isOpen - Trạng thái hiển thị của dialog.
 * @property {() => void} onClose - Hàm xử lý khi đóng dialog.
 * @property {() => void} onConfirm - Hàm xử lý khi xác nhận xóa.
 * @property {Category} category - Đối tượng danh mục cần xóa.
 * @property {boolean} isLoading - Trạng thái loading khi đang xử lý xóa.
 */
interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  category: Category;
  isLoading: boolean;
}

/**
 * @function DeleteCategoryDialog
 * @description Component hộp thoại xác nhận xóa danh mục.
 * @param {DeleteCategoryDialogProps} props - Props của component.
 * @returns {JSX.Element} Component DeleteCategoryDialog.
 */
const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  category,
  isLoading,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa danh mục "
            <span className="font-semibold text-red-600">{category.name}</span>
            " không?
            <br />
            Hành động này không thể hoàn tác.
            {/* TODO: Thêm cảnh báo nếu danh mục có sản phẩm */}
            {/* Nếu danh mục có sản phẩm, cần thêm logic chuyển sản phẩm về "All" */}
            {/* Ví dụ: <p className="mt-2 text-sm text-yellow-600">Lưu ý: Tất cả sản phẩm trong danh mục này sẽ được chuyển về danh mục "All".</p> */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Hủy
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Đang xóa..." : "Xóa"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
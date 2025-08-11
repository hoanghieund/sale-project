/**
 * @file Component DeleteProductDialog hiển thị hộp thoại xác nhận xóa sản phẩm.
 * Cung cấp một giao diện người dùng để xác nhận hành động xóa và hiển thị thông tin sản phẩm sẽ bị xóa.
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
import { Product } from "@/types"; // Đồng bộ kiểu Product toàn dự án
import React from "react";

/**
 * @interface DeleteProductDialogProps
 * @description Props cho component DeleteProductDialog.
 * @property {boolean} isOpen - Trạng thái hiển thị của dialog.
 * @property {() => void} onClose - Hàm xử lý khi đóng dialog.
 * @property {() => void} onConfirm - Hàm xử lý khi xác nhận xóa.
 * @property {Product} product - Đối tượng sản phẩm cần xóa.
 * @property {boolean} isLoading - Trạng thái loading khi đang xử lý xóa.
 */
interface DeleteProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Product;
  isLoading: boolean;
}

/**
 * @function DeleteProductDialog
 * @description Component hộp thoại xác nhận xóa sản phẩm.
 * @param {DeleteProductDialogProps} props - Props của component.
 * @returns {JSX.Element} Component DeleteProductDialog.
 */
const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isLoading,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa sản phẩm "
            {/* Hiển thị theo trường 'title' chuẩn của Product */}
            <span className="font-semibold text-red-600">{product.title}</span>
            " không?
            <br />
            Hành động này không thể hoàn tác.
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

export default DeleteProductDialog;
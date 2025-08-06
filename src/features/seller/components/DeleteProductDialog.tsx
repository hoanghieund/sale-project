import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React from 'react';

interface DeleteProductDialogProps {
  isOpen: boolean; // Trạng thái mở/đóng của dialog
  onClose: () => void; // Hàm xử lý khi đóng dialog
  onConfirm: () => void; // Hàm xử lý khi xác nhận xóa
  productName: string; // Tên sản phẩm cần xóa
}

/**
 * @component DeleteProductDialog
 * @description Component dialog xác nhận xóa sản phẩm.
 * Sử dụng shadcn-ui alert-dialog.
 * @param {DeleteProductDialogProps} props - Props của component.
 * @returns {JSX.Element}
 */
const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa sản phẩm <span className="font-semibold">{productName}</span> này không?
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
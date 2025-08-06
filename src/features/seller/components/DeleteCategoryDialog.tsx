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

/**
 * @typedef {object} DeleteCategoryDialogProps
 * @property {boolean} isOpen - Trạng thái hiển thị của dialog.
 * @property {() => void} onClose - Hàm callback khi dialog được đóng.
 * @property {() => void} onConfirm - Hàm callback khi người dùng xác nhận xóa.
 * @property {boolean} isLoading - Trạng thái loading khi đang xử lý xóa.
 */
interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

/**
 * DeleteCategoryDialog component
 *
 * Component này hiển thị một dialog xác nhận trước khi xóa một danh mục.
 *
 * @param {DeleteCategoryDialogProps} props - Props của component.
 * @returns {JSX.Element}
 */
const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Thao tác này sẽ xóa vĩnh viễn danh mục
            này khỏi hệ thống của bạn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Đang xóa...' : 'Xóa'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
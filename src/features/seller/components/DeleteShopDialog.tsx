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
import { Button } from '@/components/ui/button';
import React from 'react';

interface DeleteShopDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  shopName: string;
}

/**
 * @component DeleteShopDialog
 * @description Component dialog xác nhận xóa shop.
 * @param {boolean} isOpen - Trạng thái đóng mở của dialog.
 * @param {function} onClose - Hàm xử lý khi đóng dialog.
 * @param {function} onConfirm - Hàm xử lý khi xác nhận xóa.
 * @param {string} shopName - Tên shop sẽ bị xóa.
 */
const DeleteShopDialog: React.FC<DeleteShopDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  shopName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa shop này?</AlertDialogTitle>
          <AlertDialogDescription>
            Thao tác này sẽ xóa vĩnh viễn shop "{shopName}" khỏi hệ thống của bạn.
            Bạn không thể hoàn tác hành động này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Xóa
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShopDialog;
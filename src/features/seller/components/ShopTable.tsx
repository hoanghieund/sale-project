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
import { Shop } from './ShopForm'; // Import kiểu Shop từ ShopForm

interface ShopTableProps {
  shops: Shop[];
  onEdit: (shop: Shop) => void;
  onDelete: (shopId: string) => void;
}

/**
 * @component ShopTable
 * @description Component bảng để hiển thị danh sách các shop.
 * @param {Shop[]} shops - Danh sách các shop để hiển thị.
 * @param {function} onEdit - Hàm xử lý khi nhấn nút chỉnh sửa.
 * @param {function} onDelete - Hàm xử lý khi nhấn nút xóa.
 */
const ShopTable: React.FC<ShopTableProps> = ({ shops, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Tên Shop</TableHead>
          <TableHead>Địa chỉ</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell className="font-medium">{shop.id}</TableCell>
            <TableCell>{shop.name}</TableCell>
            <TableCell>{shop.address}</TableCell>
            <TableCell>{shop.description}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(shop)}
                className="mr-2"
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Chỉnh sửa</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(shop.id)}
              >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Xóa</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShopTable;
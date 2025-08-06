import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

// Định nghĩa kiểu dữ liệu cho một sản phẩm
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

interface ProductTableProps {
  products: Product[]; // Danh sách sản phẩm
  onEdit: (product: Product) => void; // Hàm xử lý khi chỉnh sửa sản phẩm
  onDelete: (productId: string) => void; // Hàm xử lý khi xóa sản phẩm
}

/**
 * @component ProductTable
 * @description Component bảng để hiển thị danh sách các sản phẩm.
 * Mỗi hàng sẽ có các nút hành động (chỉnh sửa, xóa).
 * Sử dụng shadcn-ui table component.
 * @param {ProductTableProps} props - Props của component.
 * @returns {JSX.Element}
 */
const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Không có sản phẩm nào.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description.substring(0, 50)}...</TableCell> {/* Giới hạn mô tả */}
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="mr-2">
                    Chỉnh sửa
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
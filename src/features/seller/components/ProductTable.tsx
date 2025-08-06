/**
 * @file Component ProductTable hiển thị và quản lý danh sách sản phẩm.
 * Cung cấp chức năng tìm kiếm, lọc theo danh mục, chỉnh sửa, xóa sản phẩm.
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Product } from "@/types/seller";
import { format } from "date-fns";
import { Edit, Filter, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";

/**
 * @interface ProductTableProps
 * @description Props cho component ProductTable.
 * @property {Product[]} products - Danh sách các sản phẩm cần hiển thị.
 * @property {Category[]} categories - Danh sách các danh mục để lọc sản phẩm.
 * @property {(product: Product) => void} onEdit - Hàm xử lý khi người dùng click chỉnh sửa sản phẩm.
 * @property {(product: Product) => void} onDelete - Hàm xử lý khi người dùng click xóa sản phẩm.
 */
interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

/**
 * @function ProductTable
 * @description Component bảng hiển thị danh sách sản phẩm.
 * @param {ProductTableProps} props - Props của component.
 * @returns {JSX.Element} Component ProductTable.
 */
export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm và danh mục
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * @function handleDelete
   * @description Xử lý logic khi người dùng muốn xóa một sản phẩm.
   * Yêu cầu xác nhận trước khi xóa.
   * @param {Product} product - Sản phẩm cần xóa.
   */
  const handleDelete = (product: Product) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
      onDelete(product);
    }
  };

  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm và lọc */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Tìm kiếm sản phẩm theo tên hoặc mô tả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9 md:flex-1"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px] h-9">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Lọc theo danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bảng hiển thị sản phẩm */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Kho</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="w-[100px] text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const categoryName = categories.find(cat => cat.id === product.categoryId)?.name || "N/A";
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.images[0] || "/placeholder.svg"} // Sử dụng ảnh đầu tiên hoặc ảnh placeholder
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{categoryName}</TableCell>
                  <TableCell>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "Đang bán" : "Ngừng bán"}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(product.createdAt), "dd/MM/yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Thông báo khi không tìm thấy sản phẩm */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy sản phẩm nào
        </div>
      )}
    </div>
  );
};
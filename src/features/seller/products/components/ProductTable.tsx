/**
 * @file Component ProductTable hiển thị và quản lý danh sách sản phẩm.
 * Chỉ render dữ liệu và cung cấp action (chỉnh sửa, xóa, đổi trạng thái).
 * Tìm kiếm và phân trang được thực hiện ở trang cha (server-side) để đồng bộ API.
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { formatCurrencyUSD, formatDate } from "@/utils/formatters"; // Chuẩn hóa định dạng tiền tệ + ngày tháng qua util
import { Edit, MoreHorizontal } from "lucide-react";
import React from "react";

/**
 * @interface ProductTableProps
 * @description Props cho component ProductTable.
 * @property {Product[]} products - Danh sách các sản phẩm cần hiển thị.
 * @property {(product: Product) => void} onEdit - Hàm xử lý khi người dùng click chỉnh sửa sản phẩm.
 * @property {(product: Product) => void} onDelete - Hàm xử lý khi người dùng click xóa sản phẩm.
 * @property {(product: Product, nextStatus: boolean) => void} [onToggleStatus] - Hàm đổi trạng thái hiển thị.
 */
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleStatus?: (product: Product, nextStatus: boolean) => void;
}

/**
 * @function ProductTable
 * @description Component bảng hiển thị danh sách sản phẩm.
 * @param {ProductTableProps} props - Props của component.
 * @returns {JSX.Element} Component ProductTable.
 */
export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  /**
   * @function handleDelete
   * @description Xử lý logic khi người dùng muốn xóa một sản phẩm.
   * Yêu cầu xác nhận trước khi xóa.
   * @param {Product} product - Sản phẩm cần xóa.
   */
  const handleDelete = (product: Product) => {
    // Confirm hiển thị theo title (theo '@/types')
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.title}"?`)) {
      onDelete(product);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bảng hiển thị sản phẩm */}
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[900px] md:min-w-0">
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead className="w-1/5">Tên sản phẩm</TableHead>
              <TableHead className="hidden md:table-cell">Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead className="hidden md:table-cell">Kho</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => {
              // Map theo cấu trúc Product từ '@/types'
              // Tạo tên danh mục an toàn: chỉ hiển thị child nếu tồn tại
              const parentSlug = product.collectionResponse?.categoryTree?.slug;
              const childSlug =
                product.collectionResponse?.categoryTree?.child?.slug;
              const categoryName = parentSlug
                ? childSlug
                  ? `${parentSlug} / ${childSlug}`
                  : parentSlug
                : "N/A";
              const imageSrc =
                product.imagesDTOList && product.imagesDTOList.length > 0
                  ? product.imagesDTOList[0]?.path || "/placeholder.svg"
                  : "/placeholder.svg";
              const price =
                typeof product.price === "number" ? product.price : 0;
              const stock =
                typeof product.totalProduct === "number"
                  ? product.totalProduct
                  : 0;
              const isActive = !!product.status; // status: boolean
              // Định dạng ngày tạo an toàn qua util (fallback '-')
              const createdAt = formatDate(product.timeCreate) || "-";
              return (
                <TableRow key={product.id}>
                  <TableCell className="w-16">
                    {/* Ảnh thumbnail: ưu tiên ảnh đầu tiên */}
                    <img
                      src={imageSrc}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-[160px] truncate md:max-w-none">
                    {product.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {categoryName}
                  </TableCell>
                  {/* Định dạng giá bằng util chung để đảm bảo nhất quán toàn hệ thống */}
                  <TableCell>{formatCurrencyUSD(price)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {stock}
                  </TableCell>
                  <TableCell>
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Đang bán" : "Ngừng bán"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {createdAt}
                  </TableCell>
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
                        {typeof onToggleStatus === "function" && (
                          <DropdownMenuItem
                            onClick={() => onToggleStatus(product, !isActive)}
                          >
                            {isActive
                              ? "Ẩn trên gian hàng"
                              : "Hiển thị trên gian hàng"}
                          </DropdownMenuItem>
                        )}
                        {/* <DropdownMenuItem
                          onClick={() => handleDelete(product)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem> */}
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
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy sản phẩm nào
        </div>
      )}
    </div>
  );
};

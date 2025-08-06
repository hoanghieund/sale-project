import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { v4 as uuidv4 } from 'uuid'; // Để tạo ID duy nhất

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteProductDialog from '@/features/seller/components/DeleteProductDialog';
import ProductTable from '@/features/seller/components/ProductTable';

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

/**
 * @component ProductManagementPage
 * @description Trang Quản lý Sản phẩm Shop của kênh bán hàng.
 * Cho phép xem, thêm, sửa, xóa sản phẩm.
 * @returns {JSX.Element} ProductManagementPage component.
 */
const ProductManagementPage: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // State để lưu trữ danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([
    // Dữ liệu sản phẩm mẫu
    {
      id: uuidv4(),
      name: 'Áo thun nam',
      description: 'Áo thun cotton cao cấp, thoáng mát, phù hợp mặc hàng ngày.',
      price: 15.99,
      stock: 100,
      category: 'clothing',
      imageUrl: 'https://via.placeholder.com/150/0000FF/808080?text=Ao+Thun',
    },
    {
      id: uuidv4(),
      name: 'Điện thoại thông minh X',
      description: 'Điện thoại cao cấp với camera 108MP và màn hình AMOLED.',
      price: 699.00,
      stock: 50,
      category: 'electronics',
      imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Dien+Thoai',
    },
    {
      id: uuidv4(),
      name: 'Sách: Lập trình React',
      description: 'Cuốn sách hướng dẫn toàn diện về lập trình React cho người mới bắt đầu.',
      price: 25.00,
      stock: 200,
      category: 'books',
      imageUrl: 'https://via.placeholder.com/150/00FF00/000000?text=Lap+Trinh+React',
    },
  ]);

  // State quản lý trạng thái mở/đóng của dialog xóa
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // State lưu trữ ID sản phẩm cần xóa
  const [productToDeleteId, setProductToDeleteId] = useState<string | undefined>(undefined);
  // State lưu trữ tên sản phẩm cần xóa để hiển thị trong dialog
  const [productToDeleteName, setProductToDeleteName] = useState<string | undefined>(undefined);

  /**
   * @function handleAddProduct
   * @description Điều hướng đến trang thêm sản phẩm mới.
   */
  const handleAddProduct = () => {
    navigate('/seller/products/create');
  };

  /**
   * @function handleEditProduct
   * @description Điều hướng đến trang chỉnh sửa sản phẩm.
   * @param {Product} product - Sản phẩm cần chỉnh sửa.
   */
  const handleEditProduct = (product: Product) => {
    navigate(`/seller/products/edit/${product.id}`);
  };

  /**
   * @function handleDeleteProduct
   * @description Mở dialog xác nhận xóa sản phẩm.
   * @param {string} productId - ID của sản phẩm cần xóa.
   */
  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProductToDeleteId(productId);
      setProductToDeleteName(product.name);
      setIsDeleteDialogOpen(true);
    }
  };

  /**
   * @function handleConfirmDelete
   * @description Xác nhận xóa sản phẩm khỏi danh sách.
   */
  const handleConfirmDelete = () => {
    if (productToDeleteId) {
      setProducts(products.filter(product => product.id !== productToDeleteId));
      setIsDeleteDialogOpen(false);
      setProductToDeleteId(undefined);
      setProductToDeleteName(undefined);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tiêu đề và nút thêm mới */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản Lý Sản Phẩm</h1>
        <Button onClick={handleAddProduct}>Thêm Sản Phẩm Mới</Button>
      </div>

      {/* Bảng hiển thị danh sách sản phẩm */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Sản Phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa sản phẩm */}
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDeleteName || ''}
      />
    </div>
  );
};

export default ProductManagementPage;
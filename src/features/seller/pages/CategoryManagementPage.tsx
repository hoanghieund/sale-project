import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircleIcon } from 'lucide-react';

import CategoryTable from '../components/CategoryTable';
import DeleteCategoryDialog from '../components/DeleteCategoryDialog';

// Định nghĩa kiểu dữ liệu cho Category
interface Category {
  id: string;
  name: string;
  description?: string;
}

/**
 * CategoryManagementPage component.
 * Trang Quản lý Danh mục Shop của kênh bán hàng.
 * @returns {JSX.Element} CategoryManagementPage component.
 */
const CategoryManagementPage: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Electronics', description: 'Thiết bị điện tử' },
    { id: '2', name: 'Fashion', description: 'Thời trang' },
    { id: '3', name: 'Home & Living', description: 'Đồ dùng gia đình' },
  ]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false); // Dùng để mô phỏng trạng thái loading

  /**
   * Điều hướng đến trang chỉnh sửa danh mục.
   * @param {Category} category - Danh mục cần chỉnh sửa.
   */
  const handleEdit = (category: Category) => {
    navigate(`/seller/categories/edit/${category.id}`); // Điều hướng đến trang chỉnh sửa
  };

  /**
   * Mở dialog xác nhận xóa danh mục.
   * @param {string} categoryId - ID của danh mục cần xóa.
   */
  const handleDelete = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Xử lý xác nhận xóa danh mục.
   */
  const handleConfirmDelete = () => {
    if (deletingCategoryId) {
      setIsLoading(true);
      setTimeout(() => {
        setCategories(
          categories.filter((cat) => cat.id !== deletingCategoryId)
        );
        setIsLoading(false);
        setIsDeleteDialogOpen(false);
        setDeletingCategoryId(undefined);
      }, 1000); // Mô phỏng API call
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Quản lý Danh mục</CardTitle>
          {/* Nút "Thêm danh mục" điều hướng đến trang tạo mới */}
          <Button onClick={() => navigate('/seller/categories/create')}>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Thêm danh mục
          </Button>
        </CardHeader>
        <CardContent>
          {/* Bảng hiển thị danh mục */}
          <CategoryTable
            categories={categories}
            onEdit={handleEdit} // Giữ lại hàm handleEdit để điều hướng
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <DeleteCategoryDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryManagementPage;
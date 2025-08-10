/**
 * @file Trang quản lý danh mục (Category Management Page) cho module Seller.
 * Hiển thị danh sách các danh mục, cho phép tìm kiếm, tạo mới, chỉnh sửa và xóa danh mục.
 * Sử dụng CategoryTable component để hiển thị dữ liệu.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryTable } from "@/features/seller/components/CategoryTable";
import DeleteCategoryDialog from "@/features/seller/components/DeleteCategoryDialog"; // Sẽ tạo sau
import { PageContainer } from "@/features/seller/components/PageContainer";
import { sellerAPI } from "@/features/seller/services/seller";
import { Category } from "@/features/seller/types";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react"; // Thêm useState
import { Link } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function CategoryManagementPage
 * @description Component trang quản lý danh mục.
 * @returns {JSX.Element} Trang quản lý danh mục.
 */
const CategoryManagementPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // State cho danh mục
  const [loading, setLoading] = useState(true); // State cho trạng thái loading
  const [error, setError] = useState<string | null>(null); // State cho lỗi
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  useEffect(() => {
    /**
     * @function fetchCategories
     * @description Hàm lấy danh sách danh mục từ API.
     */
    const fetchCategories = async () => {
      setLoading(true); // Bắt đầu loading
      setError(null); // Xóa lỗi cũ
      try {
        const categoriesData = await sellerAPI.getCategories();
        setCategories(categoriesData); // Cập nhật danh sách danh mục
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải danh mục."); // Đặt thông báo lỗi
        toast.error("Lỗi", {
          description: err.message || "Không thể tải danh mục sản phẩm.",
        });
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchCategories();
  }, []); // Loại bỏ dispatch khỏi dependency array vì không cần nữa

  /**
   * @function handleEditCategory
   * @description Xử lý khi người dùng click chỉnh sửa danh mục.
   * @param {Category} category - Danh mục cần chỉnh sửa.
   */
  const handleEditCategory = (category: Category) => {
    // Điều hướng đến trang chỉnh sửa danh mục
    // navigate(`/seller/categories/edit/${category.id}`); // Cần inject navigate hook
    console.log("Chỉnh sửa danh mục:", category);
  };

  /**
   * @function handleDeleteCategory
   * @description Mở dialog xác nhận xóa danh mục.
   * @param {Category} category - Danh mục cần xóa.
   */
  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };

  /**
   * @function confirmDeleteCategory
   * @description Xử lý xóa danh mục sau khi xác nhận.
   */
  const confirmDeleteCategory = async () => {
    if (categoryToDelete) {
      setLoading(true); // Bắt đầu loading
      try {
        await sellerAPI.deleteCategory(categoryToDelete.id);
        setCategories(categories.filter(cat => cat.id !== categoryToDelete.id)); // Cập nhật lại danh sách danh mục
        toast.success("Thành công", {
          description: "Xóa danh mục thành công!",
        });
      } catch (err: any) {
        toast.error("Lỗi", {
          description: err.message || "Không thể xóa danh mục.",
        });
      } finally {
        setLoading(false); // Kết thúc loading
        setShowDeleteDialog(false);
        setCategoryToDelete(null);
      }
    }
  };

  if (loading) {
    // Sử dụng state loading cục bộ
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageContainer>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Quản lý Danh mục Sản phẩm</CardTitle>
            <CardDescription>
              Tạo, chỉnh sửa và sắp xếp các danh mục sản phẩm của bạn.
            </CardDescription>
          </div>
          <Link to="/seller/categories/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm danh mục
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <CategoryTable
            categories={categories} // Sử dụng state categories cục bộ
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && categoryToDelete && (
        <DeleteCategoryDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDeleteCategory}
          category={categoryToDelete}
          isLoading={loading} // Sử dụng state loading cục bộ
        />
      )}
    </PageContainer>
  );
};

export default CategoryManagementPage;

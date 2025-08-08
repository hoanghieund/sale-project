/**
 * @file Trang chỉnh sửa danh mục (Edit Category Page) cho module Seller.
 * Cung cấp form để chủ shop chỉnh sửa thông tin của một danh mục sản phẩm hiện có.
 * Sử dụng CategoryForm component và lấy ID danh mục từ URL params.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/features/seller/components/CategoryForm"; // Sẽ tạo sau
import { PageContainer } from "@/features/seller/components/PageContainer";
import { sellerAPI } from "@/features/seller/services/seller";
import { Category } from "@/features/seller/types"; // Import Category interface
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function EditCategoryPage
 * @description Component trang chỉnh sửa danh mục sản phẩm.
 * @returns {JSX.Element} Trang chỉnh sửa danh mục.
 */
const EditCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading cục bộ
  const [error, setError] = useState<string | null>(null); // State cho lỗi

  useEffect(() => {
    /**
     * @function fetchCategory
     * @description Lấy thông tin danh mục cần chỉnh sửa.
     */
    const fetchCategory = async () => {
      if (!categoryId) {
        toast.error("Lỗi", { description: "Không tìm thấy ID danh mục." });
        navigate("/seller/categories");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const categoryData = await sellerAPI.getCategoryById(categoryId); // Gọi API lấy category theo ID
        if (categoryData) {
          setCurrentCategory(categoryData);
        } else {
          toast.error("Lỗi", { description: "Không tìm thấy danh mục này." });
          navigate("/seller/categories");
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải thông tin danh mục.');
        toast.error("Lỗi", { description: err.message || "Không thể tải thông tin danh mục." });
        navigate("/seller/categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, navigate]);

  /**
   * @function handleSubmit
   * @description Xử lý submit form chỉnh sửa danh mục.
   * @param {Partial<Category>} data - Dữ liệu danh mục từ form.
   */
  const handleSubmit = async (data: Partial<Category>) => {
    if (!categoryId) return; // Đảm bảo có categoryId

    setIsLoading(true);
    try {
      const updatedCategory = await sellerAPI.updateCategory(categoryId, data);
      setCurrentCategory(updatedCategory); // Cập nhật lại category hiện tại
      toast.success("Thành công", { description: "Cập nhật danh mục thành công!" });
      navigate("/seller/categories"); // Điều hướng về trang quản lý danh mục
    } catch (err: any) {
      toast.error("Lỗi", { description: err.message || "Không thể cập nhật danh mục." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !currentCategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <PageContainer className="text-center text-red-500">
        <p>{error}</p>
        <p>Vui lòng thử lại sau.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa Danh mục</CardTitle>
          <CardDescription>
            Cập nhật thông tin của danh mục sản phẩm hiện có.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm 
            initialData={currentCategory} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditCategoryPage;
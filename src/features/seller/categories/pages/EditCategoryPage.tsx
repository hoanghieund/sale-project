/**
 * @file Trang chỉnh sửa danh mục (Edit Category Page) cho module Seller.
 * Cung cấp form để chủ shop chỉnh sửa thông tin của một danh mục sản phẩm hiện có.
 * Sử dụng CategoryForm component và lấy ID danh mục từ URL params.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "@/features/seller/categories/components/CategoryForm"; // Sẽ tạo sau
import { categoriesService } from "@/features/seller/categories/services/categoriesService";
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
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading cục bộ
  const [error, setError] = useState<string | null>(null); // State cho lỗi

  useEffect(() => {
    /**
     * @function fetchCategory
     * @description Lấy thông tin danh mục cần chỉnh sửa.
     */
    const fetchCategory = async () => {
      if (!categoryId) {
        toast.error("Error", { description: "Category ID not found." });
        navigate("/seller/categories");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const categoryData = await categoriesService.getCollectionById(
          categoryId
        ); // Gọi API lấy category theo ID
        if (categoryData) {
          setCurrentCategory(categoryData);
        } else {
          toast.error("Error", { description: "This category was not found." });
          navigate("/seller/categories");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load category information.");
        toast.error("Error", {
          description: err.message || "Unable to load category information.",
        });
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
  const handleSubmit = async (data: { name: string; categoryId: string }) => {
    if (!categoryId) return; // Đảm bảo có categoryId

    setIsLoading(true);
    try {
      const updatedCategory = await categoriesService.updateCollection(
        categoryId,
        data
      );
      setCurrentCategory(updatedCategory); // Cập nhật lại category hiện tại
      toast.success("Success", {
        description: "Category updated successfully!",
      });
      navigate("/seller/categories"); // Điều hướng về trang quản lý danh mục
    } catch (err: any) {
      toast.error("Error", {
        description: err.message || "Unable to update category.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Edit Category</CardTitle>
          <CardDescription>
            Update information for the existing product category.
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
    </>
  );
};

export default EditCategoryPage;

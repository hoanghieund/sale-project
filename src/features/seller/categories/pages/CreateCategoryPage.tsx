/**
 * @file Trang tạo danh mục mới (Create Category Page) cho module Seller.
 * Cung cấp form để chủ shop nhập thông tin và tạo một danh mục sản phẩm mới.
 * Sử dụng CategoryForm component.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "@/features/seller/categories/components/CategoryForm"; // Sẽ tạo sau
import React, { useState } from "react"; // Thêm useState
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { categoriesService } from "../services/categoriesService";

/**
 * @function CreateCategoryPage
 * @description Component trang tạo danh mục sản phẩm mới.
 * @returns {JSX.Element} Trang tạo danh mục.
 */
const CreateCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Quản lý trạng thái loading cục bộ

  /**
   * @function handleSubmit
   * @description Xử lý submit form tạo danh mục mới.
   * @param {Object} data - Dữ liệu danh mục từ form (bao gồm name, categoryId, image).
   * @param {string} data.name - Tên danh mục.
   * @param {string} data.categoryId - ID danh mục cha.
   * @param {File} data.image - File hình ảnh của danh mục (bắt buộc).
   */
  const handleSubmit = async (data: {
    name: string;
    categoryId: string;
    image: File; // Đã thay đổi từ optional thành bắt buộc
  }) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      // Đảm bảo rằng image luôn được gửi đi
      await categoriesService.createCollection({
        name: data.name,
        categoryId: Number(data.categoryId),
        image: data.image, // Image là bắt buộc
      });
      toast.success("Success", {
        description: "Category created successfully!",
      });
      navigate("/seller/categories"); // Điều hướng về trang quản lý danh mục
    } catch (err: any) {
      toast.error("Error", {
        description: err.message || "Unable to create a new category.",
      });
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <>
      {/* Container canh giữa và giới hạn độ rộng giúp form dễ đọc trên mobile/tablet */}
      <div className="p-4 sm:p-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Create Collection</CardTitle>
            <CardDescription>
              Fill in the information to add a new product collection to your
              store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} />
            {/* Sử dụng isLoading cục bộ */}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateCategoryPage;

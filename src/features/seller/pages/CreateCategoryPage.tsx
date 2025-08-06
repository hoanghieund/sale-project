/**
 * @file Trang tạo danh mục mới (Create Category Page) cho module Seller.
 * Cung cấp form để chủ shop nhập thông tin và tạo một danh mục sản phẩm mới.
 * Sử dụng CategoryForm component.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/features/seller/components/CategoryForm"; // Sẽ tạo sau
import { sellerAPI } from "@/features/seller/services/seller";
import { Category } from "@/types/seller"; // Import Category interface
import React, { useState } from "react"; // Thêm useState
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
   * @param {Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>} data - Dữ liệu danh mục từ form.
   */
  const handleSubmit = async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault' | 'isActive'>) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      // Giả định `isActive` mặc định là true khi tạo mới
      const newCategory = await sellerAPI.createCategory({ ...data, isActive: true });
      toast.success("Thành công", { description: "Tạo danh mục mới thành công!" });
      navigate("/seller/categories"); // Điều hướng về trang quản lý danh mục
    } catch (err: any) {
      toast.error("Lỗi", { description: err.message || "Không thể tạo danh mục mới." });
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tạo Danh mục mới</CardTitle>
          <CardDescription>
            Điền thông tin để thêm một danh mục sản phẩm mới vào gian hàng của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} /> {/* Sử dụng isLoading cục bộ */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCategoryPage;
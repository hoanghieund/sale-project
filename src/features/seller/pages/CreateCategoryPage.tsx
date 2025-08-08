/**
 * @file Trang tạo danh mục mới (Create Category Page) cho module Seller.
 * Cung cấp form để chủ shop nhập thông tin và tạo một danh mục sản phẩm mới.
 * Sử dụng CategoryForm component.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/features/seller/components/CategoryForm"; // Sẽ tạo sau
import { PageContainer } from "@/features/seller/components/PageContainer";
import { sellerAPI } from "@/features/seller/services/seller";
import { Category } from "@/features/seller/types"; // Import Category interface từ seller types
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
   * @param {Pick<Category, 'name' | 'description'>} data - Dữ liệu danh mục từ form (chỉ bao gồm name, description).
   */
  const handleSubmit = async (data: Pick<Category, 'name' | 'description'>) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      // Lấy shop hiện tại để gắn shopId cho category mới (bắt buộc theo kiểu Category)
      const shop = await sellerAPI.getShop();
      await sellerAPI.createCategory({ ...data, shopId: shop.id });
      toast.success("Thành công", { description: "Tạo danh mục mới thành công!" });
      navigate("/seller/categories"); // Điều hướng về trang quản lý danh mục
    } catch (err: any) {
      toast.error("Lỗi", { description: err.message || "Không thể tạo danh mục mới." });
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default CreateCategoryPage;
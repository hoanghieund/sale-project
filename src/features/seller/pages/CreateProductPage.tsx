/**
 * @file Trang tạo sản phẩm mới (Create Product Page) cho module Seller.
 * Cung cấp form để chủ shop nhập thông tin và tạo một sản phẩm mới.
 * Sử dụng ProductForm component.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner"; // Import LoadingSpinner
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/features/seller/components/ProductForm"; // Sẽ tạo sau
import { sellerAPI } from "@/features/seller/services/seller";
import { Category, Product } from "@/types/seller"; // Import Product và Category interface
import React, { useEffect, useState } from "react"; // Thêm useState, useEffect
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function CreateProductPage
 * @description Component trang tạo sản phẩm mới.
 * @returns {JSX.Element} Trang tạo sản phẩm.
 */
const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Quản lý trạng thái loading cục bộ
  const [categories, setCategories] = useState<Category[]>([]); // State cho danh mục sản phẩm
  const [error, setError] = useState<string | null>(null); // State cho lỗi

  useEffect(() => {
    /**
     * @function fetchCategories
     * @description Hàm lấy danh sách danh mục từ API.
     */
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const categoriesData = await sellerAPI.getCategories();
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải danh mục.');
        toast.error("Lỗi", { description: err.message || "Không thể tải danh mục sản phẩm." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /**
   * @function handleSubmit
   * @description Xử lý submit form tạo sản phẩm mới.
   * @param {Omit<Product, 'id' | 'createdAt' | 'updatedAt'>} data - Dữ liệu sản phẩm từ form.
   */
  const handleSubmit = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProduct = await sellerAPI.createProduct(data);
      toast.success("Thành công", { description: "Tạo sản phẩm mới thành công!" });
      navigate("/seller/products");
    } catch (err: any) {
      toast.error("Lỗi", { description: err.message || "Không thể tạo sản phẩm mới." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tạo Sản phẩm mới</CardTitle>
          <CardDescription>
            Điền thông tin để thêm một sản phẩm mới vào gian hàng của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            categories={categories} // Truyền danh sách categories cục bộ vào form
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProductPage;
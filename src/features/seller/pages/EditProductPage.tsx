/**
 * @file Trang chỉnh sửa sản phẩm (Edit Product Page) cho module Seller.
 * Cung cấp form để chủ shop chỉnh sửa thông tin của một sản phẩm hiện có.
 * Sử dụng ProductForm component và lấy ID sản phẩm từ URL params.
 */

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/features/seller/components/ProductForm"; // Sẽ tạo sau
import { PageContainer } from "@/features/seller/components/PageContainer";
import { sellerAPI } from "@/features/seller/services/seller";
import { Category, Product } from "@/features/seller/types"; // Import Product và Category interface từ đúng đường dẫn
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function EditProductPage
 * @description Component trang chỉnh sửa sản phẩm.
 * @returns {JSX.Element} Trang chỉnh sửa sản phẩm.
 */
const EditProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading cục bộ
  const [categories, setCategories] = useState<Category[]>([]); // State cho danh mục sản phẩm
  const [error, setError] = useState<string | null>(null); // State cho lỗi

  useEffect(() => {
    /**
     * @function fetchProductAndCategories
     * @description Lấy thông tin sản phẩm và danh mục cần chỉnh sửa.
     */
    const fetchProductAndCategories = async () => {
      if (!productId) {
        toast.error("Lỗi", { description: "Không tìm thấy ID sản phẩm." });
        navigate("/seller/products");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [productData, categoriesData] = await Promise.all([
          sellerAPI.getProductById(productId),
          sellerAPI.getCategories(),
        ]);

        if (productData) {
          setCurrentProduct(productData);
          setCategories(categoriesData);
        } else {
          toast.error("Lỗi", { description: "Không tìm thấy sản phẩm này." });
          navigate("/seller/products");
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải thông tin sản phẩm hoặc danh mục.');
        toast.error("Lỗi", { description: err.message || "Không thể tải thông tin sản phẩm hoặc danh mục." });
        navigate("/seller/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [productId, navigate]);

  /**
   * @function handleSubmit
   * @description Xử lý submit form chỉnh sửa sản phẩm.
   * @param {Partial<Product>} data - Dữ liệu sản phẩm từ form.
   */
  const handleSubmit = async (data: Partial<Product>) => {
    if (!productId) return; // Đảm bảo có productId

    setIsLoading(true);
    try {
      const updatedProduct = await sellerAPI.updateProduct(productId, data);
      setCurrentProduct(updatedProduct); // Cập nhật lại sản phẩm hiện tại
      toast.success("Thành công", { description: "Cập nhật sản phẩm thành công!" });
      navigate("/seller/products"); // Điều hướng về trang quản lý sản phẩm
    } catch (err: any) {
      toast.error("Lỗi", { description: err.message || "Không thể cập nhật sản phẩm." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !currentProduct) { // Sử dụng isLoading cục bộ
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) { // Hiển thị lỗi nếu có
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
          <CardTitle>Chỉnh sửa Sản phẩm</CardTitle>
          <CardDescription>
            Cập nhật thông tin của sản phẩm hiện có.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            initialData={currentProduct}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            categories={categories} // Truyền danh sách categories cục bộ vào form
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditProductPage;
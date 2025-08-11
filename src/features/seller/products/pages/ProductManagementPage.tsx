/**
 * @file Trang quản lý sản phẩm (Product Management Page) cho module Seller.
 * Hiển thị danh sách các sản phẩm, cho phép tìm kiếm, tạo mới, chỉnh sửa và xóa sản phẩm.
 * Sử dụng ProductTable component.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteProductDialog from "@/features/seller/components/DeleteProductDialog"; // Sẽ tạo sau
import { ProductTable } from "@/features/seller/components/ProductTable"; // Sẽ tạo sau
import { sellerAPI } from "@/features/seller/services/seller";
import { Category, Product } from "@/types";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function ProductManagementPage
 * @description Component trang quản lý sản phẩm.
 * @returns {JSX.Element} Trang quản lý sản phẩm.
 */
const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    /**
     * @function fetchProductsAndCategories
     * @description Hàm lấy danh sách sản phẩm và danh mục từ API.
     */
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsData, categoriesData] = await Promise.all([
          sellerAPI.getProducts(),
          sellerAPI.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải sản phẩm hoặc danh mục.");
        toast.error("Lỗi", {
          description:
            err.message || "Không thể tải danh sách sản phẩm hoặc danh mục.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  /**
   * @function handleEditProduct
   * @description Xử lý khi người dùng click chỉnh sửa sản phẩm.
   * @param {Product} product - Sản phẩm cần chỉnh sửa.
   */
  const handleEditProduct = (product: Product) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm
    // navigate(`/seller/products/edit/${product.id}`); // Cần inject navigate hook
    console.log("Chỉnh sửa sản phẩm:", product);
  };

  /**
   * @function handleDeleteProduct
   * @description Mở dialog xác nhận xóa sản phẩm.
   * @param {Product} product - Sản phẩm cần xóa.
   */
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  /**
   * @function confirmDeleteProduct
   * @description Xử lý xóa sản phẩm sau khi xác nhận.
   */
  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      setLoading(true);
      try {
        await sellerAPI.deleteProduct(productToDelete.id);
        setProducts(products.filter(prod => prod.id !== productToDelete.id)); // Cập nhật lại danh sách sản phẩm
        toast.success("Thành công", {
          description: "Xóa sản phẩm thành công!",
        });
      } catch (err: any) {
        toast.error("Lỗi", {
          description: err.message || "Không thể xóa sản phẩm.",
        });
      } finally {
        setLoading(false);
        setShowDeleteDialog(false);
        setProductToDelete(null);
      }
    }
  };

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle>Quản lý Sản phẩm</CardTitle>
            <CardDescription>
              Tạo, chỉnh sửa và quản lý các sản phẩm của bạn.
            </CardDescription>
          </div>
          <Link to="/seller/products/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            categories={categories} // Truyền categories cục bộ
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && productToDelete && (
        <DeleteProductDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDeleteProduct}
          product={productToDelete}
          isLoading={loading}
        />
      )}
    </>
  );
};

export default ProductManagementPage;

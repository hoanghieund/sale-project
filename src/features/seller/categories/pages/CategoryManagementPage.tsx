/**
 * @file Trang quản lý danh mục (Category Management Page) cho module Seller.
 * Hiển thị danh sách các danh mục, cho phép tìm kiếm, tạo mới, chỉnh sửa và xóa danh mục.
 * Sử dụng CategoryTable component để hiển thị dữ liệu.
 */

import CustomPagination from "@/components/common/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react"; // Loại bỏ useRef vì dùng nút Search
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CategoryTable } from "../components/CategoryTable";
import { categoriesService } from "../services/categoriesService";

/**
 * @function CategoryManagementPage
 * @description Component trang quản lý danh mục.
 * @returns {JSX.Element} Trang quản lý danh mục.
 */
const CategoryManagementPage: React.FC = () => {
  const [categories, setCategories] = useState([]); // State danh sách sau khi map từ API
  // Phân trang & tổng
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  /**
   * @function fetchCollections
   * @description Gọi API lấy danh mục theo filters; hỗ trợ cả dạng trả về mảng hoặc phân trang {content,totalPages,totalElements}
   */
  const fetchCollections = async (page: number) => {
    try {
      // Axios wrapper trả về trực tiếp data, KHÔNG phải response.data
      const response: any = await categoriesService.getCollections({
        page,
        size: 10,
      });

      setCategories(response.content);

      // Thiết lập thông tin phân trang nếu có, fallback nếu không
      setTotalPages(response.totalPages ?? 1);
      setTotalElements(response.totalElements ?? 0);
    } catch (err: any) {
      toast.error("Error", {
        description: err.message || "Unable to load product categories.",
      });
    }
  };

  useEffect(() => {
    fetchCollections(page);
  }, []);

  return (
    <>
      <Card className="bg-white">
        {/* Header responsive: xếp dọc trên mobile, ngang trên md+ */}
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-wrap">
          <div className="space-y-2">
            <CardTitle>Collection Management</CardTitle>
            <CardDescription>
              Create, edit and organize your product collections.
            </CardDescription>
          </div>
          <Link to="/seller/categories/create">
            {/* Nút full-width trên mobile để dễ bấm */}
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add collection
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <CategoryTable
            categories={categories} // Sử dụng state categories cục bộ
            onDeleted={() => fetchCollections(page)} // Sau khi xóa, gọi lại API để cập nhật danh sách
          />

          {/* Phân trang: xếp dọc trên mobile, canh hàng ngang trên sm+ */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CustomPagination
              currentPage={page + 1} // UI base-1
              totalPages={totalPages}
              onPageChange={page => {
                setPage(page - 1);
                fetchCollections(page - 1);
              }}
            />
            <div className="text-sm text-gray-600">
              Total: {totalElements} items
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryManagementPage;

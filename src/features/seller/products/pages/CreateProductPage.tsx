/**
 * @file Trang tạo sản phẩm mới (Create Product Page) cho module Seller.
 * Trang này hỗ trợ tạo sản phẩm hàng loạt bằng cách Upload file Excel.
 * Lưu ý: Tạo từng sản phẩm đơn lẻ sẽ được xử lý trong bản cập nhật sau.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productService } from "@/features/seller/products/services/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react"; // Thêm useState, useEffect
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

/**
 * @function CreateProductPage
 * @description Component trang tạo sản phẩm mới.
 * @returns {JSX.Element} Trang tạo sản phẩm.
 */
const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false); // Trạng thái submit upload Excel

  // Schema cho upload Excel (tạo hàng loạt)
  const excelSchema = useMemo(
    () =>
      z.object({
        file: z
          .any()
          .refine(
            file => file instanceof File || (file && file.length > 0),
            "Vui lòng chọn tệp Excel"
          ),
        shopId: z.preprocess(
          v => Number(v),
          z.number().int().positive("shopId phải > 0")
        ),
        categoryId: z.preprocess(
          v => Number(v),
          z.number().int().positive("categoryId phải > 0")
        ),
      }),
    []
  );

  type ExcelFormData = z.infer<typeof excelSchema>;
  const excelForm = useForm<ExcelFormData>({
    resolver: zodResolver(excelSchema),
    defaultValues: { shopId: 1, categoryId: 1 } as any,
  });

  useEffect(() => {
    // Hiện không cần fetch dữ liệu khi trang chỉ upload Excel
  }, []);

  /**
   * @function onSubmitExcel
   * @description Upload Excel để tạo sản phẩm hàng loạt.
   */
  const onSubmitExcel = async (values: ExcelFormData) => {
    try {
      setSubmitting(true);
      // Lấy file từ input (hỗ trợ File hoặc FileList)
      const file: File = Array.isArray(values.file)
        ? values.file[0]
        : (values.file as any);

      await productService.createProduct(
        file,
        values.shopId,
        values.categoryId
      );
      toast.success("Upload Excel thành công");
      navigate("/seller/products"); // Quay lại danh sách để xem kết quả
    } catch (err: any) {
      toast.error("Lỗi", {
        description: err?.message || "Không thể upload Excel.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tạo Sản phẩm bằng Excel</CardTitle>
          <CardDescription>
            Tải lên tệp Excel để tạo sản phẩm hàng loạt cho gian hàng của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Upload Excel tạo sản phẩm hàng loạt: dùng react-hook-form + shadcn form */}
          <Form {...excelForm}>
            <form
              onSubmit={excelForm.handleSubmit(onSubmitExcel)}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-6"
            >
              <FormField
                control={excelForm.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tệp Excel</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={e => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={excelForm.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category ID</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" variant="outline" disabled={submitting}>
                  {submitting ? "Đang upload..." : "Upload Excel"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateProductPage;

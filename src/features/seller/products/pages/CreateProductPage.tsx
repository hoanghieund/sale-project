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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productService } from "@/features/seller/products/services/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
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
        // Validate: bắt buộc là File, đúng mime, kích thước <= 5MB
        file: z
          .any()
          .refine(f => f instanceof File, "Vui lòng chọn tệp Excel")
          .refine(
            (f: File) =>
              [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
              ].includes(f.type),
            "Định dạng tệp phải là .xlsx hoặc .xls"
          )
          .refine((f: File) => f.size <= 5 * 1024 * 1024, "Tệp tối đa 5MB"),
        shopId: z.number().min(1).default(1),
        categoryId: z
          .union([z.number(), z.string()])
          .optional()
          .transform(v =>
            v === undefined || v === null || v === "" ? undefined : Number(v)
          )
          .refine(v => v === undefined || v > 0, "Category ID phải lớn hơn 0"),
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

  // Lấy file được chọn để hiển thị tên/size dưới dropzone (UX tốt hơn)
  const selectedFile = excelForm.watch("file") as File | undefined;

  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Tạo Sản phẩm bằng Excel</CardTitle>
          <CardDescription>
            Tải lên tệp Excel để tạo sản phẩm hàng loạt cho gian hàng của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Excel tạo sản phẩm hàng loạt: dùng react-hook-form + shadcn form */}
          <Form {...excelForm}>
            <form onSubmit={excelForm.handleSubmit(onSubmitExcel)}>
              <FormField
                control={excelForm.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Tệp Excel</FormLabel>
                    <FormControl>
                      {/* Dropzone đơn giản: dùng label + input hidden để tăng UX */}
                      <label
                        className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-muted rounded-md bg-muted/30 hover:bg-muted/40 transition-colors cursor-pointer"
                        onDragOver={e => {
                          e.preventDefault();
                        }}
                        onDrop={e => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            excelForm.setValue("file", file, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        aria-label="Kéo thả hoặc chọn tệp Excel"
                      >
                        <Upload className="h-5 w-5 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Kéo & thả hoặc nhấn để chọn tệp
                        </span>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          className="sr-only"
                          onChange={e => field.onChange(e.target.files?.[0])}
                          disabled={submitting}
                        />
                      </label>
                    </FormControl>
                    {selectedFile && (
                      <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-muted px-2 py-1 text-xs">
                        <span
                          className="truncate max-w-[240px]"
                          title={selectedFile.name}
                        >
                          {selectedFile.name} (
                          {((selectedFile.size || 0) / 1024).toFixed(1)} KB)
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() =>
                            excelForm.setValue("file", undefined, {
                              shouldValidate: true,
                            })
                          }
                          aria-label="Xóa tệp đã chọn"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <FormDescription>
                      Hỗ trợ định dạng .xlsx, .xls. Vui lòng đảm bảo dữ liệu
                      đúng template.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={excelForm.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Category ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="VD: 1"
                        min={1}
                        {...field}
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormDescription>
                      ID danh mục áp dụng cho tất cả sản phẩm. Có thể để trống
                      nếu file Excel đã chứa.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang upload...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Excel
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/seller/products")}
                >
                  Quay lại
                </Button>
              </div>
            </form>
          </Form>
          {/* Footer có thể dùng cho các hành động phụ trong tương lai */}
        </CardContent>
        <CardFooter className="justify-end" />
      </Card>
    </>
  );
};

export default CreateProductPage;

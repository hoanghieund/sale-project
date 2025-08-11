import CustomPagination from "@/components/common/CustomPagination";
import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import LoadingSpinner from "@/components/common/LoadingSpinner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteProductDialog from "@/features/seller/products/components/DeleteProductDialog";
import { ProductTable } from "@/features/seller/products/components/ProductTable";
import { productService } from "@/features/seller/products/services/productService";
import { categoryService } from "@/services/categoryService";
import { Category, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

/**
 * @function ProductManagementPage
 * @description Component trang quản lý sản phẩm.
 * @returns {JSX.Element} Trang quản lý sản phẩm.
 */
const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Phân trang + tìm kiếm
  const [page, setPage] = useState(0); // base-0 theo backend
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Schema cho upload Excel
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
  const form = useForm<ExcelFormData>({
    resolver: zodResolver(excelSchema),
    defaultValues: { shopId: 1, categoryId: 1 } as any,
  });

  // Fetch categories tree rồi flatten thành danh mục đơn giản (id, name)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const treeResp = await categoryService.getAllCategory(0, 1000);
        const list: Category[] = [];
        // Flatten an toàn theo các key phổ biến (id, name, child)
        const walk = (node: any) => {
          if (!node) return;
          if (Array.isArray(node)) {
            node.forEach(walk);
            return;
          }
          if (node.id && node.name)
            list.push({ id: node.id, name: node.name } as Category);
          if (node.child) walk(node.child);
          if (node.children) walk(node.children);
        };
        walk(treeResp);
        setCategories(list);
      } catch (err: any) {
        // Không chặn luồng nếu lỗi danh mục
        console.warn("Lỗi tải danh mục:", err?.message || err);
      }
    };
    fetchCategories();
  }, []);

  // Debounce searchTerm -> textSearch
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Fetch products theo page, size, debouncedSearch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProductByShop({
          page,
          size,
          textSearch: debouncedSearch || undefined,
        });
        setProducts(res.content || []);
        setTotalPages(res.totalPages ?? 0);
        setTotalElements(res.totalElements ?? 0);
      } catch (err: any) {
        toast.error("Lỗi", {
          description: err?.message || "Không thể tải danh sách sản phẩm.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, size, debouncedSearch]);

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
        await productService.deleteProduct(String(productToDelete.id));
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

  /**
   * @function handleToggleStatus
   * @description Gọi API đổi trạng thái hiển thị và cập nhật lại danh sách cục bộ.
   */
  const handleToggleStatus = async (product: Product, nextStatus: boolean) => {
    try {
      await productService.changeProductStatus(product.id, nextStatus);
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? { ...p, status: nextStatus } : p))
      );
      toast.success("Cập nhật trạng thái thành công");
    } catch (err: any) {
      toast.error("Lỗi", {
        description: err?.message || "Không thể cập nhật trạng thái.",
      });
    }
  };

  /**
   * @function onSubmitExcel
   * @description Upload Excel tạo sản phẩm hàng loạt.
   */
  const onSubmitExcel = async (values: ExcelFormData) => {
    try {
      const file: File = Array.isArray(values.file)
        ? values.file[0]
        : (values.file as any);
      await productService.createProduct(
        file,
        values.shopId,
        values.categoryId
      );
      toast.success("Upload Excel thành công");
      // Reload danh sách hiện tại
      const res = await productService.getAllProductByShop({
        page,
        size,
        textSearch: debouncedSearch || undefined,
      });
      setProducts(res.content || []);
      setTotalPages(res.totalPages ?? 0);
      setTotalElements(res.totalElements ?? 0);
    } catch (err: any) {
      toast.error("Lỗi", {
        description: err?.message || "Không thể upload Excel.",
      });
    }
  };

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <CardTitle>Quản lý Sản phẩm</CardTitle>
            <CardDescription>
              Tạo, chỉnh sửa và quản lý các sản phẩm của bạn.
            </CardDescription>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Tìm kiếm theo tên..."
              value={searchTerm}
              onChange={e => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
              className="h-9"
            />
            <Link to="/seller/products/create">
              <Button className="h-9">
                <Plus className="h-4 w-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Excel tạo sản phẩm hàng loạt: dùng react-hook-form + shadcn form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitExcel)}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <FormField
                control={form.control}
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
                control={form.control}
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
              <Button type="submit" variant="outline">
                Upload Excel
              </Button>
            </form>
          </Form>

          {/* Toolbar: thông tin kết quả + chọn số sản phẩm/trang */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Thông tin tổng quan kết quả hiển thị */}
            <div className="text-sm text-muted-foreground">
              {totalElements > 0 ? (
                <span>
                  Hiển thị {page * size + 1}–
                  {Math.min(
                    page * size + (products?.length || 0),
                    totalElements
                  )}{" "}
                  trong tổng {totalElements} sản phẩm
                </span>
              ) : (
                <span>Không có sản phẩm phù hợp</span>
              )}
            </div>

            {/* Chọn số sản phẩm/trang */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hiển thị</span>
              <Select
                value={String(size)}
                onValueChange={val => {
                  setPage(0); // reset về trang đầu khi đổi page size
                  setSize(Number(val));
                }}
              >
                <SelectTrigger className="w-24 h-9">
                  <SelectValue placeholder="Kích thước" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">mỗi trang</span>
            </div>
          </div>

          {/* Bảng sản phẩm / trạng thái tải / rỗng */}
          {loading ? (
            <LoadingSpinner />
          ) : products && products.length > 0 ? (
            <ProductTable
              products={products}
              categories={categories} // Truyền categories cục bộ
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <EmptyStateDisplay />
          )}

          {/* Phân trang: dùng CustomPagination (UI base-1, API base-0) */}
          <CustomPagination
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={next => setPage(Math.max(0, next - 1))}
            className="pt-2"
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

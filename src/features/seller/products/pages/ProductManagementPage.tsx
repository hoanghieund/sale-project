import CustomPagination from "@/components/common/CustomPagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PlatformCategorySelect from "@/components/common/PlatformCategorySelect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTable } from "@/features/seller/products/components/ProductTable";
import { productService } from "@/features/seller/products/services/productService";
import { Product } from "@/types";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * @function ProductManagementPage
 * @description Product management page component.
 * @returns {JSX.Element} Product management page.
 */
const ProductManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination + search + filter
  const [page, setPage] = useState(0); // base-0 per backend
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Thêm state cho categoryId
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce searchTerm -> textSearch
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Fetch products by page, size, debouncedSearch, categoryId
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProductByShop({
          page,
          size,
          textSearch: debouncedSearch || undefined,
          categoryId: categoryId ? Number(categoryId) : undefined,
        });
        setProducts(res.content || []);
        setTotalPages(res.totalPages ?? 0);
        setTotalElements(res.totalElements ?? 0);
      } catch (err: any) {
        toast.error("Error", {
          description: err?.message || "Failed to load products.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, size, debouncedSearch, categoryId]);
  /**
   * @function handleToggleStatus
   * @description Call API to toggle visibility and update local list.
   */
  const handleToggleStatus = async (product: Product, nextStatus: boolean) => {
    try {
      await productService.changeProductStatus(product.id, nextStatus);
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? { ...p, status: nextStatus } : p))
      );
      toast.success("Status updated successfully");
    } catch (err: any) {
      toast.error("Error", {
        description: err?.message || "Failed to update status.",
      });
    }
  };

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              Create, edit, and manage your products.
            </CardDescription>
          </div>
          {/* Toolbar: ensure input flexes on mobile to avoid overflow */}
          <div className="flex gap-2 w-full md:w-auto min-w-0">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
              className="h-9 flex-1 min-w-0"
            />
            <Link to="/seller/products/create">
              <Button className="h-9">
                <Plus className="h-4 w-4 mr-2" />
                Add product
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category filter */}
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="category-filter">Filter by Category</Label>
            <div className="flex gap-2 items-center">
              <PlatformCategorySelect
                value={categoryId}
                onChange={value => {
                  setPage(0); // Reset về trang đầu khi thay đổi bộ lọc
                  setCategoryId(value);
                }}
                placeholder="All categories"
                className="w-full md:w-72"
              />
              {categoryId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoryId("")}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Toolbar: result summary + page size selection */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Display result summary */}
            <div className="text-sm text-muted-foreground">
              {totalElements > 0 ? (
                <span>
                  Showing {page * size + 1}–
                  {Math.min(
                    page * size + (products?.length || 0),
                    totalElements
                  )}{" "}
                  of {totalElements} products
                </span>
              ) : (
                <span>No matching products</span>
              )}
            </div>

            {/* Select page size */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select
                value={String(size)}
                onValueChange={val => {
                  setPage(0); // reset to first page when page size changes
                  setSize(Number(val));
                }}
              >
                <SelectTrigger className="w-24 h-9">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>

          {/* Product table / loading / empty */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductTable
              products={products}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {/* Pagination: CustomPagination (UI base-1, API base-0) */}
          <CustomPagination
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={next => setPage(Math.max(0, next - 1))}
            className="pt-2"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductManagementPage;

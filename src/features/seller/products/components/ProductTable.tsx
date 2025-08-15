/**
 * @file ProductTable component to display and manage the product list.
 * Renders data and provides actions (edit, delete, toggle status).
 * Searching and pagination are handled at the parent page (server-side) to stay in sync with API.
 * Uses shadcn/ui components for table and dropdown menus.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { formatCurrencyUSD, formatDate } from "@/utils/formatters"; // Normalize currency and date formatting via utilities
import { MoreHorizontal } from "lucide-react";
import React from "react";

/**
 * @interface ProductTableProps
 * @description Props for ProductTable component.
 * @property {Product[]} products - List of products to display.
 * @property {(product: Product, nextStatus: boolean) => void} [onToggleStatus] - Toggle visibility handler.
 */
interface ProductTableProps {
  products: Product[];
  onToggleStatus?: (product: Product, nextStatus: boolean) => void;
}

/**
 * @function ProductTable
 * @description Table component rendering the product list.
 * @param {ProductTableProps} props - Component props.
 * @returns {JSX.Element} ProductTable component.
 */
export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onToggleStatus,
}) => {
  return (
    <div className="space-y-4">
      {/* Product table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead className="w-1/5">Product name</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Created at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => {
            // Map according to Product structure from '@/types'
            // Build category name safely: only show child if it exists
            const parentSlug = product.collectionResponse?.categoryTree?.slug;
            const childSlug =
              product.collectionResponse?.categoryTree?.child?.slug;
            const categoryName = parentSlug
              ? childSlug
                ? `${parentSlug} / ${childSlug}`
                : parentSlug
              : "N/A";
            const imageSrc =
              product.imagesDTOList && product.imagesDTOList.length > 0
                ? product.imagesDTOList[0]?.path || "/placeholder.svg"
                : "/placeholder.svg";
            const price = typeof product.price === "number" ? product.price : 0;
            const stock =
              typeof product.totalProduct === "number"
                ? product.totalProduct
                : 0;
            const isActive = !!product.status; // status: boolean
            // Format created date safely via util (fallback '-')
            const createdAt = formatDate(product.timeCreate) || "-";
            return (
              <TableRow key={product.id}>
                <TableCell className="w-16">
                  {/* Thumbnail: prioritize the first image */}
                  <img
                    src={imageSrc}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium max-w-[160px] truncate md:max-w-none">
                  {product.title}
                </TableCell>
                <TableCell className="">{categoryName}</TableCell>
                {/* Format price using common util for global consistency */}
                <TableCell>{formatCurrencyUSD(price)}</TableCell>
                <TableCell className="">{stock}</TableCell>
                <TableCell>
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "Visible" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell className="">{createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem onClick={() => onEdit(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem> */}
                      {typeof onToggleStatus === "function" && (
                        <DropdownMenuItem
                          onClick={() => onToggleStatus(product, !isActive)}
                        >
                          {isActive
                            ? "Hide on storefront"
                            : "Show on storefront"}
                        </DropdownMenuItem>
                      )}
                      {/* <DropdownMenuItem
                          onClick={() => handleDelete(product)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found</div>
      )}
    </div>
  );
};

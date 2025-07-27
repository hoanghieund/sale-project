import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Product } from "../../../../types";

interface ProductBreadcrumbProps {
  product: Product;
}

/**
 * Hiển thị breadcrumb navigation cho trang chi tiết sản phẩm
 * Giúp người dùng biết vị trí hiện tại và dễ dàng quay lại các trang trước đó
 */
const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/category/${product.category}`}>
                {product.category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {product.subcategory && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={`/category/${product.category}/${product.subcategory}`}
                  >
                    {product.subcategory}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ProductBreadcrumb;

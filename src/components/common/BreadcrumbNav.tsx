import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link } from "react-router-dom";

/**
 * BreadcrumbNav
 * Component breadcrumb tái sử dụng dựa trên shadcn + react-router.
 * - Quyết định Link hay Page theo props `to`.
 * - Bọc sẵn nền và container theo design system: bg-muted/20, container, px-4.
 * - Giữ API đơn giản để thay thế nhanh các block breadcrumb hiện có.
 */
export type BreadcrumbItemSpec = {
  label: React.ReactNode; // string hoặc JSX
  to?: string;            // nếu có => render Link, nếu không => BreadcrumbPage
};

type BreadcrumbNavProps = {
  items: BreadcrumbItemSpec[];
};

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
}) => {
  // Bảo vệ dữ liệu đầu vào để tránh crash khi items không hợp lệ
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={"bg-muted/20 py-4"}>
      <div className="container mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>
            {safeItems.map((it, idx) => {
              const isLast = idx === safeItems.length - 1;
              return (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    {isLast || !it.to ? (
                      <BreadcrumbPage >
                        {it.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={it.to!} >
                          {it.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
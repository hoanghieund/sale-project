import React from "react";
import clsx from "clsx";

/**
 * @component PageContainer
 * @description
 *  Wrapper chuẩn cho các trang Seller nhằm thống nhất layout (container, padding, spacing).
 *  Sử dụng để giảm lặp lại className và đảm bảo tính nhất quán UI.
 */
export interface PageContainerProps {
  children: React.ReactNode;
  className?: string; // Cho phép bổ sung class tuỳ biến khi cần
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    // container + mx-auto: canh giữa, p-4: padding chuẩn, space-y-6: khoảng cách dọc giữa sections
    <div className={clsx("container mx-auto p-4 space-y-6", className)}>
      {children}
    </div>
  );
};

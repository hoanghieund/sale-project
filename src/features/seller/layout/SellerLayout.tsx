import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SellerSidebar } from "@/features/seller/components/SellerSidebar"; // Sử dụng sidebar tùy chỉnh cho seller
import { Home, LucideIcon, Package, ShoppingCart, Users } from "lucide-react"; // Ví dụ icons
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * Định nghĩa kiểu cho các liên kết điều hướng.
 * @interface NavLink
 * @property {string} title - Tiêu đề của liên kết.
 * @property {string} href - Đường dẫn của liên kết.
 * @property {LucideIcon} icon - Icon của liên kết (từ lucide-react).
 * @property {"default" | "ghost"} variant - Kiểu hiển thị của liên kết (phải là "default" hoặc "ghost").
 */
interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

/**
 * Danh sách các liên kết điều hướng cho Seller Dashboard.
 * @type {NavLink[]}
 */
const navLinks: NavLink[] = [
  {
    title: "Dashboard",
    href: "/seller",
    icon: Home,
    variant: "default",
  },
  {
    title: "Quản lý Shop",
    href: "/seller/shop",
    icon: ShoppingCart,
    variant: "ghost",
  },
  {
    title: "Quản lý Danh mục",
    href: "/seller/categories",
    icon: Package,
    variant: "ghost",
  },
  {
    title: "Quản lý Sản phẩm",
    href: "/seller/products",
    icon: Users,
    variant: "ghost",
  },
];

/**
 * SellerLayout component.
 * Cung cấp layout riêng biệt cho kênh bán hàng, bao gồm sidebar và nội dung chính.
 * Yêu cầu quyền `ROLE_SHOP_MANAGER` để truy cập.
 *
 * @returns {JSX.Element} SellerLayout component.
 */
const SellerLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SellerSidebar
          navLinks={navLinks}
          className="hidden border-r bg-muted/40 md:block"
        />
        <div className="flex flex-col flex-1">
          <main className="flex flex-1 flex-col gap-2 lg:gap-4">
            <SidebarTrigger />
            <Outlet />
            {/* Đây là nơi nội dung của các trang con sẽ được render */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SellerLayout;

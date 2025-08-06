import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SellerSidebar } from "@/features/seller/components/SellerSidebar"; // Sử dụng sidebar tùy chỉnh cho seller
import { Bell, Home, LucideIcon, Package, Plus, Search, ShoppingCart, Users } from "lucide-react"; // Ví dụ icons
import React, { useState } from "react";
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
  badge?: string | null;
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

const SellerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        <SellerSidebar navLinks={navLinks} className="hidden border-r bg-muted/40 md:block" />
        
        <div className="flex flex-col flex-1">
          {/* Top Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold">
                {window.location.pathname.split('/').pop() === 'seller' && 'Dashboard'}
                {window.location.pathname.split('/').pop() === 'shop' && 'Quản lý Shop'}
                {window.location.pathname.split('/').pop() === 'categories' && 'Quản lý Danh mục'}
                {window.location.pathname.split('/').pop() === 'products' && 'Quản lý Sản phẩm'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
              
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {/* Badge thông báo, cần logic để lấy số lượng thông báo thực tế */}
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
              
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm mới
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SellerLayout;
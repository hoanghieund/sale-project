/**
 * AccountSidebar Component
 * @description Sidebar cho trang quản lý tài khoản người dùng, sử dụng Shadcn UI Sidebar component
 * @returns {JSX.Element}
 */
import { cn } from "@/lib/utils";
import { ChevronRight, Lock, MapPin, Package, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Import các components từ Shadcn UI Sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AccountSidebar = (): JSX.Element => {
  const location = useLocation(); // Lấy vị trí hiện tại để xác định link đang active

  // Định nghĩa các liên kết điều hướng với tên, đường dẫn và biểu tượng
  const navLinks = [
    { name: "Hồ sơ", path: "/account/profile", icon: User },
    { name: "Địa chỉ", path: "/account/address", icon: MapPin },
    { name: "Lịch sử đơn hàng", path: "/account/orders", icon: Package },
    { name: "Đổi mật khẩu", path: "/account/change-password", icon: Lock },
  ];

  return (
    <Sidebar
      variant="inset"
      collapsible="none"
      className="rounded-md border bg-card text-card-foreground shadow-sm"
    >
      <SidebarHeader className="p-4 pb-0">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Tài khoản của tôi
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;

                return (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full justify-start",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center gap-3 w-full"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.name}</span>
                        {isActive && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AccountSidebar;

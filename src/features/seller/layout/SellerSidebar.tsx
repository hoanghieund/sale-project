import { Home, LogOut, LucideIcon } from "lucide-react";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Dùng NavLink để set active theo router

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} NavLink
 * @property {string} title - Tiêu đề của liên kết.
 * @property {string} href - Đường dẫn của liên kết.
 * @property {LucideIcon} icon - Biểu tượng của liên kết.
 * @property {string} variant - Kiểu hiển thị của liên kết (ví dụ: "default", "ghost").
 */

interface SellerSidebarProps {
  navLinks: {
    title: string;
    href: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
  className?: string;
}

/**
 * SellerSidebar component.
 * Sidebar tùy chỉnh cho kênh bán hàng, hiển thị các liên kết điều hướng.
 *
 * @param {SellerSidebarProps} props - Props của component.
 * @returns {JSX.Element} SellerSidebar component.
 */
export const SellerSidebar: React.FC<SellerSidebarProps> = ({
  navLinks,
  className,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  // Điều hướng về trang chủ
  const goHome = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Đăng xuất và quay về trang chủ
  const handleLogout = React.useCallback(() => {
    try {
      logout();
      navigate("/");
    } catch (e) {
      // noop: có thể bổ sung toast nếu dự án đã dùng
    }
  }, [logout, navigate]);
  return (
    <Sidebar className={cn("hidden border-r md:block", className)}>
      <SidebarHeader>
        {/* Logo khu vực đầu sidebar */}
        <NavLink to="/" className="flex justify-center">
          {/* Thay text logo bằng hình từ public/logo.png theo yêu cầu */}
          <img src="/logo.png" alt="Eulotus logo" className="h-16 w-auto" />
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map((link, index) => (
              <SidebarMenuItem key={index}>
                {/*
                  Dùng NavLink để tự động áp dụng style active theo router.
                  Quy ước: active -> variant "default", inactive -> "ghost".
                */}
                <NavLink
                  to={link.href}
                  end={link.href === "/seller"} // Chỉ active đúng trang Dashboard, không active ở nested routes
                  className={({ isActive }) =>
                    cn(
                      buttonVariants({
                        variant: isActive ? "default" : "ghost",
                        size: "sm",
                      }),
                      "h-9 w-full justify-start",
                      isActive &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "group-data-[collapsed]:justify-center"
                    )
                  }
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <link.icon className="h-4 w-4 mr-2" />
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.title}</TooltipContent>
                  </Tooltip>
                  <span className="group-data-[collapsed]:hidden">
                    {link.title}
                  </span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        {/* User panel gọn: dùng DropdownMenu cho hành động */}
        <div className="px-2 pb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-9 px-2 justify-start rounded-md group-data-[collapsed]:justify-center group-data-[collapsed]:px-0 group-data-[collapsed]:!w-10"
                aria-label="User menu"
              >
                <Avatar className="h-7 w-7 mr-2 group-data-[collapsed]:mr-0">
                  <AvatarImage
                    src={(user as any)?.avatar || undefined}
                    alt={
                      (user as any)?.username || (user as any)?.email || "user"
                    }
                  />
                  <AvatarFallback>
                    {(
                      (
                        (user as any)?.username ||
                        (user as any)?.email ||
                        "U"
                      ).charAt(0) || "U"
                    ).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 text-left group-data-[collapsed]:hidden">
                  <div className="text-sm font-medium leading-none truncate">
                    {(user as any)?.username ||
                      (user as any)?.shopName ||
                      (user as any)?.email ||
                      "Khách"}
                  </div>
                  {(user as any)?.email && (
                    <div className="text-xs text-muted-foreground leading-none truncate">
                      {(user as any)?.email}
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              sideOffset={6}
              className="w-56"
            >
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={goHome} className="cursor-pointer">
                <Home className="h-4 w-4 mr-2" /> Trang chủ
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

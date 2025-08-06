import { LucideIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
export const SellerSidebar: React.FC<SellerSidebarProps> = ({ navLinks, className }) => {
  return (
    <Sidebar className={cn("hidden border-r bg-muted/40 md:block", className)}>
        <SidebarHeader>
           {/* Logo */}
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map((link, index) => (
              <SidebarMenuItem key={index}>
                <Link
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    "h-9 w-full justify-start",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "group-data-[collapsed]:justify-center"
                  )}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <link.icon className="h-4 w-4 mr-2" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {link.title}
                    </TooltipContent>
                  </Tooltip>
                  <span className="group-data-[collapsed]:hidden">
                    {link.title}
                  </span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
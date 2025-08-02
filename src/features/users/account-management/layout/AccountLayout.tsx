// src/features/users/account-management/pages/AccountLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

/**
 * @component AccountLayout
 * @description Layout chung cho các trang quản lý tài khoản người dùng.
 * Bao gồm một sidebar điều hướng và một vùng để hiển thị nội dung trang con.
 * Sử dụng SidebarProvider từ Shadcn UI để quản lý trạng thái sidebar.
 */
const AccountLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <aside>
            <AccountSidebar />
          </aside>
          {/* Content Area */}
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AccountLayout;

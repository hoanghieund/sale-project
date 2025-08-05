// src/features/users/account-management/pages/AccountLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

/**
 * @component AccountLayout
 * @description Common layout for user account management pages.
 * Includes a navigation sidebar and an area to display sub-page content.
 * Uses SidebarProvider from Shadcn UI to manage sidebar state.
 */
const AccountLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-2">
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

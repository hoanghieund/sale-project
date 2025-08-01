// src/features/users/account-management/pages/AccountLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from '../components/AccountSidebar'; // Đảm bảo đường dẫn đúng

/**
 * @component AccountLayout
 * @description Layout chung cho các trang quản lý tài khoản người dùng.
 * Bao gồm một sidebar điều hướng và một vùng để hiển thị nội dung trang con.
 */
const AccountLayout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <AccountSidebar />
        </aside>

        {/* Content Area */}
        <main className="md:w-3/4">
          <Outlet /> {/* Hiển thị nội dung của các route con */}
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
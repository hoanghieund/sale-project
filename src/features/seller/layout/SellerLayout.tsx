import { SellerSidebar } from '@/features/seller/components/SellerSidebar'; // Sử dụng sidebar tùy chỉnh cho seller
import { useUser } from '@/hooks/use-user';
import {
    Home,
    LineChart,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react"; // Ví dụ icons
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * @typedef {Object} NavLink
 * @property {string} title - Tiêu đề của liên kết.
 * @property {string} href - Đường dẫn của liên kết.
 * @property {React.ElementType} icon - Biểu tượng của liên kết.
 * @property {string} variant - Kiểu hiển thị của liên kết (ví dụ: "default", "ghost").
 */

/**
 * Danh sách các liên kết điều hướng cho Seller Dashboard.
 * @type {NavLink[]}
 */
const navLinks = [
    {
        title: "Dashboard",
        href: "/seller/dashboard",
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
    {
        title: "Thống kê",
        href: "/seller/analytics",
        icon: LineChart,
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
    const { user } = useUser(); // Lấy thông tin user từ context

    // Kiểm tra quyền của người dùng
    if (!user || !user.roles.includes("ROLE_SHOP_MANAGER")) {
        // Nếu không có user hoặc không có quyền ROLE_SHOP_MANAGER, chuyển hướng đến trang đăng ký người bán
        return <Navigate to="/seller-registration" replace />;
    }

    return (
        <div className="flex min-h-screen w-full">
            <SellerSidebar navLinks={navLinks} className="hidden border-r bg-muted/40 md:block" />
            <div className="flex flex-col flex-1">
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet /> {/* Đây là nơi nội dung của các trang con sẽ được render */}
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;
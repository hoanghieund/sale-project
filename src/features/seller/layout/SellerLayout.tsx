import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SellerSidebar } from "@/features/seller/layout/SellerSidebar"; // Use custom sidebar for seller
import {
  Home,
  LucideIcon,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react"; // Example icons
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Use router state to display header

/**
 * Defines the type for navigation links.
 * @interface NavLink
 * @property {string} title - The link title.
 * @property {string} href - The link path.
 * @property {LucideIcon} icon - The link icon (from lucide-react).
 * @property {"default" | "ghost"} variant - Display variant (must be "default" or "ghost").
 */
interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  badge?: string | null;
}

/**
 * Navigation links for the Seller Dashboard.
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
    title: "Shop Management",
    href: "/seller/shop",
    icon: ShoppingCart,
    variant: "ghost",
  },
  {
    title: "Category Management",
    href: "/seller/categories",
    icon: Package,
    variant: "ghost",
  },
  {
    title: "Product Management",
    href: "/seller/products",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Order Management",
    href: "/seller/orders",
    icon: ShoppingBag,
    variant: "ghost",
  },
];

/**
 * SellerLayout
 * Sets up Seller dashboard layout with sidebar navigation and a top header.
 * - Computes header title from the current route.
 * - Uses shadcn/ui SidebarProvider for responsive layout.
 */
const SellerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation(); // Get current path from router

  // Compute header title by route; Dashboard matches only '/seller' exactly
  const headerTitle = React.useMemo(() => {
    const active = navLinks.find(link =>
      link.href === "/seller"
        ? pathname === "/seller"
        : pathname.startsWith(link.href)
    );
    return active?.title ?? "Seller";
  }, [pathname]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        <SellerSidebar
          navLinks={navLinks}
          className="hidden border-r bg-muted/40 md:block"
        />

        <div className="flex flex-col flex-1">
          {/* Top Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="lg:hidden" />

            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold">{headerTitle}</h1>
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

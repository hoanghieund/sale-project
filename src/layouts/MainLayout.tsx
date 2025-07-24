import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

/**
 * MainLayout - Layout chính với header và footer
 * Sử dụng cho các trang cần hiển thị đầy đủ UI của ứng dụng
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

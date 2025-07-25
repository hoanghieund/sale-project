import ScrollToTop from "@/components/ScrollToTop";
import { AuthLayout, MainLayout } from "@/layouts";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Account = lazy(() => import("@/pages/Account"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const Products = lazy(() => import("@/pages/Products"));
const Register = lazy(() => import("@/pages/Register"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Main Layout - Các trang có header và footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/search" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Auth Layout - Các trang không có header và footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

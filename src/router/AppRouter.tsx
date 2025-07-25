import ScrollToTop from "@/components/ScrollToTop";
import { AuthLayout, MainLayout } from "@/layouts";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load pages for better performance
const Index = lazy(() => import("@/features/general/Index"));
const About = lazy(() => import("@/features/general/About"));
const Account = lazy(() => import("@/features/auth/Account"));
const Cart = lazy(() => import("@/features/cart-checkout/Cart"));
const Checkout = lazy(() => import("@/features/cart-checkout/Checkout"));
const Contact = lazy(() => import("@/features/general/Contact"));
const FAQ = lazy(() => import("@/features/general/FAQ"));
const Login = lazy(() => import("@/features/auth/Login"));
const NotFound = lazy(() => import("@/features/general/NotFound"));
const OrderSuccess = lazy(() => import("@/features/cart-checkout/OrderSuccess"));
const ProductDetailPage = lazy(() => import("@/features/product/ProductDetailPage"));
const Products = lazy(() => import("@/features/product/Products"));
const Register = lazy(() => import("@/features/auth/Register"));
const Wishlist = lazy(() => import("@/features/product/Wishlist"));

// C2C Marketplace pages
const CategoryPage = lazy(() => import("@/features/product/CategoryPage"));
const SubcategoryPage = lazy(() => import("@/features/product/SubcategoryPage"));
const ShopPage = lazy(() => import("@/features/product/ShopPage"));

// Seller Dashboard pages
const SellerDashboard = lazy(() => import("@/features/seller/SellerDashboard"));
const SellerProducts = lazy(() => import("@/features/seller/SellerProducts"));
const SellerOrders = lazy(() => import("@/features/seller/SellerOrders"));
const SellerShop = lazy(() => import("@/features/seller/SellerShop"));

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
            
            {/* Product routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<Products />} />
            
            {/* C2C Marketplace routes */}
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/subcategory/:subcategorySlug" element={<SubcategoryPage />} />
            <Route path="/shop/:shopSlug" element={<ShopPage />} />
            
            {/* Shopping cart and checkout */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            
            {/* User account */}
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            
            {/* Seller Dashboard - Protected routes */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/shop" element={<SellerShop />} />
            
            {/* Static pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* 404 page */}
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

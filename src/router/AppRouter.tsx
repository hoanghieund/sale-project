import ScrollToTop from "@/components/ScrollToTop";
import { AuthLayout, MainLayout } from "@/layouts";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActiveAccountRoute from "./ActiveAccountRoute";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";

// Lazy load pages for better performance
const Home = lazy(() => import("@/features/users/home/Home"));
const About = lazy(() => import("@/features/general/About"));
const Account = lazy(() => import("@/features/auth/Account"));
const AccountActivationPage = lazy(
  () => import("@/features/auth/AccountActivationPage")
);
const Cart = lazy(() => import("@/features/users/cart/Cart"));
const Checkout = lazy(() => import("@/features/users/checkout/Checkout"));
const Contact = lazy(() => import("@/features/general/Contact"));
const FAQ = lazy(() => import("@/features/general/FAQ"));
const Login = lazy(() => import("@/features/auth/Login"));
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/features/auth/ResetPassword"));
const NotFound = lazy(() => import("@/features/general/NotFound"));
const OrderSuccess = lazy(() => import("@/features/users/OrderSuccess"));
const ProductDetailPage = lazy(
  () => import("@/features/users/product-detail/ProductDetailPage")
);
// const Products = lazy(() => import("@/features/users/Products"));
const Register = lazy(() => import("@/features/auth/Register"));
const Wishlist = lazy(() => import("@/features/users/wish-list/Wishlist"));

// C2C Marketplace pages
const CategoryPage = lazy(
  () => import("@/features/users/category/CategoryPage")
);
const SubcategoryPage = lazy(
  () => import("@/features/users/sub-category/SubcategoryPage")
);
const ShopPage = lazy(() => import("@/features/users/shop/ShopPage"));

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
            <Route element={<ActiveAccountRoute />}>
              {/* Các trang công khai - không cần đăng nhập */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route
                path="/category/:categorySlug"
                element={<CategoryPage />}
              />
              <Route
                path="/subcategory/:subcategorySlug"
                element={<SubcategoryPage />}
              />
              <Route path="/shop/:shopSlug" element={<ShopPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Các trang yêu cầu đăng nhập */}
            <Route element={<ProtectedRoute />}>
              {/* Các trang yêu cầu tài khoản đã kích hoạt */}
              {/* Shopping cart và checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* User account */}
              <Route path="/account" element={<Account />} />
              <Route path="/wishlist" element={<Wishlist />} />
              {/* Seller Dashboard */}
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/seller/shop" element={<SellerShop />} />
            </Route>{" "}
            {/* Đóng ActiveAccountRoute */}
          </Route>

          {/* Auth Layout - Các trang không có header và footer */}
          <Route element={<AuthLayout />}>
            {/* Chuyển hướng người dùng đã đăng nhập khỏi các trang đăng nhập/đăng ký */}
            <Route element={<RedirectRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            {/* <Route element={<ActiveRoute />}>
              <Route
                path="/activate-account"
                element={<AccountActivationPage />}
              />
            </Route> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

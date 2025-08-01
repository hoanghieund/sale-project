import ScrollToTop from "@/components/ScrollToTop";
import { AuthLayout, MainLayout } from "@/layouts";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";

// Lazy load pages for better performance
const Home = lazy(() => import("@/features/users/home/Home"));
const AccountLayout = lazy(
  () => import("@/features/users/account-management/pages/AccountLayout")
);
const ProfilePage = lazy(
  () => import("@/features/users/account-management/pages/ProfilePage")
);
const AddressPage = lazy(
  () => import("@/features/users/account-management/pages/AddressPage")
);
const ChangePasswordPage = lazy(
  () => import("@/features/users/account-management/pages/ChangePasswordPage")
);
const OrderHistoryPage = lazy(
  () => import("@/features/users/account-management/pages/OrderHistoryPage")
);
const About = lazy(() => import("@/features/general/About"));
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
const PrivacyPolicy = lazy(() => import("@/features/general/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/features/general/TermsOfService"));
const VerifyEmail = lazy(() => import("@/features/auth/VerifyEmail"));
const VerifyAccount = lazy(() => import("@/features/auth/VerifyAccount"));

// C2C Marketplace pages
const CategoryPage = lazy(
  () => import("@/features/users/category/CategoryPage")
);
const ShopPage = lazy(() => import("@/features/users/shop/ShopPage"));

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
            {/* <Route element={<ActiveAccountRoute />}> */}
            {/* Các trang công khai - không cần đăng nhập */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/shop/:shopId" element={<ShopPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
            {/* </Route> */}
            {/* Các trang yêu cầu đăng nhập */}
            <Route element={<ProtectedRoute />}>
              {/* Các trang yêu cầu tài khoản đã kích hoạt */}
              {/* Shopping cart và checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* User account */}
              <Route path="/wishlist" element={<Wishlist />} />

              {/* Account Management Layout - Các trang quản lý tài khoản */}
              <Route path="/account" element={<AccountLayout />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="address" element={<AddressPage />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
                <Route path="orders" element={<OrderHistoryPage />} />
                <Route path="*" element={<NotFound />} />{" "}
                {/* Handle unknown sub-routes */}
              </Route>
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
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/verify-account" element={<VerifyAccount />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

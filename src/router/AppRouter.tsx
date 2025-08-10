import ScrollToTop from "@/components/ScrollToTop";
import { AuthLayout, MainLayout } from "@/layouts";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedSellerRoute from "./ProtectedSellerRoute";
import RedirectRoute from "./RedirectRoute";

// Lazy load pages for better performance
const Home = lazy(() => import("@/features/users/home/Home"));
const AccountLayout = lazy(
  () => import("@/features/users/account-management/layout/AccountLayout")
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
const ProductDetailPage = lazy(
  () => import("@/features/users/product-detail/ProductDetailPage")
);
// const Products = lazy(() => import("@/features/users/Products"));
const Register = lazy(() => import("@/features/auth/Register"));
const PrivacyPolicy = lazy(() => import("@/features/general/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/features/general/TermsOfService"));
const ShippingReturns = lazy(
  () => import("@/features/general/ShippingReturns")
);
const SellerRegistration = lazy(
  () => import("@/features/general/SellerRegistration")
);
const VerifyEmail = lazy(() => import("@/features/auth/VerifyEmail"));
const VerifyAccount = lazy(() => import("@/features/auth/VerifyAccount"));

// C2C Marketplace pages
const CategoryPage = lazy(
  () => import("@/features/users/category/CategoryPage")
);
const ShopPage = lazy(() => import("@/features/users/shop/ShopPage"));
const SearchPage = lazy(() => import("@/features/users/search/SearchPage"));

// Import Seller Layout and Pages
const SellerLayout = lazy(
  () => import("@/features/seller/layout/SellerLayout")
);
const DashboardPage = lazy(
  () => import("@/features/seller/pages/DashboardPage")
);
const ShopManagementPage = lazy(
  () => import("@/features/seller/pages/ShopManagementPage")
);
const CategoryManagementPage = lazy(
  () => import("@/features/seller/pages/CategoryManagementPage")
);
const ProductManagementPage = lazy(
  () => import("@/features/seller/pages/ProductManagementPage")
);
const CreateCategoryPage = lazy(
  () => import("@/features/seller/pages/CreateCategoryPage")
);
const EditCategoryPage = lazy(
  () => import("@/features/seller/pages/EditCategoryPage")
);
const CreateProductPage = lazy(
  () => import("@/features/seller/pages/CreateProductPage")
);
const EditProductPage = lazy(
  () => import("@/features/seller/pages/EditProductPage")
);
const OrderManagementPage = lazy(
  () => import("@/features/seller/pages/OrderManagementPage")
);
const OrderDetailPage = lazy(
  () => import("@/features/seller/pages/OrderDetailPage")
);

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
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/shop/:shopSlug" element={<ShopPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="/seller-registration"
              element={<SellerRegistration />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            {/* Các trang yêu cầu đăng nhập */}
            <Route element={<ProtectedRoute />}>
              {/* Các trang yêu cầu tài khoản đã kích hoạt */}
              <Route path="/checkout" element={<Checkout />} />
              {/* User account */}
              {/* <Route path="/wishlist" element={<Wishlist />} /> */}

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
            </Route>
            {/* Đóng ActiveAccountRoute */}
          </Route>

          {/* Seller Routes */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route element={<ProtectedSellerRoute />}>
              <Route index element={<DashboardPage />} /> {/* /seller */}
              {/* /seller/dashboard */}
              <Route path="shop" element={<ShopManagementPage />} />
              {/* /seller/shop */}
              <Route
                path="categories"
                element={<CategoryManagementPage />}
              />{" "}
              {/* /seller/categories */}
              <Route
                path="categories/create"
                element={<CreateCategoryPage />}
              />{" "}
              {/* /seller/categories/create */}
              <Route
                path="categories/edit/:categoryId"
                element={<EditCategoryPage />}
              />{" "}
              {/* /seller/categories/edit/:categoryId */}
              <Route path="products" element={<ProductManagementPage />} />{" "}
              {/* /seller/products */}
              <Route path="products/create" element={<CreateProductPage />} />
              <Route
                path="products/edit/:productId"
                element={<EditProductPage />}
              />
              <Route path="orders" element={<OrderManagementPage />} />
              <Route path="orders/:orderId" element={<OrderDetailPage />} />
            </Route>
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

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  categoryId: string;
  subcategoryId: string;
  brand?: string;
  sizes?: Size[];
  colors?: Color[];
  stock: number; // Số lượng tồn kho
  sold: number; // Số lượng đã bán
  inStock: boolean;
  isActive: boolean; // Trạng thái hoạt động
  isFeatured: boolean; // Sản phẩm nổi bật
  sale?: boolean;
  shopId: string; // Liên kết với shop thay vì vendor
  shop?: Shop; // Thông tin shop (optional khi populate)
  rating: number;
  reviewCount: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  value: string;
  available: boolean;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

// Shop Types - Thay thế Vendor cho mô hình C2C
export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  ownerId: string; // ID của user sở hữu shop
  owner?: User; // Thông tin owner (optional khi populate)
  verified: boolean;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  joinedAt: Date;
  isActive: boolean;
  address: ShopAddress;
  socialLinks: ShopSocialLinks;
  policies: ShopPolicies;
}

export interface ShopAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface ShopSocialLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface ShopPolicies {
  returnPolicy: string;
  shippingPolicy: string;
  privacyPolicy: string;
}

// Vendor interface giữ lại để tương thích ngược
export interface Vendor {
  id: string;
  name: string;
  slug: string;
  verified: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  icon?: string; // Icon cho hiển thị trong navigation
  subcategories?: Subcategory[]; // Optional khi populate
  subcategoryIds: string[]; // Danh sách ID subcategories
  featured: boolean;
  isActive: boolean;
  sortOrder: number; // Thứ tự hiển thị
  productCount: number; // Số lượng sản phẩm trong category
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  categoryId: string; // Liên kết với category cha
  category?: Category; // Thông tin category (optional khi populate)
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
  productCount: number; // Số lượng sản phẩm trong subcategory
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  addresses: Address[];
  preferences: UserPreferences;
  role: UserRole; // Thêm role cho user
  shopId?: string; // ID shop nếu user là seller
  shop?: Shop; // Thông tin shop (optional khi populate)
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

// User Role Types
export type UserRole = 'customer' | 'seller' | 'admin';

// Seller Dashboard Types
export interface SellerDashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  monthlyRevenue: number[];
  topProducts: Product[];
  recentOrders: Order[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  preferredSizes: string[];
  favoriteCategories: string[];
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  discount?: number;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Wishlist Types
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

// Filter Types
export interface ProductFilters {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
  rating: number;
}

export interface SortOption {
  value: string;
  label: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
  featured?: boolean;
  image?: string;
}

// Search Types
export interface SearchResult {
  products: Product[];
  categories: Category[];
  brands: string[];
  suggestions: string[];
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  preferences: {
    newArrivals: boolean;
    sales: boolean;
    exclusiveOffers: boolean;
  };
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

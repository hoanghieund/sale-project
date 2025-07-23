// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  featured: boolean;
  sale: boolean;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  tags: string[];
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
  image: string;
  subcategories: Subcategory[];
  featured: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
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

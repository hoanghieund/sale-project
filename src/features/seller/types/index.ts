/**
 * @fileoverview Định nghĩa các kiểu dữ liệu TypeScript cho module Seller.
 * Bao gồm các interface cho Shop, Category và Product dựa trên yêu cầu nghiệp vụ.
 */

/**
 * @interface Shop
 * @description Định nghĩa cấu trúc dữ liệu cho một cửa hàng (Shop).
 * Mỗi người dùng sở hữu duy nhất một cửa hàng.
 */
export interface Shop {
  id: string; // Mã định danh duy nhất của cửa hàng
  name: string; // Tên cửa hàng
  address: string; // Địa chỉ cửa hàng
  description?: string; // Mô tả cửa hàng (có thể có hoặc không)
  logo?: string; // URL của logo cửa hàng (có thể có hoặc không)
  banner?: string; // URL của banner cửa hàng (có thể có hoặc không)
  userId: string; // Mã định danh người dùng sở hữu cửa hàng (khóa ngoại)
  isActive: boolean; // Trạng thái hoạt động của gian hàng
  createdAt: Date; // Thời gian tạo cửa hàng
  updatedAt: Date; // Thời gian cập nhật gần nhất của cửa hàng
}

/**
 * @interface Category
 * @description Định nghĩa cấu trúc dữ liệu cho một danh mục sản phẩm.
 * Mỗi cửa hàng có nhiều danh mục.
 */
export interface Category {
  id: string; // Mã định danh duy nhất của danh mục
  name: string; // Tên danh mục
  description?: string; // Mô tả danh mục (có thể có hoặc không)
  shopId: string; // Mã định danh cửa hàng sở hữu danh mục (khóa ngoại)
  isDefault: boolean; // True nếu đây là danh mục "All" mặc định
  createdAt: Date; // Thời gian tạo danh mục
  updatedAt: Date; // Thời gian cập nhật gần nhất của danh mục
}

/**
 * @interface Product
 * @description Định nghĩa cấu trúc dữ liệu cho một sản phẩm.
 * Các sản phẩm thuộc về các danh mục cụ thể.
 */
export interface Product {
  id: string; // Mã định danh duy nhất của sản phẩm
  name: string; // Tên sản phẩm
  description: string; // Mô tả sản phẩm
  price: number; // Giá sản phẩm
  stock: number; // Số lượng tồn kho
  categoryId: string; // Mã định danh danh mục mà sản phẩm thuộc về (khóa ngoại)
  shopId: string; // Mã định danh cửa hàng sở hữu sản phẩm (khóa ngoại)
  images: string[]; // Mảng các URL hình ảnh của sản phẩm
  isActive: boolean; // Trạng thái hoạt động của sản phẩm
  createdAt: Date; // Thời gian tạo sản phẩm
  updatedAt: Date; // Thời gian cập nhật gần nhất của sản phẩm
}

/**
 * @interface DashboardStats
 * @description Định nghĩa cấu trúc dữ liệu cho số liệu thống kê Dashboard.
 */
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  outOfStockProducts: number;
  estimatedRevenue: number;
  totalViews: number; // Tổng lượt xem (đồng bộ với DashboardStatsComponent)
  conversionRate: number;
  bestSellingProducts: { id: string; name: string; sales: number }[];
  latestProducts: Product[];
  popularCategories: Category[];
  shopInfo?: { name: string; logo?: string };
  revenueTrend: { date: string; revenue: number }[];
  alerts: string[];
  topSellingProducts: Product[]; // Danh sách sản phẩm bán chạy nhất cho UI TopSellingProducts
}
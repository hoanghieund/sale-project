/**
 * @file Định nghĩa các kiểu dữ liệu (interface) cho các thực thể liên quan đến module Seller.
 * Bao gồm Shop, Category, Product và DashboardStats.
 */

/**
 * @interface Shop
 * @description Đại diện cho thông tin của một gian hàng.
 * @property {string} id - ID duy nhất của gian hàng.
 * @property {string} name - Tên của gian hàng.
 * @property {string} [description] - Mô tả về gian hàng (tùy chọn).
 * @property {string} [address] - Địa chỉ của gian hàng (tùy chọn).
 * @property {string} [logo] - URL của logo gian hàng (tùy chọn).
 * @property {string} [banner] - URL của banner gian hàng (tùy chọn).
 * @property {string} userId - ID của người dùng sở hữu gian hàng.
 * @property {boolean} isActive - Trạng thái hoạt động của gian hàng.
 * @property {Date} createdAt - Thời gian tạo gian hàng.
 * @property {Date} updatedAt - Thời gian cập nhật gần nhất của gian hàng.
 */
export interface Shop {
  id: string;
  name: string;
  description?: string;
  address?: string;
  logo?: string;
  banner?: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface Category
 * @description Đại diện cho thông tin của một danh mục sản phẩm.
 * @property {string} id - ID duy nhất của danh mục.
 * @property {string} name - Tên của danh mục.
 * @property {string} [description] - Mô tả về danh mục (tùy chọn).
 * @property {string} shopId - ID của gian hàng mà danh mục thuộc về.
 * @property {boolean} isDefault - True nếu đây là danh mục mặc định "All".
 * @property {Date} createdAt - Thời gian tạo danh mục.
 * @property {Date} updatedAt - Thời gian cập nhật gần nhất của danh mục.
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  shopId: string;
  isDefault: boolean; // true for "All" category
  isActive: boolean; // Thêm thuộc tính isActive vào Category
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface Product
 * @description Đại diện cho thông tin của một sản phẩm.
 * @property {string} id - ID duy nhất của sản phẩm.
 * @property {string} name - Tên của sản phẩm.
 * @property {string} description - Mô tả về sản phẩm.
 * @property {number} price - Giá của sản phẩm.
 * @property {number} stock - Số lượng tồn kho của sản phẩm.
 * @property {string} categoryId - ID của danh mục mà sản phẩm thuộc về.
 * @property {string} shopId - ID của gian hàng sở hữu sản phẩm.
 * @property {string[]} images - Mảng các URL hình ảnh của sản phẩm.
 * @property {boolean} isActive - Trạng thái hoạt động của sản phẩm.
 * @property {Date} createdAt - Thời gian tạo sản phẩm.
 * @property {Date} updatedAt - Thời gian cập nhật gần nhất của sản phẩm.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  shopId: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface DashboardStats
 * @description Đại diện cho các số liệu thống kê trên Dashboard của Seller.
 * @property {number} totalProducts - Tổng số sản phẩm.
 * @property {number} totalCategories - Tổng số danh mục.
 * @property {number} outOfStockProducts - Số lượng sản phẩm hết hàng.
 * @property {number} estimatedRevenue - Doanh thu ước tính.
 * @property {number} totalViews - Tổng lượt xem sản phẩm.
 * @property {number} conversionRate - Tỷ lệ chuyển đổi.
 * @property {Product[]} topSellingProducts - Danh sách các sản phẩm bán chạy nhất.
 */
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  outOfStockProducts: number;
  estimatedRevenue: number;
  totalViews: number;
  conversionRate: number;
  topSellingProducts: Product[];
}
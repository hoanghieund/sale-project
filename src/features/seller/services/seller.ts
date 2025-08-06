/**
 * @file Định nghĩa các hàm API cho module Seller.
 * Các hàm này sẽ tương tác với backend để quản lý gian hàng, danh mục, sản phẩm và lấy dữ liệu dashboard.
 */

import { Axios as API } from '@/api/Axios'; // Import Axios instance đã được cấu hình

import { Category, DashboardStats, Product, Shop } from '@/types/seller';

/**
 * @namespace sellerAPI
 * @description Tập hợp các phương thức để tương tác với API của module Seller.
 */
export const sellerAPI = {
  /**
   * @method getShop
   * @description Lấy thông tin chi tiết của gian hàng hiện tại.
   * @returns {Promise<Shop>} Thông tin gian hàng.
   */
  getShop: async (): Promise<Shop> => {
    const response = await API.get('/seller/shop');
    return response.data;
  },

  /**
   * @method updateShop
   * @description Cập nhật thông tin của gian hàng.
   * @param {Partial<Shop>} data - Dữ liệu gian hàng cần cập nhật.
   * @returns {Promise<Shop>} Thông tin gian hàng đã được cập nhật.
   */
  updateShop: async (data: Partial<Omit<Shop, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isActive'>>): Promise<Shop> => {
    const response = await API.put('/seller/shop', data);
    return response.data;
  },
  
  /**
   * @method getCategories
   * @description Lấy danh sách tất cả các danh mục của gian hàng.
   * @returns {Promise<Category[]>} Danh sách các danh mục.
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await API.get('/seller/categories');
    return response.data;
  },

  /**
   * @method getCategoryById
   * @description Lấy thông tin chi tiết của một danh mục theo ID.
   * @param {string} id - ID của danh mục cần lấy.
   * @returns {Promise<Category>} Thông tin danh mục.
   */
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await API.get(`/seller/categories/${id}`);
    return response.data;
  },

  /**
   * @method createCategory
   * @description Tạo một danh mục sản phẩm mới.
   * @param {Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>} data - Dữ liệu danh mục cần tạo (không bao gồm id, createdAt, updatedAt, isDefault).
   * @returns {Promise<Category>} Thông tin danh mục đã tạo.
   */
  createCategory: async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>): Promise<Category> => {
    const response = await API.post('/seller/categories', data);
    return response.data;
  },

  /**
   * @method updateCategory
   * @description Cập nhật thông tin của một danh mục hiện có.
   * @param {string} id - ID của danh mục cần cập nhật.
   * @param {Partial<Omit<Category, 'id' | 'shopId' | 'createdAt' | 'updatedAt' | 'isDefault'>>} data - Dữ liệu danh mục cần cập nhật.
   * @returns {Promise<Category>} Thông tin danh mục đã được cập nhật.
   */
  updateCategory: async (id: string, data: Partial<Omit<Category, 'id' | 'shopId' | 'createdAt' | 'updatedAt' | 'isDefault'>>): Promise<Category> => {
    const response = await API.put(`/seller/categories/${id}`, data);
    return response.data;
  },

  /**
   * @method deleteCategory
   * @description Xóa một danh mục sản phẩm.
   * @param {string} id - ID của danh mục cần xóa.
   * @returns {Promise<void>}
   */
  deleteCategory: async (id: string): Promise<void> => {
    await API.del(`/seller/categories/${id}`);
  },
  
  /**
   * @method getProducts
   * @description Lấy danh sách sản phẩm, có thể lọc theo categoryId hoặc tìm kiếm.
   * @param {object} [params] - Các tham số lọc và tìm kiếm.
   * @param {string} [params.categoryId] - ID danh mục để lọc sản phẩm.
   * @param {string} [params.search] - Từ khóa tìm kiếm sản phẩm.
   * @returns {Promise<Product[]>} Danh sách các sản phẩm.
   */
  getProducts: async (params?: { categoryId?: string; search?: string }): Promise<Product[]> => {
    const response = await API.get('/seller/products', { params });
    return response.data;
  },

  /**
   * @method createProduct
   * @description Tạo một sản phẩm mới.
   * @param {Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>} data - Dữ liệu sản phẩm cần tạo (không bao gồm id, createdAt, updatedAt, isActive).
   * @returns {Promise<Product>} Thông tin sản phẩm đã tạo.
   */
  createProduct: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Product> => {
    const response = await API.post('/seller/products', data);
    return response.data;
  },

  /**
   * @method updateProduct
   * @description Cập nhật thông tin của một sản phẩm hiện có.
   * @param {string} id - ID của sản phẩm cần cập nhật.
   * @param {Partial<Omit<Product, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>>} data - Dữ liệu sản phẩm cần cập nhật.
   * @returns {Promise<Product>} Thông tin sản phẩm đã được cập nhật.
   */
  updateProduct: async (id: string, data: Partial<Omit<Product, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>>): Promise<Product> => {
    const response = await API.put(`/seller/products/${id}`, data);
    return response.data;
  },

  /**
   * @method deleteProduct
   * @description Xóa một sản phẩm.
   * @param {string} id - ID của sản phẩm cần xóa.
   * @returns {Promise<void>}
   */
  deleteProduct: async (id: string): Promise<void> => {
    await API.del(`/seller/products/${id}`);
  },
  
  /**
   * @method getDashboardStats
   * @description Lấy các số liệu thống kê cho Dashboard của Seller.
   * @returns {Promise<DashboardStats>} Các số liệu thống kê.
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await API.get('/seller/dashboard/stats');
    return response.data;
  },
};
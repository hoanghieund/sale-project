/**
 * @file Định nghĩa các hàm API cho module Seller.
 * Các hàm này sẽ tương tác với backend để quản lý gian hàng, danh mục, sản phẩm và lấy dữ liệu dashboard.
 */

import { sellerService } from './sellerService'; // Import sellerService đã được tạo

import { Category, DashboardStats, Product, Shop } from '@/features/seller/types';

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
    const shop = await sellerService.getShop();
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  },

  /**
   * @method updateShop
   * @description Cập nhật thông tin của gian hàng.
   * @param {Partial<Shop>} data - Dữ liệu gian hàng cần cập nhật.
   * @returns {Promise<Shop>} Thông tin gian hàng đã được cập nhật.
   */
  updateShop: async (data: Partial<Omit<Shop, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isActive'>>): Promise<Shop> => {
    // Để đơn giản, giả định chúng ta luôn cập nhật shop hiện có
    const currentShop = await sellerService.getShop();
    if (!currentShop) {
      throw new Error("Shop not found for update");
    }
    const updatedShop = { ...currentShop, ...data };
    return sellerService.updateShop(updatedShop);
  },
  
  /**
   * @method getCategories
   * @description Lấy danh sách tất cả các danh mục của gian hàng.
   * @returns {Promise<Category[]>} Danh sách các danh mục.
   */
  getCategories: async (): Promise<Category[]> => {
    return sellerService.getCategories();
  },

  /**
   * @method getCategoryById
   * @description Lấy thông tin chi tiết của một danh mục theo ID.
   * @param {string} id - ID của danh mục cần lấy.
   * @returns {Promise<Category>} Thông tin danh mục.
   */
  getCategoryById: async (id: string): Promise<Category> => {
    const categories = await sellerService.getCategories();
    const category = categories.find(cat => cat.id === id);
    if (!category) {
      throw new Error(`Category with id ${id} not found.`);
    }
    return category;
  },

  /**
   * @method createCategory
   * @description Tạo một danh mục sản phẩm mới.
   * @param {Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>} data - Dữ liệu danh mục cần tạo (không bao gồm id, createdAt, updatedAt, isDefault).
   * @returns {Promise<Category>} Thông tin danh mục đã tạo.
   */
  createCategory: async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>): Promise<Category> => {
    return sellerService.createCategory(data);
  },

  /**
   * @method updateCategory
   * @description Cập nhật thông tin của một danh mục hiện có.
   * @param {string} id - ID của danh mục cần cập nhật.
   * @param {Partial<Omit<Category, 'id' | 'shopId' | 'createdAt' | 'updatedAt' | 'isDefault'>>} data - Dữ liệu danh mục cần cập nhật.
   * @returns {Promise<Category>} Thông tin danh mục đã được cập nhật.
   */
  updateCategory: async (id: string, data: Partial<Omit<Category, 'id' | 'shopId' | 'createdAt' | 'updatedAt' | 'isDefault'>>): Promise<Category> => {
    const currentCategory = await sellerAPI.getCategoryById(id);
    const updatedCategory = { ...currentCategory, ...data };
    return sellerService.updateCategory(updatedCategory);
  },

  /**
   * @method deleteCategory
   * @description Xóa một danh mục sản phẩm.
   * @param {string} id - ID của danh mục cần xóa.
   * @returns {Promise<void>}
   */
  deleteCategory: async (id: string): Promise<void> => {
    await sellerService.deleteCategory(id);
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
    let products = await sellerService.getProducts(params?.categoryId);
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }
    return products;
  },

  /**
   * @method createProduct
   * @description Tạo một sản phẩm mới.
   * @param {Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>} data - Dữ liệu sản phẩm cần tạo (không bao gồm id, createdAt, updatedAt, isActive).
   * @returns {Promise<Product>} Thông tin sản phẩm đã tạo.
   */
  createProduct: async (data: Omit<Product, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return sellerService.createProduct(data);
  },

  /**
   * @method updateProduct
   * @description Cập nhật thông tin của một sản phẩm hiện có.
   * @param {string} id - ID của sản phẩm cần cập nhật.
   * @param {Partial<Omit<Product, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>>} data - Dữ liệu sản phẩm cần cập nhật.
   * @returns {Promise<Product>} Thông tin sản phẩm đã được cập nhật.
   */
  updateProduct: async (id: string, data: Partial<Omit<Product, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>>): Promise<Product> => {
    const currentProduct = await sellerAPI.getProductById(id);
    const updatedProduct = { ...currentProduct, ...data };
    return sellerService.updateProduct(updatedProduct);
  },

  /**
   * @method deleteProduct
   * @description Xóa một sản phẩm.
   * @param {string} id - ID của sản phẩm cần xóa.
   * @returns {Promise<void>}
   */
  deleteProduct: async (id: string): Promise<void> => {
    await sellerService.deleteProduct(id);
  },

  /**
   * @method getProductById
   * @description Lấy thông tin chi tiết của một sản phẩm theo ID.
   * @param {string} id - ID của sản phẩm cần lấy.
   * @returns {Promise<Product>} Thông tin sản phẩm.
   */
  getProductById: async (id: string): Promise<Product> => {
    const products = await sellerService.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }
    return product;
  },
  
  /**
   * @method getDashboardStats
   * @description Lấy các số liệu thống kê cho Dashboard của Seller.
   * @returns {Promise<DashboardStats>} Các số liệu thống kê.
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    const productsRaw = await sellerService.getProducts();
    const categories = await sellerService.getCategories();
    const shop = await sellerService.getShop();

    // Chuẩn hóa Date vì dữ liệu lấy từ localStorage là string
    const products = productsRaw.map((p) => ({
      ...p,
      createdAt: new Date((p as any).createdAt),
      updatedAt: new Date((p as any).updatedAt),
    }));

    // Tính toán số liệu thống kê cơ bản
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const outOfStockProducts = products.filter((product) => product.stock === 0).length;
    const estimatedRevenue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const totalViews = Math.floor(Math.random() * 10000); // fake views
    const conversionRate = parseFloat((Math.random() * 10).toFixed(2)); // fake conversion

    // Giả lập số bán (sales) theo tồn kho để tạo leaderboard
    const bestSellingProducts = products
      .map((p) => ({ id: p.id, name: p.name, sales: Math.max(1, Math.floor(Math.random() * (p.stock > 0 ? p.stock : 10))) }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Top sản phẩm bán chạy nhất (trả về Product[]) dựa trên doanh thu ước tính
    const topSellingProducts = [...products]
      .sort((a, b) => b.price * b.stock - a.price * a.stock)
      .slice(0, 5);

    // Sản phẩm mới nhất theo createdAt
    const latestProducts = [...products]
      .sort((a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime())
      .slice(0, 5);

    return {
      totalProducts,
      totalCategories,
      outOfStockProducts,
      estimatedRevenue,
      totalViews,
      conversionRate,
      bestSellingProducts,
      latestProducts,
      popularCategories: [...categories].sort(() => 0.5 - Math.random()).slice(0, 5),
      shopInfo: shop ? { name: shop.name, logo: shop.logo } : undefined,
      revenueTrend: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      })),
      alerts: [
        outOfStockProducts > 0 ? `You have ${outOfStockProducts} products out of stock!` : '',
        'New order received! (Fake alert)',
      ].filter(Boolean),
      topSellingProducts,
    };
  },
};
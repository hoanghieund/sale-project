/**
 * @fileoverview Dịch vụ giả lập cho module Seller, sử dụng localStorage để lưu trữ dữ liệu.
 * Bao gồm các chức năng quản lý Shop, Category và Product.
 */

import { Category, Product, Shop } from "../types";

// Khóa lưu trữ trong localStorage
const SHOP_STORAGE_KEY = "seller_shop_data";
const CATEGORY_STORAGE_KEY = "seller_categories_data";
const PRODUCT_STORAGE_KEY = "seller_products_data";

/**
 * @function generateId
 * @description Tạo một ID duy nhất dựa trên timestamp và một số ngẫu nhiên.
 * @returns {string} ID duy nhất.
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * @function initialFakeData
 * @description Khởi tạo dữ liệu giả ban đầu cho Shop, Category và Product nếu chưa có trong localStorage.
 * Bao gồm một Shop mặc định, một Category "All" mặc định và một số Product mẫu.
 */
const initialFakeData = () => {
  let shop = JSON.parse(localStorage.getItem(SHOP_STORAGE_KEY) || "null");
  let categories = JSON.parse(
    localStorage.getItem(CATEGORY_STORAGE_KEY) || "null"
  );
  let products = JSON.parse(
    localStorage.getItem(PRODUCT_STORAGE_KEY) || "null"
  );

  if (!shop) {
    const defaultShop: Shop = {
      id: generateId(),
      name: "My Awesome Shop",
      address: "123 Main Street, City, Country",
      description: "Welcome to my shop! We offer a wide range of products.",
      logo: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
      banner: "https://via.placeholder.com/800x200/FF0000/FFFFFF?text=ShopBanner",
      userId: "user-123", // Giả định userId
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false
    };
    localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(defaultShop));
    shop = defaultShop;
  }

  if (!categories || categories.length === 0) {
    const defaultCategory: Category = {
      id: generateId(),
      name: "All Products",
      description: "All products available in the shop.",
      shopId: shop.id,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify([defaultCategory]));
    categories = [defaultCategory];
  }

  if (!products || products.length === 0) {
    const defaultCategoryId = categories.find(
      (cat: Category) => cat.isDefault
    )?.id;

    const fakeProducts: Product[] = [
      {
        id: generateId(),
        name: "Stylish T-Shirt",
        description: "A comfortable and stylish t-shirt for everyday wear.",
        price: 25.00,
        stock: 100,
        categoryId: defaultCategoryId,
        shopId: shop.id,
        images: [
          "https://via.placeholder.com/300/FFFF00/000000?text=T-Shirt1",
          "https://via.placeholder.com/300/00FF00/000000?text=T-Shirt2",
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateId(),
        name: "Ergonomic Office Chair",
        description: "Designed for maximum comfort and support during long working hours.",
        price: 150.00,
        stock: 50,
        categoryId: defaultCategoryId,
        shopId: shop.id,
        images: [
          "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Chair1",
          "https://via.placeholder.com/300/00FFFF/FFFFFF?text=Chair2",
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateId(),
        name: "Wireless Bluetooth Headphones",
        description: "High-quality sound with noise-cancelling features.",
        price: 75.00,
        stock: 200,
        categoryId: defaultCategoryId,
        shopId: shop.id,
        images: [
          "https://via.placeholder.com/300/FF0000/FFFFFF?text=Headphones1",
          "https://via.placeholder.com/300/0000FF/FFFFFF?text=Headphones2",
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(fakeProducts));
  }
};

/**
 * @namespace sellerService
 * @description Đối tượng chứa các hàm API giả cho module Seller.
 */
export const sellerService = {
  /**
   * @function getShop
   * @description Lấy thông tin Shop từ localStorage.
   * @returns {Promise<Shop | null>} Promise phân giải với đối tượng Shop hoặc null nếu không tìm thấy.
   */
  getShop: async (): Promise<Shop | null> => {
    initialFakeData(); // Đảm bảo dữ liệu được khởi tạo
    const shopData = localStorage.getItem(SHOP_STORAGE_KEY);
    return shopData ? JSON.parse(shopData) : null;
  },

  /**
   * @function updateShop
   * @description Cập nhật thông tin Shop vào localStorage.
   * @param {Shop} shop - Đối tượng Shop cần cập nhật.
   * @returns {Promise<Shop>} Promise phân giải với đối tượng Shop đã cập nhật.
   */
  updateShop: async (shop: Shop): Promise<Shop> => {
    const updatedShop = { ...shop, updatedAt: new Date() };
    localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(updatedShop));
    return updatedShop;
  },

  /**
   * @function getCategories
   * @description Lấy danh sách các Category từ localStorage.
   * @returns {Promise<Category[]>} Promise phân giải với mảng các đối tượng Category.
   */
  getCategories: async (): Promise<Category[]> => {
    initialFakeData();
    const categoriesData = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return categoriesData ? JSON.parse(categoriesData) : [];
  },

  /**
   * @function createCategory
   * @description Tạo mới một Category và lưu vào localStorage.
   * @param {Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>} newCategoryData - Dữ liệu Category mới (không bao gồm id, createdAt, updatedAt, isDefault).
   * @returns {Promise<Category>} Promise phân giải với đối tượng Category đã tạo.
   */
  createCategory: async (
    newCategoryData: Omit<Category, "id" | "createdAt" | "updatedAt" | "isDefault">
  ): Promise<Category> => {
    initialFakeData();
    const categories: Category[] = JSON.parse(
      localStorage.getItem(CATEGORY_STORAGE_KEY) || "[]"
    );
    const newCategory: Category = {
      ...newCategoryData,
      id: generateId(),
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categories.push(newCategory);
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
    return newCategory;
  },

  /**
   * @function updateCategory
   * @description Cập nhật thông tin một Category trong localStorage.
   * @param {Category} category - Đối tượng Category cần cập nhật.
   * @returns {Promise<Category>} Promise phân giải với đối tượng Category đã cập nhật.
   */
  updateCategory: async (category: Category): Promise<Category> => {
    initialFakeData();
    let categories: Category[] = JSON.parse(
      localStorage.getItem(CATEGORY_STORAGE_KEY) || "[]"
    );
    const index = categories.findIndex((cat) => cat.id === category.id);
    if (index === -1 || categories[index].isDefault) {
      throw new Error("Category not found or cannot be updated.");
    }
    const updatedCategory = { ...category, updatedAt: new Date() };
    categories[index] = updatedCategory;
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
    return updatedCategory;
  },

  /**
   * @function deleteCategory
   * @description Xóa một Category khỏi localStorage. Nếu Category có sản phẩm, sẽ chuyển sản phẩm về Category "All".
   * @param {string} categoryId - ID của Category cần xóa.
   * @returns {Promise<void>} Promise phân giải khi xóa thành công.
   */
  deleteCategory: async (categoryId: string): Promise<void> => {
    initialFakeData();
    let categories: Category[] = JSON.parse(
      localStorage.getItem(CATEGORY_STORAGE_KEY) || "[]"
    );
    let products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]"
    );

    const categoryToDelete = categories.find((cat) => cat.id === categoryId);
    if (!categoryToDelete || categoryToDelete.isDefault) {
      throw new Error("Category not found or cannot be deleted.");
    }

    const defaultCategory = categories.find((cat) => cat.isDefault);
    if (!defaultCategory) {
      throw new Error("Default category 'All' not found.");
    }

    // Chuyển sản phẩm về category "All"
    products = products.map((product) =>
      product.categoryId === categoryId
        ? { ...product, categoryId: defaultCategory.id }
        : product
    );
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));

    // Xóa category
    categories = categories.filter((cat) => cat.id !== categoryId);
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
  },

  /**
   * @function getProducts
   * @description Lấy danh sách Product từ localStorage. Có thể lọc theo categoryId.
   * @param {string} [categoryId] - Tùy chọn ID của Category để lọc sản phẩm.
   * @returns {Promise<Product[]>} Promise phân giải với mảng các đối tượng Product.
   */
  getProducts: async (categoryId?: string): Promise<Product[]> => {
    initialFakeData();
    const productsData = localStorage.getItem(PRODUCT_STORAGE_KEY);
    let products: Product[] = productsData ? JSON.parse(productsData) : [];

    if (categoryId) {
      products = products.filter((product) => product.categoryId === categoryId);
    }
    return products;
  },

  /**
   * @function createProduct
   * @description Tạo mới một Product và lưu vào localStorage. Tự động gán vào category "All" nếu không có categoryId.
   * @param {Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'shopId'>} newProductData - Dữ liệu Product mới.
   * @returns {Promise<Product>} Promise phân giải với đối tượng Product đã tạo.
   */
  createProduct: async (
    newProductData: Omit<Product, "id" | "createdAt" | "updatedAt" | "shopId">
  ): Promise<Product> => {
    initialFakeData();
    const products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]"
    );
    const categories: Category[] = JSON.parse(
      localStorage.getItem(CATEGORY_STORAGE_KEY) || "[]"
    );
    const defaultCategory = categories.find((cat) => cat.isDefault);

    const newProduct: Product = {
      ...newProductData,
      id: generateId(),
      shopId: (await sellerService.getShop())?.id || "default-shop-id", // Lấy shopId từ shop hiện tại
      categoryId: newProductData.categoryId || defaultCategory?.id, // Gán category "All" nếu không có
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  },

  /**
   * @function updateProduct
   * @description Cập nhật thông tin một Product trong localStorage.
   * @param {Product} product - Đối tượng Product cần cập nhật.
   * @returns {Promise<Product>} Promise phân giải với đối tượng Product đã cập nhật.
   */
  updateProduct: async (product: Product): Promise<Product> => {
    initialFakeData();
    let products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]"
    );
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      throw new Error("Product not found.");
    }
    const updatedProduct = { ...product, updatedAt: new Date() };
    products[index] = updatedProduct;
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  /**
   * @function deleteProduct
   * @description Xóa một Product khỏi localStorage.
   * @param {string} productId - ID của Product cần xóa.
   * @returns {Promise<void>} Promise phân giải khi xóa thành công.
   */
  deleteProduct: async (productId: string): Promise<void> => {
    initialFakeData();
    let products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]"
    );
    products = products.filter((p) => p.id !== productId);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  },
};

// Khởi tạo dữ liệu khi script được tải
initialFakeData();
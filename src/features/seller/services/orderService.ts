/**
 * @fileoverview Dịch vụ quản lý đơn hàng cho seller, sử dụng localStorage để lưu trữ dữ liệu.
 * Bao gồm các chức năng lấy danh sách đơn hàng, cập nhật trạng thái đơn hàng.
 */

import { Axios } from "@/api/Axios";
import { Order, OrderStatus } from "@/types";

// Khóa lưu trữ trong localStorage
const ORDER_STORAGE_KEY = "seller_orders_data";

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
 * @description Khởi tạo dữ liệu giả ban đầu cho Order nếu chưa có trong localStorage.
 */
const initialFakeData = () => {
  let orders = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null");

  if (!orders) {
    // Tạo một số đơn hàng mẫu
    const sampleOrders: Order[] = [
      {
        id: 1,
        code: "ORD-001",
        totalQuantity: 3,
        status: OrderStatus.PENDING,
        totalPrice: 150000,
        timeOrder: "2025-08-10T10:30:00",
        timePay: "2025-08-10T10:35:00",
        phoneNumber: "0987654321",
        feeShip: 15000,
        sumTotal: 165000,
        address: {},
        paymentMethod: { id: 1, name: "COD" },
        ship: { id: 1, name: "Standard Shipping" },
        userDTO: { id: 1, fullName: "Nguyễn Văn A", email: "nguyenvana@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 1,
            quantity: 2,
            isReview: false,
            totalPrice: 100000,
            shop: { id: 1, name: "Tech Shop", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 1,
              title: "Stylish T-Shirt",
              slug: "stylish-t-shirt",
              status: true,
              imagesDTOList: [{id: 1, path: "https://via.placeholder.com/300/FFFF00/000000?text=T-Shirt1"}],
              price: 50000,
            },
          },
          {
            id: 2,
            quantity: 1,
            isReview: false,
            totalPrice: 50000,
            shop: { id: 1, name: "Tech Shop", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 2,
              title: "Ergonomic Office Chair",
              slug: "ergonomic-office-chair",
              status: true,
              imagesDTOList: [{id: 2, path: "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Chair1"}],
              price: 50000,
            },
          },
        ],
        orderAddressDTO: {
          id: 1,
          address: "123 Main Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654321",
          fullName: "Nguyễn Văn A",
          isCurrent: true,
          user: null,
          userId: 1,
        },
      },
      {
        id: 2,
        code: "ORD-002",
        totalQuantity: 1,
        status: OrderStatus.CONFIRMED,
        totalPrice: 75000,
        timeOrder: "2025-08-09T14:20:00",
        timePay: "2025-08-09T14:25:00",
        phoneNumber: "0987654322",
        feeShip: 15000,
        sumTotal: 90000,
        address: {},
        paymentMethod: { id: 2, name: "Bank Transfer" },
        ship: { id: 1, name: "Standard Shipping" },
        userDTO: { id: 2, fullName: "Trần Thị B", email: "tranthib@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 3,
            quantity: 1,
            isReview: false,
            totalPrice: 75000,
            shop: { id: 2, name: "Electronics Store", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 3,
              title: "Wireless Bluetooth Headphones",
              slug: "wireless-bluetooth-headphones",
              status: true,
              imagesDTOList: [{id: 3, path: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Headphones1"}],
              price: 75000,
            },
          },
        ],
        orderAddressDTO: {
          id: 2,
          address: "456 Second Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654322",
          fullName: "Trần Thị B",
          isCurrent: true,
          user: null,
          userId: 2,
        },
      },
      {
        id: 3,
        code: "ORD-003",
        totalQuantity: 2,
        status: OrderStatus.PROCESSING,
        totalPrice: 120000,
        timeOrder: "2025-08-08T09:15:00",
        timePay: "2025-08-08T09:20:00",
        phoneNumber: "0987654323",
        feeShip: 15000,
        sumTotal: 135000,
        address: {},
        paymentMethod: { id: 1, name: "COD" },
        ship: { id: 2, name: "Express Shipping" },
        userDTO: { id: 3, fullName: "Lê Văn C", email: "levanc@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 4,
            quantity: 2,
            isReview: false,
            totalPrice: 120000,
            shop: { id: 2, name: "Electronics Store", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 4,
              title: "Smart Watch",
              slug: "smart-watch",
              status: true,
              imagesDTOList: [{id: 4, path: "https://via.placeholder.com/300/00FF00/000000?text=Watch1"}],
              price: 60000,
            },
          },
        ],
        orderAddressDTO: {
          id: 3,
          address: "789 Third Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654323",
          fullName: "Lê Văn C",
          isCurrent: true,
          user: null,
          userId: 3,
        },
      },
      {
        id: 4,
        code: "ORD-004",
        totalQuantity: 1,
        status: OrderStatus.SHIPPED,
        totalPrice: 200000,
        timeOrder: "2025-08-07T16:45:00",
        timePay: "2025-08-07T16:50:00",
        phoneNumber: "0987654324",
        feeShip: 0, // Free shipping
        sumTotal: 200000,
        address: {},
        paymentMethod: { id: 3, name: "E-wallet" },
        ship: { id: 2, name: "Express Shipping" },
        userDTO: { id: 4, fullName: "Phạm Thị D", email: "phamthid@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 5,
            quantity: 1,
            isReview: false,
            totalPrice: 200000,
            shop: { id: 3, name: "Mobile Accessories", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 5,
              title: "Premium Smartphone Case",
              slug: "premium-smartphone-case",
              status: true,
              imagesDTOList: [{id: 5, path: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Case1"}],
              price: 200000,
            },
          },
        ],
        orderAddressDTO: {
          id: 4,
          address: "101 Fourth Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654324",
          fullName: "Phạm Thị D",
          isCurrent: true,
          user: null,
          userId: 4,
        },
      },
      {
        id: 5,
        code: "ORD-005",
        totalQuantity: 3,
        status: OrderStatus.DELIVERED,
        totalPrice: 350000,
        timeOrder: "2025-08-05T11:30:00",
        timePay: "2025-08-05T11:35:00",
        phoneNumber: "0987654325",
        feeShip: 15000,
        sumTotal: 365000,
        address: {},
        paymentMethod: { id: 2, name: "Bank Transfer" },
        ship: { id: 3, name: "Free Shipping" },
        userDTO: { id: 5, fullName: "Hoàng Văn E", email: "hoangvane@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 6,
            quantity: 1,
            isReview: true,
            star: 5,
            totalPrice: 150000,
            shop: { id: 1, name: "Tech Shop", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 6,
              title: "Mechanical Keyboard",
              slug: "mechanical-keyboard",
              status: true,
              imagesDTOList: [{id: 6, path: "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Keyboard1"}],
              price: 150000,
            },
          },
          {
            id: 7,
            quantity: 2,
            isReview: true,
            star: 4,
            totalPrice: 200000,
            shop: { id: 1, name: "Tech Shop", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 7,
              title: "Gaming Mouse",
              slug: "gaming-mouse",
              status: true,
              imagesDTOList: [{id: 7, path: "https://via.placeholder.com/300/00FFFF/000000?text=Mouse1"}],
              price: 100000,
            },
          },
        ],
        orderAddressDTO: {
          id: 5,
          address: "202 Fifth Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654325",
          fullName: "Hoàng Văn E",
          isCurrent: true,
          user: null,
          userId: 5,
        },
      },
      {
        id: 6,
        code: "ORD-006",
        totalQuantity: 1,
        status: OrderStatus.CANCELLED,
        totalPrice: 500000,
        timeOrder: "2025-08-04T13:20:00",
        timePay: "",
        phoneNumber: "0987654326",
        feeShip: 15000,
        sumTotal: 515000,
        address: {},
        paymentMethod: { id: 1, name: "COD" },
        ship: { id: 1, name: "Standard Shipping" },
        userDTO: { id: 6, fullName: "Ngô Thị F", email: "ngothif@example.com" },
        shop: {
          id: 1,
          name: "My Awesome Shop",
          avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=ShopLogo",
        },
        cartEntities: [
          {
            id: 8,
            quantity: 1,
            isReview: false,
            totalPrice: 500000,
            shop: { id: 2, name: "Electronics Store", avatar: "https://via.placeholder.com/50", status: true },
            productDTO: {
              id: 8,
              title: "Premium Headset",
              slug: "premium-headset",
              status: true,
              imagesDTOList: [{id: 8, path: "https://via.placeholder.com/300/FFFF00/000000?text=Headset1"}],
              price: 500000,
            },
          },
        ],
        orderAddressDTO: {
          id: 6,
          address: "303 Sixth Street, City, Country",
          shopIdDistrict: 1,
          isShop: false,
          phoneNumber: "0987654326",
          fullName: "Ngô Thị F",
          isCurrent: true,
          user: null,
          userId: 6,
        },
      },
    ];

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(sampleOrders));
  }
};

/**
 * @namespace orderService
 * @description Đối tượng chứa các hàm API giả cho quản lý đơn hàng của seller.
 */
export const orderService = {
  /**
   * @function getOrdersByShop
   * @description Lấy danh sách đơn hàng của một shop từ localStorage.
   * @param {number} shopId - ID của shop.
   * @returns {Promise<Order[]>} Promise phân giải với mảng các đối tượng Order.
   */
  getOrdersByShop: async (shopId: number): Promise<Order[]> => {
    initialFakeData();
    const ordersData = localStorage.getItem(ORDER_STORAGE_KEY);
    let orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    // Lọc đơn hàng theo shopId
    orders = orders.filter((order) => order.shop?.id === shopId);
    return orders;
  },

  /**
   * @function getOrdersByShopAndStatus
   * @description Lấy danh sách đơn hàng của một shop theo trạng thái từ localStorage.
   * @param {number} shopId - ID của shop.
   * @param {OrderStatus} status - Trạng thái đơn hàng.
   * @returns {Promise<Order[]>} Promise phân giải với mảng các đối tượng Order.
   */
  getOrdersByShopAndStatus: async (shopId: number, status: OrderStatus): Promise<Order[]> => {
    initialFakeData();
    const ordersData = localStorage.getItem(ORDER_STORAGE_KEY);
    let orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    // Lọc đơn hàng theo shopId và status
    orders = orders.filter((order) => order.shop?.id === shopId && order.status === status);
    return orders;
  },

  /**
   * @function getOrderById
   * @description Lấy thông tin chi tiết của một đơn hàng từ localStorage.
   * @param {number} orderId - ID của đơn hàng.
   * @returns {Promise<Order | null>} Promise phân giải với đối tượng Order hoặc null nếu không tìm thấy.
   */
  getOrderById: async (orderId: number): Promise<Order | null> => {
    initialFakeData();
    const ordersData = localStorage.getItem(ORDER_STORAGE_KEY);
    let orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    const order = orders.find((order) => order.id === orderId);
    return order || null;
  },

  /**
   * @function updateOrderStatus
   * @description Cập nhật trạng thái của một đơn hàng trong localStorage.
   * @param {number} orderId - ID của đơn hàng.
   * @param {OrderStatus} newStatus - Trạng thái mới của đơn hàng.
   * @returns {Promise<Order | null>} Promise phân giải với đối tượng Order đã cập nhật hoặc null nếu không tìm thấy.
   */
  updateOrderStatus: async (orderId: number, newStatus: OrderStatus): Promise<Order | null> => {
    initialFakeData();
    const ordersData = localStorage.getItem(ORDER_STORAGE_KEY);
    let orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) {
      return null;
    }

    // Cập nhật trạng thái đơn hàng
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: newStatus,
    };

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    return orders[orderIndex];
  },

  /**
   * @function searchOrders
   * @description Tìm kiếm đơn hàng theo từ khóa (mã đơn hàng, tên khách hàng, số điện thoại).
   * @param {number} shopId - ID của shop.
   * @param {string} keyword - Từ khóa tìm kiếm.
   * @returns {Promise<Order[]>} Promise phân giải với mảng các đối tượng Order phù hợp với từ khóa.
   */
  searchOrders: async (shopId: number, keyword: string): Promise<Order[]> => {
    initialFakeData();
    const ordersData = localStorage.getItem(ORDER_STORAGE_KEY);
    let orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    // Lọc đơn hàng theo shopId
    orders = orders.filter((order) => order.shop?.id === shopId);

    if (!keyword.trim()) {
      return orders;
    }

    // Tìm kiếm theo từ khóa (không phân biệt hoa thường)
    const lowercaseKeyword = keyword.toLowerCase();
    return orders.filter(
      (order) =>
        order.code.toLowerCase().includes(lowercaseKeyword) ||
        order.orderAddressDTO?.fullName?.toLowerCase().includes(lowercaseKeyword) ||
        order.phoneNumber.toLowerCase().includes(lowercaseKeyword)
    );
  },
};

// Khởi tạo dữ liệu khi script được tải
initialFakeData();

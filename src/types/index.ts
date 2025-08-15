// Product Types - Dựa trên tbl_product
export interface Product {
  // Thông tin cơ bản
  id: number; // bigint(20) trong SQL
  slug: string;
  title: string; // title trong SQL
  description?: string; // description text trong SQL
  status: boolean; // status tinyint(1)
  totalProduct?: number; // Tổng số lượng sản phẩm

  // Thông tin chi tiết sản phẩm
  brand?: string; // brand varchar(255)
  material?: string; // material varchar(255)
  origin?: string; // origin varchar(255)
  style?: string; // style varchar(255)
  height?: number; // height float
  width?: number; // width float
  length?: number; // length float
  weight?: number; // weight float

  // Thông tin đánh giá và tương tác
  star?: number; // star double - rating
  totalReview?: number; // Tổng số đánh giá
  totalLike?: number; // Tổng số lượt thích
  isLike?: boolean; // Người dùng hiện tại đã thích chưa
  totalProductSold?: number; // total_product_sold int(11)
  ordered?: boolean; // ordered tinyint(1)

  // Flags đặc biệt
  isNew?: boolean; // is_new tinyint(1)
  timeCreate?: string; // Ngày tạo sản phẩm dạng string

  // Thông tin liên kết
  collectionResponse?: CollectionResponse; // Thông tin collection (optional khi populate)

  // Các đối tượng liên kết
  shop?: Shop; // Thông tin shop (optional khi populate)
  discount?: Discount; // Thông tin discount (optional khi populate)

  // Danh sách biến thể và hình ảnh
  optionDTOs?: Option[]; // Danh sách option
  imagesDTOList?: Image[]; // Danh sách hình ảnh

  // Thông tin tính toán
  sumPriceByOrders?: number; // Tổng doanh thu từ sản phẩm

  price?: number; // Giá sản phẩm
  priceSale?: number; // Giá sau khi giảm giá
}

// Item Top-Selling trả về từ API /api/shop/stats/top-products
export interface TopProductItem {
  productId: number;
  title: string;
  unitsSold: number;
  revenuePaid: number;
}

export interface Option {
  id: number; // bigint(20) trong SQL
  name: string; // name varchar(255)
  type: number;
  keyOption?: string;
}

// Category Tree Type - Dựa trên cấu trúc lồng nhau của danh mục
export interface CategoryTree {
  id: number;
  slug?: string;
  name: string;
  child: CategoryTree | null; // Có thể có các danh mục con hoặc null
}

// Collection Response Type - Dựa trên cấu trúc JSON người dùng cung cấp
export interface CollectionResponse {
  id: number;
  slug?: string;
  name: string;
  categoryTree: CategoryTree | null; // Có thể có categoryTree hoặc null
}

// Shop Types - Dựa trên tbl_shop
export interface Shop {
  id: number; // bigint(20) trong SQL
  slug?: string;
  name?: string; // name varchar(255)
  avatar?: string; // avatar varchar(255) - logo của shop
  banner?: string; // banner varchar(255) - hình nền của shop
  status?: boolean; // status tinyint(1)
  timeRequest?: string; // time_request datetime
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  user?: User;
  totalProductInShop?: number;
  totalReviewInShop?: number;
}

// Discount Types - Dựa trên tbl_discount
export interface Discount {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  description?: string; // Mô tả về khuyến mãi
  discount_percent?: number; // Phần trăm giảm giá
  active?: boolean; // Trạng thái hoạt động
  // Các trường bổ sung
  startDate?: Date; // start_date datetime
  endDate?: Date; // end_date datetime
  status?: boolean; // status tinyint(1)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Role Types - Dựa trên tbl_role
export interface Role {
  id: number; // int(11) trong SQL
  name?: string; // name varchar(255), ví dụ: ROLE_USER, ROLE_ADMIN, ROLE_SHOP_MANAGER
}

// Category Types - Dựa trên tbl_category
export interface Category {
  id: number; // bigint(20) trong SQL
  slug?: string;
  name?: string; // name varchar(255)
  active?: boolean; // active tinyint(1)
  isShowSuggest?: boolean; // is_show_suggests tinyint(1)
  parentId?: number; // parent_id bigint(20)
  parent?: Category; // Thông tin parent category (optional khi populate)
  child?: Category[]; // Thông tin child categories (optional khi populate)
}

// Address Types - Dựa trên tbl_address
export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  orderNotes?: string;
  isCurrent: boolean;
  shopIdDistrict?: number;
  userId?: number;
}

// User Types - Dựa trên tbl_user
export interface User {
  id: number; // bigint(20) trong SQL
  username?: string; // username varchar(255)
  email?: string; // email varchar(255)
  password?: string; // password varchar(255)
  avatar?: string; // avatar varchar(255)
  file?: any; // File avatar nếu có
  phone?: string; // phone varchar(255)
  address?: string; // address varchar(255)
  gender?: "male" | "female" | "other" | null; // gender bit(1)
  dayOfBirth?: number | null; // day_of_birth int(11)
  monthOfBirth?: number | null; // month_of_birth int(11)
  yearOfBirth?: number | null; // year_of_birth int(11)
  date?: string | null; // Ngày sinh dạng string
  active?: number; // active tinyint(4)
  roleId?: number | null; // ID của role chính
  shopName?: string | null; // Tên shop nếu là người bán
  newAccount?: boolean; // Đánh dấu tài khoản mới
  shop?: Shop; // Thông tin shop (optional khi populate)
  roles?: Role[]; // Thông tin roles (optional khi populate)
}

export interface TopProductItem {
  productId: number;
  title: string;
  unitsSold: number; // số lượng bán ra
  revenuePaid: number; // doanh thu đã thanh toán
}

// Dashboard Stats Types - Tính toán từ các bảng khác
export interface DashboardStats {
  // Core metrics directly from BE
  totalProducts: number; // from overview.totalProducts
  totalOrders: number; // from overview.totalOrdersPaid|totalOrders
  totalRevenue: number; // from overview.totalRevenuePaid|totalRevenue
  revenueTrend: { date: string; revenue: number }[]; // from timeseries

  // Optional aggregates provided by BE (if any)
  totalItemsSold?: number; // from overview.totalItemsSold
  averageOrderValue?: number; // from overview.averageOrderValue
  conversionRate?: number; // from overview.conversionRate
  totalCategories?: number; // from overview.totalCategories

  // Optional lists from BE for UI (may be absent)
  topSellingProducts?: TopProductItem[]; // from stats/top-products
  topProducts?: Product[]; // from overview.topProducts
  recentOrders?: Order[]; // from overview.recentOrders

  // Legacy/unused locally computed metrics
  monthlyRevenue?: number[]; // deprecated, keep optional for backward compatibility
}

// Stats API Types for Seller Dashboard
// Nhóm thời gian cho API thống kê: day|week|month|year
export type StatsGroupBy = "day" | "week" | "month" | "year";

// Tổng quan thống kê trả về từ /api/shop/stats/overview
export interface StatsOverview {
  totalProducts?: number;
  totalOrders?: number;
  totalRevenue?: number;
  pendingOrders?: number;
  // Danh sách sản phẩm bán chạy/được quan tâm
  topSellingProducts?: Product[];
  topProducts?: Product[];
  // Đơn hàng gần đây nếu backend có trả
  recentOrders?: Order[];
  // Trường từ backend (paid metrics)
  totalRevenuePaid?: number;
  totalOrdersPaid?: number;
  totalItemsSold?: number;
  averageOrderValue?: number;
  conversionRate?: number;
  totalCategories?: number;
}

// Điểm dữ liệu chuỗi thời gian từ /api/shop/stats/timeseries
export interface TimeSeriesPoint {
  // Nhãn bucket theo groupBy (ví dụ: 2025-08-01, 2025-W32, 2025-08, 2025)
  date: string;
  // Doanh thu tại bucket
  revenue: number;
  // Số đơn tại bucket (optional nếu backend có trả)
  orders?: number;
  // Trường tương thích với backend
  label?: string;
  revenuePaid?: number;
  ordersPaid?: number;
  itemsSold?: number;
}

// Image Types - Dựa trên tbl_image
export interface Image {
  id: number; // bigint(20) trong SQL
  path?: string; // path varchar(255)
  type?: number; // type int(11) - 0: thumbnail, 1: detail
  optionId?: number; // option_id bigint(20)
}

//   Types - Dựa trên tbl_cart
export interface Cart {
  id: number; // bigint(20) trong SQL
  quantity: number; // quantity int(11)
  isReview: boolean; // is_review bit(1)
  star?: number | null; // star bigint(20) - rating
  // Các trường bổ sung từ API response
  cartIds?: number[] | null; // IDs của cart items
  name?: string | null; // Tên sản phẩm
  variantValues?: Record<string, number> | null; // Giá trị variant
  // Relations
  shop: Shop; // Thông tin shop
  productDTO?: Product; // Thông tin product từ API
  totalPrice?: number; // Tổng giá trị của mặt hàng
}

// Order Types - Dựa trên tbl_orders
export interface Order {
  id: number;
  address: any; // Dựa trên API, có thể là null hoặc một đối tượng địa chỉ
  totalQuantity: number;
  status: OrderStatus;
  totalPrice: number;
  shop: any; // Tạm thời là any, có thể định nghĩa interface Shop sau
  cartEntities: Cart[];
  paymentMethod: any; // Tạm thời là any
  ship: any; // Tạm thời là any
  timeOrder: string; // "DD-MM-YYYY"
  timePay: string; // "DD-MM-YYYY"
  phoneNumber: string;
  orderAddressDTO: Address;
  code: string;
  sumTotal: number;
  userDTO: any; // Tạm thời là any, có thể định nghĩa interface UserDTO sau
  feeShip: number;
}

// Order Status enum
export enum OrderStatus {
  ALL = "all",
  PENDING_CONFIRMATION = 0,
  AWAITING_PICKUP = 1,
  IN_DELIVERY = 2,
  COMPLETED = 3,
}

// Product Types - Dựa trên tbl_product
export interface Product {
  name: string;
  images: any;
  id: number; // bigint(20) trong SQL
  title: string; // title trong SQL
  description?: string; // description text trong SQL
  content?: string; // content text trong SQL
  brand?: string; // brand varchar(255)
  material?: string; // material varchar(255)
  origin?: string; // origin varchar(255)
  style?: string; // style varchar(255)
  height?: number; // height float
  width?: number; // width float
  length?: number; // length float
  weight?: number; // weight float
  star?: number; // star double - rating
  totalProductSold: number; // total_product_sold int(11)
  status: boolean; // status tinyint(1)
  isNew?: boolean; // is_new tinyint(1)
  isFlashSale: boolean; // is_flash_sale tinyint(1)
  isTrending: boolean; // is_trending tinyint(1)
  timeFlashSale?: Date; // time_flash_sale date
  ordered?: boolean; // ordered tinyint(1)
  categoriesId?: number; // categories_id bigint(20)
  discountId?: number; // discount_id bigint(20)
  shopId?: number; // shop_id bigint(20)
  shop?: Shop; // Thông tin shop (optional khi populate)
  category?: Category; // Thông tin category (optional khi populate)
  discount?: Discount; // Thông tin discount (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Size và Color được thay thế bằng Variant và VariantValue
// Có thể tạo type aliases để tương thích ngược nếu cần
export type Size = VariantValue;
export type Color = VariantValue;

// Shop Types - Dựa trên tbl_shop
export interface Shop {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  avatar?: string; // avatar varchar(255) - logo của shop
  status?: boolean; // status tinyint(1)
  timeRequest?: Date; // time_request datetime
  userId?: number; // user_id bigint(20) - ID của user sở hữu shop
  user?: User; // Thông tin owner (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Discount Types - Dựa trên tbl_discount
export interface Discount {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  percent?: number; // percent double
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
  name?: string; // name varchar(255)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// User Token Types - Dựa trên tbl_user_token
export interface UserToken {
  id: number; // bigint(20) trong SQL
  token: string; // token varchar(255)
  expiryDate: Date; // expiry_date datetime
  userId?: number; // user_id bigint(20)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Refresh Token Types - Dựa trên tbl_refreshtoken
export interface RefreshToken {
  id: number; // bigint(20) trong SQL
  expiryDate: Date; // expiry_date datetime
  token: string; // token varchar(255)
  userId?: number; // user_id bigint(20)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Category Types - Dựa trên tbl_category
export interface Category {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  icon?: string; // icon varchar(255)
  active?: boolean; // active tinyint(1)
  isShowSuggests: boolean; // is_show_suggets bit(1)
  totalProduct?: number; // total_product int(11)
  parentId?: number; // parent_id bigint(20) - cho subcategory
  parent?: Category; // Thông tin category cha (optional khi populate)
  subcategories?: Category[]; // Danh sách subcategories (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Subcategory được merge vào Category với parentId
// export interface Subcategory - Không cần thiết vì đã merge vào Category

// User Types - Dựa trên tbl_user
export interface User {
  id: number; // bigint(20) trong SQL
  username?: string; // username varchar(255)
  email?: string; // email varchar(255)
  password?: string; // password varchar(255) - chỉ dùng khi cần thiết
  avatar?: string; // avatar varchar(255)
  phone?: string; // phone varchar(255)
  address?: string; // address varchar(255)
  gender?: boolean; // gender bit(1)
  dayOfBirth?: number; // day_of_birth int(11)
  monthOfBirth?: number; // month_of_birth int(11)
  yearOfBirth?: number; // year_of_birth int(11)
  active?: number; // active int(11) - trạng thái hoạt động
  shop?: Shop; // Thông tin shop (optional khi populate)
  roles?: Role[]; // Danh sách roles từ bảng user_roles
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// User Role Types - Dựa trên user_roles table
export interface UserRole {
  userId: number; // user_id bigint(20)
  roleId: number; // role_id int(11)
  user?: User; // Thông tin user (optional khi populate)
  role?: Role; // Thông tin role (optional khi populate)
}

// Dashboard Stats Types - Tính toán từ các bảng khác
export interface DashboardStats {
  totalProducts: number; // Tính từ tbl_product
  totalOrders: number; // Tính từ tbl_orders
  totalRevenue: number; // Tính từ tbl_orders.total_price
  pendingOrders: number; // Tính từ tbl_orders với status = 0
  monthlyRevenue: number[]; // Tính theo tháng từ tbl_orders
  topProducts: Product[]; // Sản phẩm bán chạy từ tbl_product.total_product_sold
  recentOrders: Order[]; // Đơn hàng gần đây từ tbl_orders
}

// Order Address Types - Dựa trên tbl_orders_address
export interface OrderAddress {
  id: number; // bigint(20) trong SQL
  address?: string; // address varchar(255)
  name?: string; // name varchar(255)
  phone?: string; // phone varchar(255)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Payment Method Types - Dựa trên tbl_payment_method
export interface PaymentMethod {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  status?: boolean; // status tinyint(1)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Ship Types - Dựa trên tbl_ship
export interface Ship {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  price?: number; // price double
  status?: boolean; // status tinyint(1)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Product SKU Types - Dựa trên tbl_product_sku
export interface ProductSku {
  id: number; // bigint(20) trong SQL
  price?: number; // price double
  quantity?: number; // quantity int(11)
  status?: boolean; // status tinyint(1)
  productId?: number; // product_id bigint(20)
  variantValueId?: number; // variant_value_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  variantValue?: VariantValue; // Thông tin variant value (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Variant Types - Dựa trên tbl_variant
export interface Variant {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  productId?: number; // product_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  variantValues?: VariantValue[]; // Danh sách variant values (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Variant Value Types - Dựa trên tbl_variant_value
export interface VariantValue {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  variantsId?: number; // variants_id bigint(20)
  variant?: Variant; // Thông tin variant (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Images Types - Dựa trên tbl_images
export interface Image {
  id: number; // bigint(20) trong SQL
  name?: string; // name varchar(255)
  path?: string; // path varchar(255)
  productId?: number; // product_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

//   Types - Dựa trên tbl_cart
export interface Cart {
  id: number; // bigint(20) trong SQL
  quantity: number; // quantity int(11)
  totalPrice?: number; // total_price double
  percentDiscount?: number; // percent_discount double
  isPay?: boolean; // is_pay bit(1)
  isReview?: boolean; // is_review bit(1)
  star?: number; // star bigint(20) - rating
  status?: boolean; // status bit(1)
  ordersEntityId?: number; // orders_entity_id bigint(20)
  productSkusEntityId?: number; // product_skus_entity_id bigint(20)
  shopId?: number; // shop_id bigint(20)
  userId?: number; // user_id bigint(20)
  // Relations
  user?: User; // Thông tin user (optional khi populate)
  shop?: Shop; // Thông tin shop (optional khi populate)
  product?: Product; // Thông tin product (optional khi populate)
  order?: Order; // Thông tin order (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Order Types - Dựa trên tbl_orders
export interface Order {
  id: number; // bigint(20) trong SQL
  code?: string; // code varchar(255) - order number
  totalPrice?: number; // total_price double
  totalQuantity?: number; // total_quantity int(11)
  feeShip?: number; // fee_ship double
  status?: number; // status int(11)
  timeOrder?: Date; // time_order datetime
  timePay?: Date; // time_pay datetime
  orderAddressEntityId?: number; // order_address_entity_id bigint(20)
  paymentMethodEntityId?: number; // payment_method_entity_id bigint(20)
  shipEntityId?: number; // ship_entity_id bigint(20)
  userId?: number; // user_id bigint(20)
  // Relations
  user?: User; // Thông tin user (optional khi populate)
  orderAddress?: OrderAddress; // Thông tin địa chỉ (optional khi populate)
  paymentMethod?: PaymentMethod; // Thông tin thanh toán (optional khi populate)
  shipEntity?: Ship; // Thông tin vận chuyển (optional khi populate)
  cartItems?: Cart[]; // Danh sách items trong order
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Order Status enum
export enum OrderStatus {
  PENDING = 0,
  CONFIRMED = 1,
  PROCESSING = 2,
  SHIPPED = 3,
  DELIVERED = 4,
  CANCELLED = 5,
}

// Interactive Types - Dựa trên tbl_interactive
export interface Interactive {
  id: number; // bigint(20) trong SQL
  type?: string; // type varchar(255)
  productId?: number; // product_id bigint(20)
  userId?: number; // user_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Feedback Types - Dựa trên tbl_feedback
export interface Feedback {
  id: number; // bigint(20) trong SQL
  content?: string; // content text
  star?: number; // star bigint(20)
  productId?: number; // product_id bigint(20)
  userId?: number; // user_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Comment Types - Dựa trên tbl_comment
export interface Comment {
  id: number; // bigint(20) trong SQL
  content?: string; // content text
  productId?: number; // product_id bigint(20)
  userId?: number; // user_id bigint(20)
  product?: Product; // Thông tin product (optional khi populate)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Notification Types - Dựa trên tbl_notify
export interface Notification {
  id: number; // bigint(20) trong SQL
  content?: string; // content text
  title?: string; // title varchar(255)
  type?: string; // type varchar(255)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Notification User Types - Dựa trên tbl_notify_user
export interface NotificationUser {
  id: number; // bigint(20) trong SQL
  answer?: string; // answer text
  isRead?: boolean; // is_read bit(1)
  notifyId?: number; // notify_id bigint(20)
  userId?: number; // user_id bigint(20)
  notification?: Notification; // Thông tin notification (optional khi populate)
  user?: User; // Thông tin user (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// Message Types - Dựa trên tbl_message
export interface Message {
  id: number; // bigint(20) trong SQL
  content?: string; // content text
  isRead?: boolean; // is_read bit(1)
  receiverId?: number; // receiver_id bigint(20)
  senderId?: number; // sender_id bigint(20)
  receiver?: User; // Thông tin receiver (optional khi populate)
  sender?: User; // Thông tin sender (optional khi populate)
  // Audit fields
  createBy?: string; // create_by varchar(255)
  createDate?: Date; // create_date datetime
  modifierBy?: string; // modifier_by varchar(255)
  modifierDate?: Date; // modifier_date datetime
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}

// Filter Types cho frontend
export interface ProductFilters {
  categories?: number[];
  brands?: string[];
  priceRange?: [number, number];
  inStock?: boolean;
  onSale?: boolean;
  rating?: number;
  shopId?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

// WishlistItem Types - Sử dụng trong WishlistContext
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

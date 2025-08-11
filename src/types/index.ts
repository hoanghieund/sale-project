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
  totalPrice?: number; // Tổng số sản phẩm đã bán
  totalQuantity?: number; // Tổng số sản phẩm
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  user?: User;
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
  icon?: string; // icon varchar(255)
  iconFile?: any; // File icon nếu có
  active?: boolean; // active tinyint(1)
  isShowSuggest?: boolean; // is_show_suggests tinyint(1)
  totalProduct?: number; // total_product int(11)
  parentId?: number; // parent_id bigint(20)
  parent?: Category; // Thông tin parent category (optional khi populate)
  child?: Category[]; // Thông tin child categories (optional khi populate)
}

// Address Types - Dựa trên tbl_address
export interface Address {
  address: string;
  fullName: string;
  id: number;
  isCurrent: boolean;
  isShop: boolean;
  phoneNumber: string;
  shopIdDistrict: number;
  user: User;
  userId: number;
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

// Dashboard Stats Types - Tính toán từ các bảng khác
export interface DashboardStats {
  totalProducts: number; // Tính từ tbl_product
  totalOrders: number; // Tính từ tbl_orders
  totalRevenue: number; // Tính từ tbl_orders.total_price
  topSellingProducts: Product[]; // Tính từ tbl_product.total_product_sold
  pendingOrders: number; // Tính từ tbl_orders với status = 0
  monthlyRevenue: number[]; // Tính theo tháng từ tbl_orders
  topProducts: Product[]; // Sản phẩm bán chạy từ tbl_product.total_product_sold
  recentOrders: Order[]; // Đơn hàng gần đây từ tbl_orders
  revenueTrend: { date: string; revenue: number }[];
}

// Order Address Types - Dựa trên tbl_orders_address
export interface OrderAddress {
  id: number;
  address: string;
  shopIdDistrict: number;
  isShop: boolean;
  phoneNumber: string;
  fullName: string;
  isCurrent: boolean;
  user: any; // Tạm thời là any
  userId: number | null; // Có thể null
}

// Image Types - Dựa trên tbl_image
export interface Image {
  id: number; // bigint(20) trong SQL
  path?: string; // path varchar(255)
  type?: number; // type int(11) - 0: thumbnail, 1: detail
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
  orderAddressDTO: OrderAddress;
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

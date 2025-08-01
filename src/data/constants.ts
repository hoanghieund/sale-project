import { NavigationItem, SortOption } from '../types';

// Navigation Menu Structure - C2C Marketplace
export const NAVIGATION_MENU: NavigationItem[] = [
  {
    id: 'fashion',
    label: 'Thời trang',
    href: '/category/thoi-trang',
    children: [
      {
        id: 'men-clothing',
        label: 'Thời trang nam',
        href: '/category/thoi-trang-nam',
        children: [
          {
            id: 'men-shirts',
            label: 'Áo sơ mi nam',
            href: '/category/ao-so-mi-nam',
          },
          {
            id: 'men-tshirts',
            label: 'Áo thun nam',
            href: '/category/ao-thun-nam',
          },
          {
            id: 'men-pants',
            label: 'Quần nam',
            href: '/category/quan-nam',
          },
          {
            id: 'men-shoes',
            label: 'Giày nam',
            href: '/category/giay-nam',
          },
        ],
      },
      {
        id: 'women-clothing',
        label: 'Thời trang nữ',
        href: '/category/thoi-trang-nu',
        children: [
          {
            id: 'women-dresses',
            label: 'Váy nữ',
            href: '/category/vay-nu',
          },
          {
            id: 'women-tops',
            label: 'Áo nữ',
            href: '/category/ao-nu',
          },
          {
            id: 'women-pants',
            label: 'Quần nữ',
            href: '/category/quan-nu',
          },
          {
            id: 'women-shoes',
            label: 'Giày nữ',
            href: '/category/giay-nu',
          },
        ],
      },
      {
        id: 'accessories',
        label: 'Phụ kiện',
        href: '/category/phu-kien',
        children: [
          {
            id: 'bags',
            label: 'Túi xách',
            href: '/category/tui-xach',
          },
          {
            id: 'watches',
            label: 'Đồng hồ',
            href: '/category/dong-ho',
          },
          {
            id: 'jewelry',
            label: 'Trang sức',
            href: '/category/trang-suc',
          },
        ],
      },
    ],
  },
  {
    id: 'electronics',
    label: 'Điện tử',
    href: '/category/dien-tu',
    children: [
      {
        id: 'phones',
        label: 'Điện thoại',
        href: '/category/dien-thoai',
      },
      {
        id: 'laptops',
        label: 'Laptop',
        href: '/category/laptop',
      },
      {
        id: 'accessories-tech',
        label: 'Phụ kiện công nghệ',
        href: '/category/phu-kien-cong-nghe',
      },
    ],
  },
  {
    id: 'home-living',
    label: 'Nhà cửa & Đời sống',
    href: '/category/nha-cua-doi-song',
    children: [
      {
        id: 'furniture',
        label: 'Nội thất',
        href: '/category/noi-that',
      },
      {
        id: 'home-decor',
        label: 'Trang trí nhà',
        href: '/category/trang-tri-nha',
      },
      {
        id: 'kitchen',
        label: 'Đồ dùng nhà bếp',
        href: '/category/do-dung-nha-bep',
      },
    ],
  },
  {
    id: 'sports',
    label: 'Thể thao & Du lịch',
    href: '/category/the-thao-du-lich',
    children: [
      {
        id: 'sports-equipment',
        label: 'Dụng cụ thể thao',
        href: '/category/dung-cu-the-thao',
      },
      {
        id: 'travel-gear',
        label: 'Đồ du lịch',
        href: '/category/do-du-lich',
      },
    ],
  },
  {
    id: 'books',
    label: 'Sách',
    href: '/category/sach',
    children: [
      {
        id: 'fiction',
        label: 'Tiểu thuyết',
        href: '/category/tieu-thuyet',
      },
      {
        id: 'education',
        label: 'Sách giáo dục',
        href: '/category/sach-giao-duc',
      },
    ],
  },
];

// Sort Options
export const SORT_OPTIONS: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'rating', label: 'Customer Rating' },
];

// Shoe Sizes
export const SHOE_SIZES = [
  '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14'
];

// Popular Brands
export const BRANDS = [
  'Nike',
  'Adidas',
  'Jordan',
  'Puma',
  'New Balance',
  'Converse',
  'Vans',
  'Reebok',
  'Under Armour',
  'ASICS',
];

// Sports Categories
export const SPORTS_CATEGORIES = [
  {
    id: 'football',
    name: 'Football',
    image: '/assets/football.jpg',
  },
  {
    id: 'running',
    name: 'Running',
    image: '/assets/hero-running.jpg',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    image: '/assets/product-1.jpg',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image: '/assets/product-2.jpg',
  },
  {
    id: 'golf',
    name: 'Golf',
    image: '/assets/golf.jpg',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    image: '/assets/product-3.jpg',
  },
  {
    id: 'dance',
    name: 'Dance',
    image: '/assets/product-4.jpg',
  },
  {
    id: 'skateboarding',
    name: 'Skateboarding',
    image: '/assets/skateboarding.jpg',
  },
];

// Icon Categories
export const ICON_CATEGORIES = [
  {
    id: 'air-force-1',
    name: 'Air Force 1',
    image: '/assets/air-force-1.jpg',
  },
  {
    id: 'air-jordan-1',
    name: 'Air Jordan 1',
    image: '/assets/air-jordan.jpg',
  },
  {
    id: 'air-max',
    name: 'Air Max',
    image: '/assets/air-max.jpg',
  },
  {
    id: 'dunk',
    name: 'Dunk',
    image: '/assets/product-5.jpg',
  },
  {
    id: 'blazer',
    name: 'Blazer',
    image: '/assets/product-6.jpg',
  },
  {
    id: 'pegasus',
    name: 'Pegasus',
    image: '/assets/product-7.jpg',
  },
  {
    id: 'mercurial',
    name: 'Mercurial',
    image: '/assets/product-1.jpg',
  },
];

// Footer Links
export const FOOTER_LINKS = {
  shopping: [
    // Giữ lại các danh mục sản phẩm chính vì chúng phù hợp với luồng "Duyệt sản phẩm"
    { label: 'AIR FORCE 1', href: '/products/air-force-1' },
    { label: 'AIR JORDAN 1', href: '/products/air-jordan-1' },
    { label: 'AIR MAX', href: '/products/air-max' },
    { label: 'SHOP ALL NEW ARRIVALS', href: '/products/new-arrivals' },
    { label: 'BEST SELLERS', href: '/products/best-sellers' },
  ],
  help: [
    // Giữ lại các trang chính có trong luồng nghiệp vụ
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    // Loại bỏ các trang không có trong luồng nghiệp vụ, chuyển hướng đến trang Contact
    { label: 'Customer Support', href: '/contact' },
  ],
  policy: [
    // Đơn giản hóa các chính sách, chuyển hướng đến các trang có sẵn
    { label: 'Shipping & Returns', href: '/about' },
    { label: 'Order Tracking', href: '/account' },
    { label: 'Privacy Policy', href: '/about' },
    { label: 'Terms of Service', href: '/about' },
  ],
};

// Default Product Filters
export const DEFAULT_FILTERS = {
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  priceRange: [0, 1000] as [number, number],
  inStock: false,
  onSale: false,
  rating: 0,
};

// Color Options
export const COLOR_OPTIONS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'red', name: 'Red', hex: '#FF0000' },
  { id: 'blue', name: 'Blue', hex: '#0000FF' },
  { id: 'green', name: 'Green', hex: '#008000' },
  { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
  { id: 'orange', name: 'Orange', hex: '#FFA500' },
  { id: 'purple', name: 'Purple', hex: '#800080' },
  { id: 'pink', name: 'Pink', hex: '#FFC0CB' },
  { id: 'gray', name: 'Gray', hex: '#808080' },
];

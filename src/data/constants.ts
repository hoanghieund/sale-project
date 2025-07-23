import { NavigationItem, SortOption } from '../types';

// Navigation Menu Structure
export const NAVIGATION_MENU: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    href: '/products',
    children: [
      {
        id: 'featured-new',
        label: 'Featured New Products',
        href: '/products/featured',
        children: [
          {
            id: 'new-arrivals',
            label: 'Shop All New Arrivals',
            href: '/products/new-arrivals',
          },
          {
            id: 'best-sellers',
            label: 'Best Sellers',
            href: '/products/best-sellers',
          },
        ],
      },
      {
        id: 'shop-icons',
        label: 'Shop Icons',
        href: '/products/icons',
        children: [
          {
            id: 'air-force-1',
            label: 'Air Force 1',
            href: '/products/air-force-1',
          },
          {
            id: 'air-jordan-1',
            label: 'Air Jordan 1',
            href: '/products/air-jordan-1',
          },
          {
            id: 'air-max',
            label: 'Air Max',
            href: '/products/air-max',
          },
          {
            id: 'dunk',
            label: 'Dunk',
            href: '/products/dunk',
          },
          {
            id: 'blazer',
            label: 'Blazer',
            href: '/products/blazer',
          },
          {
            id: 'pegasus',
            label: 'Pegasus',
            href: '/products/pegasus',
          },
          {
            id: 'mercurial',
            label: 'Mercurial',
            href: '/products/mercurial',
          },
        ],
      },
      {
        id: 'discover-sports',
        label: 'Discover Sports',
        href: '/products/sports',
        children: [
          {
            id: 'football',
            label: 'Football',
            href: '/products/sports/football',
          },
          {
            id: 'running',
            label: 'Running',
            href: '/products/sports/running',
          },
          {
            id: 'basketball',
            label: 'Basketball',
            href: '/products/sports/basketball',
          },
          {
            id: 'fitness',
            label: 'Fitness',
            href: '/products/sports/fitness',
          },
          {
            id: 'golf',
            label: 'Golf',
            href: '/products/sports/golf',
          },
          {
            id: 'tennis',
            label: 'Tennis',
            href: '/products/sports/tennis',
          },
          {
            id: 'dance',
            label: 'Dance',
            href: '/products/sports/dance',
          },
          {
            id: 'skateboarding',
            label: 'Skateboarding',
            href: '/products/sports/skateboarding',
          },
        ],
      },
    ],
  },
  {
    id: 'women',
    label: 'Women',
    href: '/women',
  },
  {
    id: 'unisex',
    label: 'Unisex',
    href: '/unisex',
  },
  {
    id: 'kids',
    label: 'Kids',
    href: '/kids',
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
    image: '/src/assets/football.jpg',
  },
  {
    id: 'running',
    name: 'Running',
    image: '/src/assets/hero-running.jpg',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    image: '/src/assets/product-1.jpg',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image: '/src/assets/product-2.jpg',
  },
  {
    id: 'golf',
    name: 'Golf',
    image: '/src/assets/golf.jpg',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    image: '/src/assets/product-3.jpg',
  },
  {
    id: 'dance',
    name: 'Dance',
    image: '/src/assets/product-4.jpg',
  },
  {
    id: 'skateboarding',
    name: 'Skateboarding',
    image: '/src/assets/skateboarding.jpg',
  },
];

// Icon Categories
export const ICON_CATEGORIES = [
  {
    id: 'air-force-1',
    name: 'Air Force 1',
    image: '/src/assets/air-force-1.jpg',
  },
  {
    id: 'air-jordan-1',
    name: 'Air Jordan 1',
    image: '/src/assets/air-jordan.jpg',
  },
  {
    id: 'air-max',
    name: 'Air Max',
    image: '/src/assets/air-max.jpg',
  },
  {
    id: 'dunk',
    name: 'Dunk',
    image: '/src/assets/product-5.jpg',
  },
  {
    id: 'blazer',
    name: 'Blazer',
    image: '/src/assets/product-6.jpg',
  },
  {
    id: 'pegasus',
    name: 'Pegasus',
    image: '/src/assets/product-7.jpg',
  },
  {
    id: 'mercurial',
    name: 'Mercurial',
    image: '/src/assets/product-1.jpg',
  },
];

// Footer Links
export const FOOTER_LINKS = {
  shopping: [
    { label: 'AIR FORCE 1', href: '/products/air-force-1' },
    { label: 'AIR JORDAN 1', href: '/products/air-jordan-1' },
    { label: 'AIR MAX', href: '/products/air-max' },
    { label: 'SHOP ALL NEW ARRIVALS', href: '/products/new-arrivals' },
    { label: 'BEST SELLERS', href: '/products/best-sellers' },
  ],
  help: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Become A Vendor', href: '/become-vendor' },
    { label: 'Vendors List', href: '/vendors' },
    { label: 'Marketplace Guidelines', href: '/guidelines' },
  ],
  policy: [
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Returns & Refunds Policy', href: '/returns-policy' },
    { label: 'Order Tracking', href: '/order-tracking' },
    { label: 'Pricing & Accessibility', href: '/pricing' },
    { label: 'Authenticity Guarantee', href: '/authenticity' },
    { label: 'Off-Platform Transactions', href: '/off-platform' },
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

import { Product, Vendor, Size, Color } from '../types';

// Mock Vendors
export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'donekick',
    name: 'Donekick',
    slug: 'donekick',
    verified: true,
  },
  {
    id: 'peter-metlenko',
    name: 'Peter Metlenko',
    slug: 'peter-metlenko',
    verified: true,
  },
  {
    id: 'sarah-chan',
    name: 'Sarah Chan',
    slug: 'sarah-chan',
    verified: true,
  },
  {
    id: 'parviz-farmand',
    name: 'Parviz Farmand',
    slug: 'parviz-farmand',
    verified: true,
  },
  {
    id: 'steben-smith',
    name: 'Steben Smith',
    slug: 'steben-smith',
    verified: true,
  },
];

// Mock Sizes
export const MOCK_SIZES: Size[] = [
  { id: 'size-6', value: '6', available: true },
  { id: 'size-6-5', value: '6.5', available: true },
  { id: 'size-7', value: '7', available: true },
  { id: 'size-7-5', value: '7.5', available: true },
  { id: 'size-8', value: '8', available: true },
  { id: 'size-8-5', value: '8.5', available: true },
  { id: 'size-9', value: '9', available: true },
  { id: 'size-9-5', value: '9.5', available: true },
  { id: 'size-10', value: '10', available: true },
  { id: 'size-10-5', value: '10.5', available: false },
  { id: 'size-11', value: '11', available: true },
  { id: 'size-11-5', value: '11.5', available: true },
  { id: 'size-12', value: '12', available: true },
];

// Mock Colors
export const MOCK_COLORS: Color[] = [
  { id: 'lime-glow', name: 'Lime Glow', hex: '#32CD32', available: true },
  { id: 'bicoastal', name: 'Bicoastal', hex: '#4682B4', available: true },
  { id: 'bright-yellow', name: 'Bright Yellow', hex: '#FFFF00', available: true },
  { id: 'obsidian', name: 'Obsidian', hex: '#0B1426', available: true },
  { id: 'white', name: 'White', hex: '#FFFFFF', available: true },
  { id: 'black', name: 'Black', hex: '#000000', available: true },
];

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'nike-court-zoom-vapor-cage-4-rafa',
    name: "Men's Nike Court Zoom Vapor Cage 4 – Lime Glow Rafa Details",
    description: 'Professional tennis shoes with superior court performance and Rafa-inspired design.',
    price: 140.00,
    originalPrice: 147.00,
    images: [
      '/src/assets/product-1.jpg',
      '/src/assets/product-2.jpg',
    ],
    category: 'tennis',
    subcategory: 'court-shoes',
    brand: 'Nike',
    sizes: MOCK_SIZES.slice(0, 10),
    colors: [MOCK_COLORS[0]],
    inStock: true,
    featured: true,
    sale: true,
    vendor: MOCK_VENDORS[0],
    rating: 4.5,
    reviewCount: 128,
    tags: ['tennis', 'court', 'rafa', 'professional'],
  },
  {
    id: 'nike-gt-cut-3',
    name: "Men's Nike G.T. Cut 3 Basketball Shoes – Bicoastal Colorway",
    description: 'High-performance basketball shoes designed for explosive cuts and superior court feel.',
    price: 235.00,
    originalPrice: 275.00,
    images: [
      '/src/assets/product-2.jpg',
      '/src/assets/product-3.jpg',
    ],
    category: 'basketball',
    subcategory: 'performance',
    brand: 'Nike',
    sizes: MOCK_SIZES.slice(0, 12),
    colors: [MOCK_COLORS[1]],
    inStock: true,
    featured: true,
    sale: true,
    vendor: MOCK_VENDORS[0],
    rating: 4.7,
    reviewCount: 89,
    tags: ['basketball', 'performance', 'cut', 'court'],
  },
  {
    id: 'nike-mercurial-superfly-9',
    name: "Men's Nike Mercurial Superfly 9 Soccer Cleats – Bright Yellow Colorway",
    description: 'Elite soccer cleats engineered for speed and precision on the pitch.',
    price: 130.00,
    originalPrice: 135.00,
    images: [
      '/src/assets/product-3.jpg',
      '/src/assets/product-4.jpg',
    ],
    category: 'football',
    subcategory: 'cleats',
    brand: 'Nike',
    sizes: MOCK_SIZES.slice(0, 11),
    colors: [MOCK_COLORS[2]],
    inStock: true,
    featured: true,
    sale: true,
    vendor: MOCK_VENDORS[0],
    rating: 4.6,
    reviewCount: 156,
    tags: ['football', 'soccer', 'cleats', 'speed'],
  },
  {
    id: 'nike-pegasus-trail-4',
    name: "Men's Nike Trail Running Shoes Pegasus Trail 4 with GORE-TEX (Bicolored)",
    description: 'Waterproof trail running shoes built for all-terrain adventures.',
    price: 200.00,
    originalPrice: 210.00,
    images: [
      '/src/assets/product-4.jpg',
      '/src/assets/product-5.jpg',
    ],
    category: 'running',
    subcategory: 'trail',
    brand: 'Nike',
    sizes: MOCK_SIZES.slice(0, 13),
    colors: [MOCK_COLORS[1]],
    inStock: true,
    featured: true,
    sale: true,
    vendor: MOCK_VENDORS[0],
    rating: 4.4,
    reviewCount: 203,
    tags: ['running', 'trail', 'waterproof', 'gore-tex'],
  },
  {
    id: 'nike-air-kukini',
    name: "Nike Air Kukini Men's Shoes – Obsidian – Size 10.5",
    description: 'Retro-inspired lifestyle shoes with unique design and comfortable fit.',
    price: 60.00,
    originalPrice: undefined,
    images: [
      '/src/assets/product-5.jpg',
      '/src/assets/product-6.jpg',
    ],
    category: 'lifestyle',
    subcategory: 'retro',
    brand: 'Nike',
    sizes: [MOCK_SIZES[9]], // Size 10.5 only
    colors: [MOCK_COLORS[3]],
    inStock: true,
    featured: true,
    sale: false,
    vendor: MOCK_VENDORS[1],
    rating: 4.2,
    reviewCount: 45,
    tags: ['lifestyle', 'retro', 'casual', 'air'],
  },
  {
    id: 'nike-air-zoom-infinity',
    name: "Nike Air Zoom Infinity Tour Nike Infinity Shoes DC5221 103 Black Photo – Size 7.5",
    description: 'Golf shoes designed for comfort and performance on the course.',
    price: 89.75,
    originalPrice: undefined,
    images: [
      '/src/assets/product-6.jpg',
      '/src/assets/product-7.jpg',
    ],
    category: 'golf',
    subcategory: 'performance',
    brand: 'Nike',
    sizes: [MOCK_SIZES[3]], // Size 7.5 only
    colors: [MOCK_COLORS[5]],
    inStock: true,
    featured: true,
    sale: false,
    vendor: MOCK_VENDORS[2],
    rating: 4.3,
    reviewCount: 67,
    tags: ['golf', 'performance', 'comfort', 'zoom'],
  },
  {
    id: 'nike-force-1-kids',
    name: "Nike Force 1 Little Kid's Shoes – White (Size: 100)",
    description: 'Classic basketball-inspired shoes designed for little feet.',
    price: 66.48,
    originalPrice: undefined,
    images: [
      '/src/assets/product-7.jpg',
      '/src/assets/product-1.jpg',
    ],
    category: 'kids',
    subcategory: 'basketball',
    brand: 'Nike',
    sizes: [{ id: 'kids-100', value: '10C', available: true }],
    colors: [MOCK_COLORS[4]],
    inStock: true,
    featured: true,
    sale: false,
    vendor: MOCK_VENDORS[3],
    rating: 4.8,
    reviewCount: 234,
    tags: ['kids', 'basketball', 'classic', 'force'],
  },
  {
    id: 'nike-court-legacy',
    name: "Nike Men's Training Gymnastics Shoe – White/Black/Desert Ochre/Gum Light Brown – Size 9.5",
    description: 'Versatile training shoes perfect for gym workouts and casual wear.',
    price: 83.90,
    originalPrice: undefined,
    images: [
      '/src/assets/product-1.jpg',
      '/src/assets/product-2.jpg',
    ],
    category: 'fitness',
    subcategory: 'training',
    brand: 'Nike',
    sizes: [MOCK_SIZES[7]], // Size 9.5 only
    colors: [MOCK_COLORS[4], MOCK_COLORS[5]],
    inStock: true,
    featured: true,
    sale: false,
    vendor: MOCK_VENDORS[4],
    rating: 4.1,
    reviewCount: 92,
    tags: ['fitness', 'training', 'gym', 'versatile'],
  },
];

// Featured Products (subset of all products)
export const FEATURED_PRODUCTS = MOCK_PRODUCTS.filter(product => product.featured);

// Sale Products
export const SALE_PRODUCTS = MOCK_PRODUCTS.filter(product => product.sale);

// New Arrivals (last 4 products)
export const NEW_ARRIVALS = MOCK_PRODUCTS.slice(-4);

// Best Sellers (top rated products)
export const BEST_SELLERS = MOCK_PRODUCTS
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

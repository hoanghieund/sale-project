import { Cart as ApiCartItem, Product } from "@/types/index";

// Định nghĩa lại kiểu CartItemType để khớp với cấu trúc dữ liệu và sửa lỗi TypeScript
export interface CartItemType extends ApiCartItem {
  id: number; // Đảm bảo id là number để khớp với OriginalCartType
  quantity: number;
  product: Product; // Sử dụng kiểu Product đã import
  size?: { // Đặt là optional
    id: string;
    name: string;
  };
  color?: { // Đặt là optional
    id: string;
    name: string;
  };
}

// Định nghĩa interface cho CartByShop
export interface CartByShop {
  shopId: number;
  shopName: string;
  cartDTOList: CartItemType[];
}

// Định nghĩa interface cho CartSummary
export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string; // Thêm couponCode vào CartSummary
}
import { Cart } from "@/types/index";

// Định nghĩa interface cho CartByShop
export interface CartByShop {
  id: number;
  shopName: string;
  shopIdDistrict: number;
  cartDTOList: Cart[];
}

// Định nghĩa interface cho CartSummary
export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}
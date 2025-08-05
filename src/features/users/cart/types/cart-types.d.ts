import { Cart } from "@/types/index";

// Define interface for CartByShop
export interface CartByShop {
  id: number;
  shopName: string;
  shopIdDistrict: number;
  cartDTOList: Cart[];
}

// Define interface for CartSummary
export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}
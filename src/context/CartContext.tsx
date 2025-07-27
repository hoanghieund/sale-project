import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Product, VariantValue } from "../types";

// Định nghĩa lại CartItem và Cart để tương thích với cấu trúc cũ
export interface CartItem {
  id: string;
  product: Product;
  size: VariantValue | null;
  color: VariantValue | null;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  discount: number;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (
    product: Product,
    size: VariantValue | null,
    color: VariantValue | null,
    quantity?: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
  applyCoupon: (couponCode: string) => void;
  removeCoupon: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        product: Product;
        size: VariantValue | null;
        color: VariantValue | null;
        quantity: number;
      };
    }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_COUPON"; payload: { couponCode: string; discount: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "LOAD_CART"; payload: CartState };

const initialCart: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  couponCode: undefined,
  discount: 0,
};

function calculateCartTotals(
  items: CartItem[],
  discount = 0
): Omit<CartState, "items" | "couponCode"> {
  // Sử dụng giá từ ProductSku hoặc giá mặc định nếu không có
  const subtotal = items.reduce((sum, item) => {
    // Giá có thể nằm trong ProductSku hoặc được lưu trữ tạm thời trong product
    const price = (item.product as any).price || 0;
    return sum + price * item.quantity;
  }, 0);
  const discountAmount = subtotal * (discount / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * 0.08; // 8% tax
  const shipping = discountedSubtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = discountedSubtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
    discount: discountAmount,
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size, color, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item =>
          item.product.id === product.id &&
          (size === null ? item.size === null : item.size?.id === size?.id) &&
          (color === null ? item.color === null : item.color?.id === color?.id)
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${size?.id || "default"}-${
            color?.id || "default"
          }`,
          product,
          size,
          color,
          quantity,
          addedAt: new Date(),
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateCartTotals(newItems, state.discount);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        item => item.id !== action.payload.itemId
      );
      const totals = calculateCartTotals(newItems, state.discount);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { itemId } });
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const totals = calculateCartTotals(newItems, state.discount);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "CLEAR_CART":
      return initialCart;

    case "APPLY_COUPON": {
      const { couponCode, discount } = action.payload;
      const totals = calculateCartTotals(state.items, discount);
      return {
        ...state,
        couponCode,
        discount,
        ...totals,
      };
    }

    case "REMOVE_COUPON": {
      const totals = calculateCartTotals(state.items, 0);
      return {
        ...state,
        couponCode: undefined,
        discount: 0,
        ...totals,
      };
    }

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("donekick-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("donekick-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    size: VariantValue | null,
    color: VariantValue | null,
    quantity = 1
  ) => {
    dispatch({ type: "ADD_ITEM", payload: { product, size, color, quantity } });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (couponCode: string) => {
    // Mock coupon validation
    const validCoupons: Record<string, number> = {
      HelloDonekick: 5,
      SUMMER2024: 10,
      NEWUSER: 15,
    };

    const discount = validCoupons[couponCode];
    if (discount) {
      dispatch({ type: "APPLY_COUPON", payload: { couponCode, discount } });
    } else {
      throw new Error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    dispatch({ type: "REMOVE_COUPON" });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

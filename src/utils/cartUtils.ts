import {
  CartByShop,
  CartSummary,
} from "@/features/users/cart/types/cart-types";

/**
 * @function calculateCartSummary
 * @description Tính toán tổng tiền, chiết khấu, phí vận chuyển, thuế và tổng cộng dựa trên dữ liệu giỏ hàng.
 * @param {CartByShop[]} currentCartByShop - Dữ liệu giỏ hàng theo cửa hàng.
 * @returns {CartSummary} Đối tượng chứa các giá trị tổng kết.
 */
export const calculateCartSummary = (
  currentCartByShop: CartByShop[]
): CartSummary => {
  let subtotal = calculateTotalPrice(currentCartByShop);

  const shipping = 1;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};

export const calculateTotalPrice = (cart: CartByShop[]) => {
  let total = 0;
  cart.forEach(shopCart => {
    shopCart.cartDTOList.forEach(item => {
      total += calculatePrice(
        item.productDTO?.priceSale || item.productDTO?.price || 0,
        item.quantity
      );
    });
  });
  return total;
};

export const calculatePrice = (priceSale: number, quantity: number) => {
  return priceSale * quantity;
};

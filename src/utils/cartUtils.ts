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
/**
 * @function calculateCartSummary
 * @description Tính toán tổng tiền, chiết khấu, phí vận chuyển, thuế và tổng cộng dựa trên dữ liệu giỏ hàng.
 * @param {CartByShop[]} currentCartByShop - Dữ liệu giỏ hàng theo cửa hàng.
 * @param {Set<string>} [selectedItemIds] - Tập hợp các ID sản phẩm được chọn để tính toán.
 * @returns {CartSummary} Đối tượng chứa các giá trị tổng kết.
 */
export const calculateCartSummary = (
  currentCartByShop: CartByShop[],
  selectedItemIds?: Set<string>
): CartSummary => {
  let subtotal = calculateTotalPrice(currentCartByShop, selectedItemIds);

  const shipping = 6.99; // Giá trị vận chuyển cố định
  const total = subtotal + shipping; // Tổng cộng sau khi tính vận chuyển

  return { subtotal, shipping, total };
};

/**
 * @function calculateTotalPrice
 * @description Tính toán tổng giá của các sản phẩm trong giỏ hàng, có thể lọc theo sản phẩm được chọn.
 * @param {CartByShop[]} cart - Dữ liệu giỏ hàng theo cửa hàng.
 * @param {Set<string>} [selectedItemIds] - Tập hợp các ID sản phẩm được chọn để tính toán.
 * @returns {number} Tổng giá của các sản phẩm.
 */
export const calculateTotalPrice = (
  cart: CartByShop[],
  selectedItemIds?: Set<string>
) => {
  let total = 0;
  cart.forEach(shopCart => {
    shopCart.cartDTOList.forEach(item => {
      // Chỉ tính tổng nếu selectedItemIds không được cung cấp hoặc sản phẩm nằm trong danh sách đã chọn
      if (!selectedItemIds || selectedItemIds.has(String(item.id))) {
        total += calculatePrice(
          item.productDTO?.priceSale || item.productDTO?.price || 0,
          item.quantity
        );
      }
    });
  });

  return total;
};

export const calculatePrice = (priceSale: number, quantity: number) => {
  return priceSale * quantity;
};

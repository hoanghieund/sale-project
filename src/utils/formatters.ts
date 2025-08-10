/**
 * @file formatters.ts
 * @description Chứa các hàm tiện ích để định dạng dữ liệu.
 */

/**
 * Định dạng một giá trị số thành chuỗi tiền tệ USD.
 * @param {number} amount - Số tiền cần định dạng.
 * @returns {string} Chuỗi tiền tệ đã định dạng (ví dụ: "$1,234.56").
 */
export const formatCurrencyUSD = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3, // Đảm bảo hiển thị ít nhất 3 chữ số thập phân
    maximumFractionDigits: 3, // Đảm bảo hiển thị tối đa 3 chữ số thập phân
  });
};

/**
 * Định dạng một giá trị số thành chuỗi tiền tệ VND.
 * @param {number} amount - Số tiền cần định dạng.
 * @returns {string} Chuỗi tiền tệ đã định dạng (ví dụ: "123.456 ₫").
 */
export const formatCurrencyVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, // Tiền VND không có phần thập phân
    maximumFractionDigits: 0
  }).format(amount);
};
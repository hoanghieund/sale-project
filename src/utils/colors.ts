/**
 * @file colors.ts
 * @description Chứa các hàm tiện ích để lấy giá trị màu sắc.
 */

/**
 * Ánh xạ tên màu với giá trị hex tương ứng.
 * @param {string} colorName _ Tên màu (ví dụ: "black", "white", "gray", v.v.).
 * @returns {string | undefined} Giá trị hex của màu sắc hoặc undefined nếu không tìm thấy.
 */
export const getColorValue = (colorName: string): string | undefined => {
  const colorMap: { [key: string]: string } = {
    "black": "#000000",
    "white": "#FFFFFF",
    "gray": "#808080",
    "dark_gray": "#333333",
    "dark_blue": "#00008B",
    "blue": "#0000CD",
    "light_yellow": "#F0E68C",
    "light_blue": "#6A5ACD",
    "red": "#8B0000",
    "brown": "#A52A2A",
    "lime_green": "#006400",
    "green": "#008000",
    "dark_green": "#006400",
    "pink": "#C71585",
    "purple": "#4B0082",
    "dark_red": "#8B0000",
    "yellow": "#DAA520",
    "orange": "#FF8C00"
  };
  return colorMap[colorName.toLowerCase()];
};
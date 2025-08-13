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
  // Nếu đầu vào là mã hex (#RGB | #RRGGBB) có hoặc không có '#', chuẩn hóa và trả về luôn
  // Giữ nguyên comment cũ nếu còn hữu ích
  const raw = (colorName || "").trim();
  const hexMatch = raw.match(/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
  if (hexMatch) {
    // Chuẩn hóa: thêm '#', đổi về UPPERCASE để đồng nhất
    return `#${hexMatch[1]}`.toUpperCase();
  }

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
  // Nếu không phải hex, lấy từ bảng ánh xạ theo tên màu thường
  return colorMap[raw.toLowerCase()];
};
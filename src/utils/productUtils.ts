import { Product } from "@/types";
import { useMemo } from "react";

/**
 * @function getVariantName
 * @description Trả về tên biến thể dựa trên loại biến thể.
 * @param {number} type - Loại biến thể (1: FIT, 2: Print Location, 3: Color, 4: Size).
 * @returns {string} Tên biến thể.
 */
export const getVariantName = (type: number): string => {
  switch (type) {
    case 1:
      return "FIT";
    case 2:
      return "Print Location";
    case 3:
      return "Color";
    case 4:
      return "Size";
    default:
      return "Unknown";
  }
};

/**
 * @function getVariantSlug
 * @description Trả về slug của biến thể dựa trên loại biến thể.
 * @param {number} type - Loại biến thể (1: fitId, 2: printLocationId, 3: colorId, 4: sizeId).
 * @returns {string} Slug của biến thể.
 */
export const getVariantSlug = (type: number): string => {
  switch (type) {
    case 1:
      return "fitId";
    case 2:
      return "printLocationId";
    case 3:
      return "colorId";
    case 4:
      return "sizeId";
    default:
      return "Unknown";
  }
};

/**
 * @function useVariantProduct
 * @description Hook để nhóm các tùy chọn sản phẩm thành các biến thể có cấu trúc.
 * @param {Product | undefined} product - Đối tượng sản phẩm.
 * @returns {Array<{ slug: string; name: string; values: Array<{ id: number; name: string }> }>} Mảng các nhóm biến thể.
 */
export const useVariantProduct = (product: Product | undefined) => {
  return useMemo(() => {
    // Phòng thủ khi thiếu dữ liệu
    const options = product?.optionDTOs ?? [];

    // Gom theo type, dùng Map để loại trùng theo name trong cùng type
    const grouped = options.reduce<
      Record<number, Map<string, { id: number; name: string }>>
    >((acc, cur) => {
      if (!acc[cur.type]) acc[cur.type] = new Map();
      // Ưu tiên id đầu tiên cho mỗi name duy nhất trong cùng type
      if (!acc[cur.type].has(cur.name)) {
        acc[cur.type].set(cur.name, { id: cur.id, name: cur.name });
      }
      return acc;
    }, {});

    // Chuyển về mảng theo định dạng yêu cầu. Sắp xếp theo type để ổn định.
    const result = Object.keys(grouped)
      .map(k => Number(k))
      .sort((a, b) => a - b)
      .map(type => ({
        slug: getVariantSlug(type), // sử dụng getVariantSlug để lấy slug nhóm
        name: getVariantName(type), // sử dụng getVariantName để lấy label nhóm
        values: Array.from(grouped[type].values()), // Map -> Array<{id, value}>
      }));

    return result;
  }, [product?.optionDTOs]);
};
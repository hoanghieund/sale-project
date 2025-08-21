import { Product } from "@/types";
import { useMemo } from "react";

/**
 * @function getVariantName
 * @description Trả về tên biến thể dựa trên loại biến thể.
 * @param {number} type - Loại biến thể (1: FIT, 2: Print Location, 3: Color, 4: Size).
 * @returns {string} Tên biến thể.
 */
export const getVariantName = (type: number, keyOption?: string): string => {
  switch (type) {
    case 1:
      return "FIT";
    case 2:
      return "Print Location";
    case 3:
      return "Color";
    case 4:
      return "Size";
    case 5:
      return "Color";
    default:
      return keyOption || "Unknown";
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
    case 5:
      return "colorId";
    default:
      return "Unknown";
  }
};

/**
 * @function useVariantProduct
 * @description Hook để nhóm các tùy chọn sản phẩm thành các biến thể có cấu trúc.
 * @param {Product | undefined} product - Đối tượng sản phẩm.
 * @returns {Array<{ keyOption: string; name: string; values: Array<{ id: number; name: string }> }>} Mảng các nhóm biến thể.
 */
export const useVariantProduct = (product: Product | undefined) => {
  return useMemo(() => {
    // Phòng thủ khi thiếu dữ liệu
    const options = product?.optionDTOs ?? [];
    console.log("🚀 ~ useVariantProduct ~ options:", options);

    // Gom theo type, dùng Map để loại trùng theo name trong cùng type
    const grouped = options.reduce<
      Record<
        number,
        {
          keyOption?: string;
          values: Map<
            string,
            { id: number; name: string; nameVariant: string }
          >;
        }
      >
    >((acc, cur) => {
      if (!acc[cur.type]) {
        acc[cur.type] = {
          keyOption: cur.keyOption, // Lưu keyOption cho mỗi type
          values: new Map(),
        };
      }
      // Ưu tiên id đầu tiên cho mỗi name duy nhất trong cùng type
      if (!acc[cur.type].values.has(cur.name)) {
        acc[cur.type].values.set(cur.name, {
          id: cur.id,
          name: cur.name,
          nameVariant: cur.nameVariant,
        });
      }
      return acc;
    }, {});

    // Chuyển về mảng theo định dạng yêu cầu. Sắp xếp theo type để ổn định.
    const result = Object.keys(grouped)
      .map(k => Number(k))
      .sort((a, b) => a - b)
      .map(type => ({
        keyOption: grouped[type].keyOption || getVariantSlug(type), // Ưu tiên keyOption từ dữ liệu, fallback về getVariantSlug
        name: getVariantName(type, grouped[type].keyOption), // sử dụng getVariantName để lấy label nhóm
        values: Array.from(grouped[type].values.values()), // Map -> Array<{id, value, nameVariant}>
      }));

    return result;
  }, [product?.optionDTOs]);
};

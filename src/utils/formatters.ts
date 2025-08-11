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
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3, // Đảm bảo hiển thị ít nhất 3 chữ số thập phân
    maximumFractionDigits: 3, // Đảm bảo hiển thị tối đa 3 chữ số thập phân
  });
};

/**
 * Định dạng ngày theo locale (mặc định en-US) với fallback an toàn.
 * Chấp nhận Date | string | number để linh hoạt dữ liệu đầu vào từ API.
 *
 * @param {Date | string | number} input - Ngày đầu vào (Date object, ISO string, timestamp).
 * @param {string} [locale="en-US"] - Mã locale để định dạng.
 * @param {Intl.DateTimeFormatOptions} [options] - Tuỳ chọn định dạng bổ sung.
 * @returns {string} Chuỗi ngày đã định dạng hoặc chuỗi rỗng nếu không hợp lệ.
 */
export const formatDate = (
  input: Date | string | number,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {}
): string => {
  try {
    // Chuyển đổi linh hoạt sang Date; hỗ trợ ISO string / timestamp
    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) return ""; // Guard cho input không hợp lệ

    // Mặc định hiển thị theo locale với định dạng tháng/ngày/năm
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...options, // Cho phép override từ caller khi cần
    });
  } catch {
    // Không throw để tránh crash UI; trả về chuỗi rỗng an toàn
    return "";
  }
};

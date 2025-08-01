import React from "react";

/**
 * LoadingSpinner
 * - Spinner loading đơn giản, căn giữa theo cả chiều ngang và dọc
 * - Hiển thị nhãn "Đang tải..." bên dưới vòng quay
 * - Dùng Tailwind CSS và tuân thủ design system (màu/spacing cơ bản)
 */
const LoadingSpinner: React.FC = () => {
  return (
    // Khối bao để chiếm toàn bộ không gian khả dụng và căn giữa nội dung
    <div className="flex h-full w-full items-center justify-center p-4">
      {/* Vùng chứa spinner và nhãn, xếp dọc và căn giữa */}
      <div className="flex flex-col items-center gap-2">
        {/* Spinner tròn: dùng border để tạo hiệu ứng quay */}
        <div
          aria-label="loading"
          role="status"
          className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"
        />

        {/* Nhãn trạng thái tải */}
        <p className="text-sm text-muted-foreground">Đang tải...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

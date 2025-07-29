// src/components/common/EmptyStateDisplay.tsx

import React from 'react';

/**
 * Component hiển thị thông báo khi không tìm thấy dữ liệu hoặc sản phẩm.
 * Được thiết kế để tái sử dụng với giao diện hấp dẫn hơn cho các trạng thái rỗng.
 *
 * @returns {JSX.Element} EmptyStateDisplay component.
 */
const EmptyStateDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8 text-center bg-gray-50 rounded-lg shadow-md">
      <svg
        className="w-24 h-24 mb-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h2 className="mb-2 text-2xl font-semibold text-gray-700">Rất tiếc!</h2>
      <p className="mb-6 text-gray-600">
        Không tìm thấy dữ liệu nào phù hợp với yêu cầu của bạn.
      </p>
      <p className="text-sm text-gray-500">
        Vui lòng thử tìm kiếm với các tiêu chí khác hoặc quay lại trang chủ.
      </p>
    </div>
  );
};

export default EmptyStateDisplay;
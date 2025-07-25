import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * @component EmptyState
 * @param {EmptyStateProps} props - Props cho component EmptyState.
 * @param {React.ReactNode} props.icon - Icon hiển thị trong trạng thái trống.
 * @param {string} props.title - Tiêu đề của thông báo.
 * @param {string} props.message - Nội dung thông báo chi tiết.
 * @param {string} [props.buttonText] - Văn bản cho nút hành động.
 * @param {string} [props.buttonLink] - Liên kết cho nút hành động.
 * @returns {JSX.Element} Component EmptyState.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-sm">
      <div className="text-gray-400 mb-6">{icon}</div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {buttonText && buttonLink && (
        <Link to={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
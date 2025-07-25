import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react'; // Assuming lucide-react for star icon
import React from 'react';

interface ReviewCardProps {
  userName: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified?: boolean;
}

/**
 * @component ReviewCard
 * @param {ReviewCardProps} props - Props cho component ReviewCard.
 * @param {string} props.userName - Tên người dùng đánh giá.
 * @param {string} props.date - Ngày đánh giá.
 * @param {number} props.rating - Số sao đánh giá (từ 1 đến 5).
 * @param {string} props.title - Tiêu đề của đánh giá.
 * @param {string} props.comment - Nội dung chi tiết của đánh giá.
 * @param {boolean} [props.verified=false] - Cho biết đánh giá có được xác minh hay không.
 * @returns {JSX.Element} Component ReviewCard.
 */
const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  date,
  rating,
  title,
  comment,
  verified = false,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div>
            <CardTitle className="text-lg font-semibold">{userName}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{date}</CardDescription>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-md font-medium">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{comment}</p>
        {verified && (
          <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Đã xác minh
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
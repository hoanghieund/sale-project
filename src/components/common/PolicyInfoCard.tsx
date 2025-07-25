import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface PolicyInfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * @component PolicyInfoCard
 * @param {PolicyInfoCardProps} props - Props cho component PolicyInfoCard.
 * @param {React.ReactNode} props.icon - Icon hiển thị chính sách.
 * @param {string} props.title - Tiêu đề của chính sách.
 * @param {string} props.description - Mô tả chi tiết của chính sách.
 * @returns {JSX.Element} Component PolicyInfoCard.
 */
const PolicyInfoCard: React.FC<PolicyInfoCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="flex items-start p-4 shadow-sm">
      <div className="mr-4 text-2xl text-blue-600">{icon}</div>
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PolicyInfoCard;
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

/**
 * @component StatCard
 * @param {StatCardProps} props - Props cho component StatCard.
 * @param {string | number} props.value - Giá trị số liệu thống kê.
 * @param {string} props.label - Nhãn/mô tả cho số liệu thống kê.
 * @param {React.ReactNode} [props.icon] - Icon hiển thị cùng với số liệu.
 * @param {string} [props.colorClass] - Lớp Tailwind CSS để tùy chỉnh màu sắc của giá trị.
 * @returns {JSX.Element} Component StatCard.
 */
const StatCard: React.FC<StatCardProps> = ({ value, label, icon, colorClass }) => {
  return (
    <Card className="flex items-center p-4 shadow-sm">
      {icon && <div className={`mr-4 text-3xl ${colorClass}`}>{icon}</div>}
      <CardContent className="p-0">
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
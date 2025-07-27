import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | React.ReactNode;
  description?: string;
}

/**
 * @component ContactInfoCard
 * @param {ContactInfoCardProps} props - Props cho component ContactInfoCard.
 * @param {React.ReactNode} props.icon - Icon hiển thị thông tin liên hệ.
 * @param {string} props.title - Tiêu đề của thông tin liên hệ (ví dụ: "Email Support").
 * @param {string | React.ReactNode} props.value - Giá trị của thông tin liên hệ (ví dụ: "support@example.com").
 * @param {string} [props.description] - Mô tả thêm về thông tin liên hệ.
 * @returns {JSX.Element} Component ContactInfoCard.
 */
const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon,
  title,
  value,
  description,
}) => {
  return (
    <Card className="flex items-start p-4 shadow-sm">
      <div className="mr-4 text-2xl text-blue-600">{icon}</div>
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-base text-gray-800">{value}</div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;

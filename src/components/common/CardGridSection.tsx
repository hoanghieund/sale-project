import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import { Link } from 'react-router-dom';

interface CardGridItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  link: string;
  icon?: React.ReactNode; // Changed from string to React.ReactNode for flexibility
  productCount?: number;
}

interface CardGridSectionProps {
  title: string;
  subtitle?: string;
  items: CardGridItem[];
  cardType?: 'category' | 'product' | 'simple';
  enableScroll?: boolean;
  linkText?: string;
  linkHref?: string;
}

/**
 * @component CardGridSection
 * @param {CardGridSectionProps} props - Props cho component CardGridSection.
 * @param {string} props.title - Tiêu đề chính của phần lưới thẻ.
 * @param {string} [props.subtitle] - Tiêu đề phụ của phần lưới thẻ.
 * @param {CardGridItem[]} props.items - Mảng các đối tượng chứa thông tin cho mỗi thẻ.
 * @param {'category' | 'product' | 'simple'} [props.cardType='simple'] - Loại thẻ để tùy biến hiển thị.
 * @param {boolean} [props.enableScroll=false] - Cho phép cuộn ngang nếu true.
 * @param {string} [props.linkText] - Văn bản cho liên kết chung "View All".
 * @param {string} [props.linkHref] - Liên kết chung cho "View All".
 * @returns {JSX.Element} Component CardGridSection.
 */
const CardGridSection: React.FC<CardGridSectionProps> = ({
  title,
  subtitle,
  items,
  cardType = 'simple',
  enableScroll = false,
  linkText,
  linkHref,
}) => {
  const CardContentRenderer = ({ item }: { item: CardGridItem }) => {
    switch (cardType) {
      case 'category':
        return (
          <>
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg mb-4" />
            )}
            {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            {item.productCount !== undefined && (
              <CardDescription className="text-sm text-gray-500">{item.productCount} sản phẩm</CardDescription>
            )}
            {item.description && <CardDescription className="text-sm mt-2">{item.description}</CardDescription>}
          </>
        );
      case 'product':
        return (
          <>
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            )}
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            {item.description && <CardDescription className="text-sm mt-2">{item.description}</CardDescription>}
          </>
        );
      case 'simple':
      default:
        return (
          <>
            {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg mb-4" />
            )}
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            {item.description && <CardDescription className="text-sm mt-2">{item.description}</CardDescription>}
          </>
        );
    }
  };

  const content = (
    <div className={`grid gap-4 ${enableScroll ? 'grid-flow-col auto-cols-max' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`} >
      {items.map((item) => (
        <Link to={item.link} key={item.id}>
          <Card className="w-64 sm:w-auto h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4 flex-grow">
              <CardContentRenderer item={item} />
            </CardContent>
            <CardHeader className="p-4 pt-0">
              <Button variant="link" className="p-0 h-auto">
                {linkText || 'Xem chi tiết'}
              </Button>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        </div>
        {linkHref && linkText && (
          <Link to={linkHref}>
            <Button variant="outline">
              {linkText}
            </Button>
          </Link>
        )}
      </div>
      {enableScroll ? (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          {content}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        content
      )}
    </section>
  );
};

export default CardGridSection;
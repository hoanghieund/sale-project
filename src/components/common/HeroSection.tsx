import { Button } from '@/components/ui/button'; // Import Button component from shadcn/ui
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

interface HeroSectionProps {
  title: string;
  description?: string;
  imageUrl?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * @component HeroSection
 * @param {HeroSectionProps} props - Props cho component HeroSection.
 * @param {string} props.title - Tiêu đề chính của phần hero.
 * @param {string} [props.description] - Mô tả phụ của phần hero.
 * @param {string} [props.imageUrl] - URL của hình ảnh nền.
 * @param {string} [props.primaryButtonText] - Văn bản cho nút chính.
 * @param {string} [props.primaryButtonLink] - Liên kết cho nút chính.
 * @param {string} [props.secondaryButtonText] - Văn bản cho nút phụ.
 * @param {string} [props.secondaryButtonLink] - Liên kết cho nút phụ.
 * @param {string} [props.gradientFrom] - Lớp Tailwind CSS cho màu bắt đầu của gradient.
 * @param {string} [props.gradientTo] - Lớp Tailwind CSS cho màu kết thúc của gradient.
 * @returns {JSX.Element} Component HeroSection.
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  imageUrl,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  gradientFrom = 'from-blue-500', // Default gradient start
  gradientTo = 'to-purple-600',   // Default gradient end
}) => {
  return (
    <section
      className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-lg shadow-lg ${gradientFrom} ${gradientTo} bg-gradient-to-r`}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Overlay for background image/gradient */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryButtonText && primaryButtonLink && (
            <Link to={primaryButtonLink}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200">
                {primaryButtonText}
              </Button>
            </Link>
          )}
          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-200">
                {secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
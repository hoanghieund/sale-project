// src/components/common/ProductImageCarousel.tsx
// Component này hiển thị carousel hình ảnh sản phẩm và các hình ảnh thu nhỏ để điều hướng.

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components from shadcn/ui
import { cn } from "@/lib/utils";
import { type Image as ProductImage } from "@/types"; // Đảm bảo đường dẫn này đúng với ProductDetailPage.tsx
import React, { useEffect, useState } from "react";

/**
 * @typedef ProductImageCarouselProps
 * @property {ProductImage[]} images - Mảng các đối tượng hình ảnh để hiển thị trong carousel.
 * @property {string} productTitle - Tiêu đề sản phẩm, được sử dụng cho văn bản thay thế hình ảnh.
 */
interface ProductImageCarouselProps {
  images: ProductImage[];
  productTitle: string;
  className?: string;
}

/**
 * ProductImageCarousel Component
 *
 * Component này hiển thị một carousel hình ảnh sản phẩm lớn và một hàng các hình ảnh thu nhỏ
 * cho phép người dùng điều hướng giữa các hình ảnh.
 *
 * @param {ProductImageCarouselProps} props - Các props cho component ProductImageCarousel.
 * @returns {JSX.Element} ProductImageCarousel component.
 */
const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  productTitle,
  className,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State để quản lý trạng thái mở/đóng của dialog

  // Cập nhật selectedImage khi carousel thay đổi slide
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setSelectedImage(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className={cn("space-y-0",className)}>
      {/* Dialog cho phép hiển thị hình ảnh lớn khi nhấp vào */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Carousel chính hiển thị hình ảnh sản phẩm lớn */}
        <Carousel setApi={setApi} className="w-full mx-auto">
          <CarouselContent>
            {images?.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <DialogTrigger asChild>
                    <div className="flex aspect-square items-center justify-center cursor-pointer">
                      {img.path ? (
                        <img
                          src={img.path}
                          alt={`${productTitle} ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl">
                          <span className="text-6xl text-gray-400">📦</span>
                        </div>
                      )}
                    </div>
                  </DialogTrigger>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Dialog Content - Hiển thị carousel hình ảnh lớn trong popup */}
        <DialogContent className="p-2">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {images?.map((img, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="flex items-center justify-center h-full">
                    {img.path ? (
                      <img
                        src={img.path}
                        alt={`${productTitle} ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-6xl text-gray-400">📦</span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>

      {/* Image Thumbnails - Hiển thị hình ảnh thu nhỏ để người dùng chọn */}
      <div className="flex justify-center gap-2 mt-4">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index);
              api?.scrollTo(index); // Cuộn đến slide tương ứng khi nhấp vào thumbnail
            }}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index
                ? "border-emerald-500"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            {img.path ? (
              <img
                src={img.path}
                alt={`${productTitle} Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-2xl text-gray-400">📦</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
// src/components/common/ProductImageCarousel.tsx
// This component displays a product image carousel and thumbnail images for navigation.

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog components from shadcn/ui
import { cn } from "@/lib/utils";
import { type Image as ProductImage } from "@/types"; // Ensure this path is correct for ProductDetailPage.tsx
import React, { useEffect, useRef, useState } from "react";

/**
 * @typedef ProductImageCarouselProps
 * @property {ProductImage[]} images - Array of image objects to display in the carousel.
 * @property {string} productTitle - Product title, used for image alt text.
 */
interface ProductImageCarouselProps {
  images: ProductImage[];
  productTitle: string;
  className?: string;
}

/**
 * ProductImageCarousel Component
 *
 * This component displays a large product image carousel and a row of thumbnail images
 * allowing users to navigate between images.
 *
 * @param {ProductImageCarouselProps} props - Props for the ProductImageCarousel component.
 * @returns {JSX.Element} ProductImageCarousel component.
 */
const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  productTitle,
  className,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open/close status
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null); // Ref cho container thumbnails
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs cho từng thumbnail

  // Reset thumbnailRefs khi số lượng ảnh thay đổi
  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images?.length || 0);
  }, [images?.length]);

  // Update selectedImage when carousel slides change
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setSelectedImage(index);

      // Tự động scroll thumbnail vào view
      scrollThumbnailIntoView(index);
    });
  }, [api]);

  // Hàm scroll thumbnail active vào vùng nhìn thấy được
  const scrollThumbnailIntoView = (index: number) => {
    if (!thumbnailsContainerRef.current || !thumbnailRefs.current[index])
      return;

    const container = thumbnailsContainerRef.current;
    const thumbnail = thumbnailRefs.current[index];

    if (thumbnail) {
      // Tính toán vị trí để scroll thumbnail vào giữa container
      const containerWidth = container.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const thumbnailOffsetLeft = thumbnail.offsetLeft;

      // Tính toán vị trí scroll để đưa thumbnail vào giữa container
      const scrollPosition =
        thumbnailOffsetLeft - containerWidth / 2 + thumbnailWidth / 2;

      // Scroll với animation mượt mà
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("space-y-0 h-fit lg:sticky top-32", className)}>
      {/* Dialog to display large image when clicked */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Main carousel displaying large product images */}
        <Carousel setApi={setApi} className="w-full mx-auto">
          <CarouselContent>
            {images?.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <DialogTrigger asChild>
                    <div className="flex aspect-[4/3] items-center justify-center cursor-pointer">
                      {img.path ? (
                        <img
                          src={img.path}
                          alt={`${productTitle} ${index + 1}`}
                          className="w-full h-full object-contain rounded-xl"
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

        {/* Dialog Content - Display large image carousel in popup */}
        <DialogContent className="p-2">
          {/*
           * Carousel in DialogContent is initialized with initialScrollSnap to display
           * the previously selected image.
           */}
          {/*
           * Carousel in DialogContent is initialized with startIndex to display
           * the previously selected image.
           */}
          <Carousel
            className="w-full h-full"
            opts={{ startIndex: selectedImage }}
          >
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

      {/* Image Thumbnails - Display thumbnails for user selection */}
      {images?.length > 1 && (
        <div className="relative mt-4">
          {/* Thumbnails container với chiều cao cố định và scrollbar tùy chỉnh */}
          <div
            ref={thumbnailsContainerRef} /* Thêm ref cho container */
            className="
            flex gap-2 py-2 px-1 
            overflow-x-auto max-w-full 
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
            scrollbar-thumb-rounded-full
            snap-x snap-mandatory
            pb-4 /* Thêm padding-bottom để tránh scrollbar che mất nội dung */
          "
            style={{
              scrollbarWidth: "thin" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            {/* Thêm div flex-shrink-0 bao quanh mỗi thumbnail để ngăn chúng bị co lại */}
            {images?.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start"
                ref={el =>
                  (thumbnailRefs.current[index] = el)
                } /* Thêm ref cho từng thumbnail */
              >
                <button
                  onClick={() => {
                    setSelectedImage(index);
                    api?.scrollTo(index); // Scroll to the corresponding slide when thumbnail is clicked
                  }}
                  className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden 
                  border-2 transition-colors flex-shrink-0 
                  ${
                    selectedImage === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-gray-300"
                  }
                `}
                >
                  {img.path ? (
                    <img
                      src={img.path}
                      alt={`${productTitle} Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy" /* Lazy loading cho thumbnails */
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-2xl text-gray-400">📦</span>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;

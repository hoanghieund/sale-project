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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components from shadcn/ui
import { cn } from "@/lib/utils";
import { type Image as ProductImage } from "@/types"; // Ensure this path is correct for ProductDetailPage.tsx
import React, { useEffect, useState } from "react";

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

  // Update selectedImage when carousel slides change
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setSelectedImage(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className={cn("space-y-0 h-fit lg:sticky top-32",className)}>
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
          <Carousel className="w-full h-full" opts={{ startIndex: selectedImage }}>
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
      <div className="flex justify-center gap-2 mt-4">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index);
              api?.scrollTo(index); // Scroll to the corresponding slide when thumbnail is clicked
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
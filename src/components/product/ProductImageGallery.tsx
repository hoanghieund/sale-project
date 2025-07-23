import { useState } from "react";
import { X } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

/**
 * Component hiển thị gallery hình ảnh sản phẩm với chức năng zoom và lightbox
 * Cho phép người dùng xem hình ảnh chi tiết và phóng to
 */
const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Xử lý sự kiện khi di chuột qua ảnh để zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };

  // Mở lightbox và thiết lập ảnh hiện tại
  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi lightbox mở
  };

  // Đóng lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = ''; // Khôi phục cuộn trang
  };

  // Chuyển đến ảnh tiếp theo trong lightbox
  const nextImage = () => {
    setLightboxImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Chuyển đến ảnh trước đó trong lightbox
  const prevImage = () => {
    setLightboxImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Ảnh chính */}
      <div 
        className="aspect-square overflow-hidden rounded-lg bg-muted relative cursor-zoom-in"
        onClick={() => openLightbox(selectedImageIndex)}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[selectedImageIndex]}
          alt={`${productName} - Ảnh ${selectedImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isZoomed ? 'scale-150' : ''
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                selectedImageIndex === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Nút đóng */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              aria-label="Đóng lightbox"
            >
              <X size={24} />
            </button>

            {/* Ảnh lightbox */}
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
              <img
                src={images[lightboxImageIndex]}
                alt={`${productName} - Ảnh ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Điều hướng */}
            <div className="absolute inset-x-0 bottom-10 flex justify-center items-center gap-4">
              <div className="bg-black/60 px-4 py-2 rounded-full text-white text-sm">
                {lightboxImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Nút điều hướng */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-white"
                  aria-label="Ảnh trước"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-white"
                  aria-label="Ảnh tiếp theo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

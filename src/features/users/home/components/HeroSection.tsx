import { getRandomImage } from "@/utils/random-image";
import { Link } from "react-router-dom";

/**
 * HeroSection Component
 * Hiển thị phần hero của trang chủ với tiêu đề, mô tả và các nút kêu gọi hành động.
 */
const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-20"
      style={{ backgroundImage: `url('${getRandomImage()}')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to the Marketplace
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Connecting buyers and sellers worldwide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Explore Products
          </Link>
          <Link
            to="/seller"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Sell with Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

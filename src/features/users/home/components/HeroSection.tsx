import { Link } from "react-router-dom";

/**
 * HeroSection Component
 * Hiển thị phần hero của trang chủ với tiêu đề, mô tả và các nút kêu gọi hành động.
 */
const HeroSection = () => {
  return (
    <section className="relative bg-emerald-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Chào mừng đến với Marketplace
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Nơi kết nối người mua và người bán trên toàn quốc
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Khám phá sản phẩm
          </Link>
          <Link
            to="/seller"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
          >
            Bán hàng cùng chúng tôi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
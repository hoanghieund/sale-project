import { Link } from "react-router-dom";

/**
 * CallToActionSection Component
 * Hiển thị phần kêu gọi hành động với tiêu đề, mô tả và các nút đăng ký/tìm hiểu thêm.
 */
const CallToActionSection = () => {
  return (
    <section className="py-16 bg-primary/50 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Selling Today</h2>
        <p className="text-xl mb-8 opacity-90">
          Join a community of millions of sellers and boost your revenue
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Register Now
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;

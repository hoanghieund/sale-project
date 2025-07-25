/**
 * StatsSection Component
 * Hiển thị các số liệu thống kê về sản phẩm, cửa hàng, khách hàng và sự hài lòng.
 */
const StatsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
            <div className="text-gray-600">Stores</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">50,000+</div>
            <div className="text-gray-600">Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
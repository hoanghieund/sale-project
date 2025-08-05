/**
 * StatsSection Component
 * Displays statistics on products, stores, customers, and satisfaction.
 */
const StatsSection = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-ring">10,000+</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ring">5,000+</div>
            <div className="text-gray-600">Stores</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ring">50,000+</div>
            <div className="text-gray-600">Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ring">99%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

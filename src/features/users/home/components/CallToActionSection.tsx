import { Link } from "react-router-dom";

/**
 * CallToActionSection Component
 * Displays a call-to-action section with a title, description, and registration/learn more buttons.
 */
const CallToActionSection = () => {
  return (
    <section className="py-12 bg-primary/50 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Selling Today</h2>
        <p className="text-xl mb-8 opacity-90">
          Join our community of millions of sellers and boost your revenue
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Sign Up Now
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

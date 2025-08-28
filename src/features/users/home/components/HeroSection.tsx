import { Clock, RefreshCw, ShieldCheck, Truck } from "lucide-react";

/**
 * HeroSection Component
 * Displays a fashion sale hero section with discount information and call-to-action
 * Optimized for conversion with urgency, social proof, and trust elements
 */
const HeroSection = () => {
  return (
    <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/20"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-white/20"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border border-white/20"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="space-y-6 relative z-10">
            {/* Flash Sale Badge */}
            <div className="mb-4">
              <span className="bg-trending text-white px-4 py-1.5 rounded-md text-sm font-medium inline-flex items-center animate-pulse">
                <Clock className="h-4 w-4 mr-1" /> FLASH SALE - ENDS IN 48H
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              STUNNING FASHION <br />
              AMAZING PRICES
            </h1>

            {/* Benefit-focused copy */}
            <div className="space-y-3">
              <p className="text-white text-lg max-w-md">
                Discover our latest fashion collection with the best prices on
                the market
              </p>
              <p className="text-white/80 text-base max-w-md">
                Thousands of products from trusted sellers nationwide
              </p>
            </div>

            {/* Social Proof */}
            <div className="bg-white/10 p-3 rounded-md inline-block">
              <p className="text-white text-sm font-medium">
                Trusted by over{" "}
                <span className="font-bold text-white">50,000+</span> customers
              </p>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col items-center bg-white/5 p-2 rounded-md">
                <ShieldCheck className="h-5 w-5 text-white mb-1" />
                <span className="text-xs text-center">Official Warranty</span>
              </div>
              <div className="flex flex-col items-center bg-white/5 p-2 rounded-md">
                <Truck className="h-5 w-5 text-white mb-1" />
                <span className="text-xs text-center">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center bg-white/5 p-2 rounded-md">
                <RefreshCw className="h-5 w-5 text-white mb-1" />
                <span className="text-xs text-center">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right content - Discount badge and image */}
          <div className="relative flex justify-center items-center">
            {/* Discount badge */}
            {/* <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20 bg-trending rounded-md w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-lg animate-pulse">
              <span className="text-2xl md:text-4xl font-bold text-white">
                50%
              </span>
              <span className="text-xs md:text-sm font-medium text-white">
                OFF
              </span>
            </div> */}

            {/* Image frame with enhanced styling */}
            <div className="relative w-full max-w-md border-4 border-white/30 shadow-xl rounded-md overflow-hidden">
              <img
                src="/assets/hero-running.jpg"
                alt="Stunning fashion at amazing prices - Flash sale"
                className="w-full h-auto object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

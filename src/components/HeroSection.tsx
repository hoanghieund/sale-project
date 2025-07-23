import heroImage from "@/assets/hero-running.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Athletic lifestyle"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <h2 className="text-lg font-medium mb-2">Feel The Unreal</h2>
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            NEW COLLECTION 25
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Outstanding collection, designs for important moments
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

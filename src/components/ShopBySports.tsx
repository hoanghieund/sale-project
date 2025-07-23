import { Link } from "react-router-dom";
import { SPORTS_CATEGORIES } from "../data/constants";
import { Button } from "./ui/button";

const ShopBySports = () => {
  const sports = SPORTS_CATEGORIES.slice(0, 6); // Show first 6 sports

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Sports</h2>
          <p className="text-muted-foreground">
            Find the perfect gear for your favorite sport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sports.map(sport => (
            <div
              key={sport.id}
              className="group relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Link to={`/products/sports/${sport.id}`}>
                  <Button variant="secondary" size="lg">
                    {sport.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBySports;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON_CATEGORIES } from "../data/constants";

const LatestGreatest = () => {
  const categories = ICON_CATEGORIES.slice(0, 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest & Greatest</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4">Click Here</p>
                <Link to={`/products/${category.id}`}>
                  <Button variant="secondary" size="sm">
                    Shop Now
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

export default LatestGreatest;

import { ICON_CATEGORIES } from "../data/constants";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopFootwearSelects = () => {
  const categories = ICON_CATEGORIES.slice(3, 7); // Get Dunk, Blazer, Pegasus, Mercurial

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Footwear Selects</h2>
          <p className="text-muted-foreground">Discover our most popular footwear categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/products/${category.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-product)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <Button variant="secondary" size="sm" className="w-full">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFootwearSelects;

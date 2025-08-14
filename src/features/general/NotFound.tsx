import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access a non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-12" role="main" aria-label="404 Page">
      {/* Hero: đồng nhất với SellerRegistration (Badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex">
              <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-600 text-white">404</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>
      </section>

      {/* Center CTA */}
      <div className="flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">You can go back to the homepage.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

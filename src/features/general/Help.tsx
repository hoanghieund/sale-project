import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Vendors directory page
 * Brief: Presents Eulotus vendor overview, selection criteria, and support contact.
 */
const Vendors = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Hero section refined */}
      <section className="rounded-lg p-4 md:p-6 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              Vendors
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Our Vendors
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover trusted vendors on the Eulotus marketplace.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="text-emerald-700 px-3 py-1.5 rounded-md text-xs inline-flex items-center">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              <span>Verified vendors and transparent policies</span>
            </div>
          </div>
        </div>
      </section>

      <div>
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-base md:text-lg font-semibold text-gray-900">
              About Eulotus Vendors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-2 text-gray-900">
                Selection Criteria
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Verified product quality</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Professional customer service</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Reliable shipping and handling times</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Consistently positive buyer ratings</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm md:text-base mb-2 text-gray-900">
                How It Works
              </h3>
              <p>
                Every vendor on Eulotus is verified and reviewed before being
                allowed to sell. We are committed to delivering the best
                shopping experience for our customers— with authentic products,
                transparent policies, and responsive support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sm md:text-base mb-2 text-gray-900">
                Support
              </h3>
              <p>
                If you have questions about any vendor or need assistance,
                please contact us at{" "}
                <a
                  href="mailto:eulotus.com@gmail.com"
                  className="text-primary hover:underline"
                >
                  eulotus.com@gmail.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA refined */}
      <section className="rounded-lg p-4 text-center">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-2">
          Trusted Marketplace
        </Badge>
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Shop with confidence
        </h2>
        <p className="text-muted-foreground mb-4 text-base max-w-2xl mx-auto">
          All vendors are verified to ensure authenticity and service quality
          across the marketplace.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            <Link to="/help">
              Visit Help Center
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Vendors;

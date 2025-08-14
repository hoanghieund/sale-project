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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero: đồng nhất kiểu với SellerRegistration (badge + tiêu đề + mô tả) */}
      <section className="text-center py-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              Vendors
            </Badge>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold">
            Our Vendors
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover trusted vendors on the Eulotus marketplace.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md text-xs inline-flex items-center">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              <span>Verified vendors and transparent policies</span>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About Eulotus Vendors
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-base mb-2 text-gray-900">
                Selection Criteria
              </h3>
              <ul className="space-y-1.5 ml-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="text-sm">Verified product quality</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="text-sm">Professional customer service</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="text-sm">Reliable shipping and handling times</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="text-sm">Consistently positive buyer ratings</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2 text-gray-900">
                How It Works
              </h3>
              <p className="text-sm">
                Every vendor on Eulotus is verified and reviewed before being
                allowed to sell. We are committed to delivering the best
                shopping experience for our customers— with authentic products,
                transparent policies, and responsive support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2 text-gray-900">
                Support
              </h3>
              <p className="text-sm">
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
          </div>
        </div>
      </div>

      {/* Bottom CTA: đồng nhất với SellerRegistration */}
      <section className="text-center py-8">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-3">
          Trusted Marketplace
        </Badge>
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Shop with confidence
        </h2>
        <p className="text-muted-foreground mb-5 text-sm">
          All vendors are verified to ensure authenticity and service quality
          across the marketplace.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Button
            asChild
            size="default"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm"
          >
            <Link to="/help">
              Visit Help Center
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Vendors;

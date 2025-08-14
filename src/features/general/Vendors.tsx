import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Vendors directory page
 * Brief: Presents Eulotus vendor overview, selection criteria, and support contact.
 */
const Vendors = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero: đồng nhất kiểu với SellerRegistration (badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Vendors</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Our Vendors</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Discover trusted vendors on the Eulotus marketplace.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-md text-sm inline-flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Verified vendors and transparent policies</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-white border-border/60">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              About Eulotus Vendors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
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
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                How It Works
              </h3>
              <p>
                Every vendor on Eulotus is verified and reviewed before being allowed to sell.
                We are committed to delivering the best shopping experience for our customers—
                with authentic products, transparent policies, and responsive support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Support
              </h3>
              <p>
                If you have questions about any vendor or need assistance, please contact us at{" "}
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

      {/* Bottom CTA: đồng nhất với SellerRegistration */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-8 text-center border border-blue-200/50 shadow-sm">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">Trusted Marketplace</Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Shop with confidence</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          All vendors are verified to ensure authenticity and service quality across the marketplace.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-8">
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

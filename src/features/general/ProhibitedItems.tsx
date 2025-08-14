import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, FileX, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Prohibited Items page
 * Brief: Lists categories of items not allowed on Eulotus and how to report violations.
 */
const ProhibitedItems = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero: đồng nhất với SellerRegistration */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Policy Notice</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Prohibited Items</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Items that are not allowed to be sold on the Eulotus marketplace
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">

        <div className="space-y-6">
          {/* Important notice */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="text-red-800">
                  <h3 className="font-semibold mb-2">Important Notice</h3>
                  <p className="text-sm">
                    Selling prohibited items may result in permanent account suspension
                    and legal liability. Please review this list carefully before listing any item.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Weapons & Hazardous Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Primitive and modern weapons</li>
                  <li>• Explosives, fireworks</li>
                  <li>• Toxic chemicals</li>
                  <li>• Military-grade equipment</li>
                  <li>• Daggers, swords</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-red-600" />
                  Inappropriate Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Pornographic products</li>
                  <li>• Violent content</li>
                  <li>• Hate speech or extremist propaganda</li>
                  <li>• Sex service advertisements</li>
                  <li>• Content offensive to religions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileX className="h-5 w-5 text-red-600" />
                  Counterfeits & Copyright Violations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Counterfeit or imitation goods</li>
                  <li>• Copyright-infringing products</li>
                  <li>• Cracked or pirated software</li>
                  <li>• Intellectual property infringements</li>
                  <li>• Pirated books and movies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Medical & Pharmaceuticals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Prescription-only medicines</li>
                  <li>• Specialized medical equipment</li>
                  <li>• Tobacco products</li>
                  <li>• High-alcohol spirits</li>
                  <li>• Unregulated supplements of unknown origin</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Other restricted categories */}
          <Card className="bg-white border-border/60">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Additional Restricted Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    Animals
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Live animals</li>
                    <li>• Products from endangered species</li>
                    <li>• Ivory, rhino horn</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    Services
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Financial services</li>
                    <li>• Insurance services</li>
                    <li>• Legal services</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    Others
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Currency, precious metals</li>
                    <li>• Lotteries, gambling</li>
                    <li>• Social media accounts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting contact */}
          <Card className="bg-white border-border/60">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Report a Violation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                If you find a listing violating our policies, please report it so we can take timely action:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong>{" "}
                  <a
                    href="mailto:eulotus.com@gmail.com"
                    className="text-primary hover:underline"
                  >
                    eulotus.com@gmail.com
                  </a>
                </p>
                <p><strong>Processing time:</strong> Within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA: đồng nhất với SellerRegistration */}
        <section className="mt-10 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-8 text-center border border-blue-200/50 shadow-sm">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">Marketplace Policy</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank you for keeping Eulotus safe</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Following our policies helps protect the community and ensures a high-quality shopping experience for everyone.
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
    </div>
  );
};

export default ProhibitedItems;

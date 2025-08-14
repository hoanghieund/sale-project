import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Store, Shield, Star } from "lucide-react";

/**
 * Marketplace Guidelines page
 * Brief: Clear rules for sellers and buyers, violations policy, rating principles, and contact.
 */
const MarketplaceGuidelines = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Marketplace Guidelines
          </h1>
          <p className="text-lg text-gray-600">
            Key rules to maintain a fair and safe buying and selling environment
          </p>
        </div>

        <div className="space-y-6">
          {/* General rules */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                General Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  🤝 Respect and Integrity
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Be honest in product and service descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Respect privacy and personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Communicate politely and professionally</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seller rules */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Store className="h-5 w-5 text-blue-600" />
                Rules for Sellers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    📝 Product Information
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Accurate and detailed descriptions</li>
                    <li>• Real, high-quality images</li>
                    <li>• Transparent pricing with no hidden fees</li>
                    <li>• Clear shipping information</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    🚚 Shipping & Service
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Deliver on time as committed</li>
                    <li>• Pack carefully and safely</li>
                    <li>• Respond to messages within 24 hours</li>
                    <li>• Handle complaints promptly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buyer rules */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Rules for Buyers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    💳 Payments
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Pay on time</li>
                    <li>• Use supported payment methods</li>
                    <li>• Do not pay outside the system</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    📦 Receiving & Reviews
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Inspect items upon delivery</li>
                    <li>• Report issues within the timeframe</li>
                    <li>• Leave objective and honest reviews</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Violations & penalties */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Violations & Penalties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Warning</h4>
                  <p className="text-sm text-yellow-800">Minor first-time violations receive a warning and required correction</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Restriction</h4>
                  <p className="text-sm text-orange-800">Temporary feature limitations for 7–30 days</p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Account Suspension</h4>
                  <p className="text-sm text-red-800">Severe violations may result in permanent suspension</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating system */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Rating System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  ⭐ Review Principles
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Only verified buyers can leave reviews</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reviews must reflect real experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>No profanity or abusive language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>No fake reviews or review trading</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Support Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                If you have questions about these guidelines or need assistance, please contact:
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
                <p><strong>Response time:</strong> Within 24 business hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceGuidelines;

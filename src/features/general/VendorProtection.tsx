import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Vendor Protection Program page - theo mẫu bazatify.com
 * Brief: Giải thích chương trình bảo vệ vendor khỏi claims và chargebacks
 */
const VendorProtection = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">»</span>
        <span>Vendor Protection Program</span>
      </nav>

      {/* Main Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vendor Protection Program
        </h1>
      </div>

      {/* Main Content - theo mẫu bazatify.com */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            "We understand how important security and peace of mind are in online business, so we created a Vendor Protection Program 
            to help guard you from losing money to claims and chargebacks. Vendor Protection covers two particular types of buyer complaints:"
          </p>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-green-900">"Unauthorized Transaction"</strong>
                    <p className="text-green-800 mt-1">
                      There's a transaction, but the accountholder claims that he or she didn't authorize payment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-green-900">"Item Not Received"</strong>
                    <p className="text-green-800 mt-1">
                      A buyer pays for an item but claims he or she didn't receive it.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <div className="mt-8">
            <p className="text-lg font-bold text-gray-900 mb-4">
              <em>What are the requirements for Vendor Protection Program?</em>
            </p>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>The item must be shipped.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Items are sent to the address on the Transaction Details page.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You ship items on time and according to your item description.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You must provide proof of delivery of the goods in the form of a shipping tracking code.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      If we request documentation or other relevant information, we ask that you respond promptly 
                      (typically within three business days).
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Valid Request */}
          <div className="mt-8">
            <p className="mb-6">
              If your vendor protection request is valid we will pay the full amount of the order made to the vendor's wallet.
            </p>
          </div>

          {/* What isn't covered */}
          <div className="mt-8">
            <p className="text-lg font-bold text-gray-900 mb-4">
              <em>What isn't covered by Vendor Protection</em> <em>Program</em><em>"?"</em>
            </p>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <ul className="space-y-4 text-red-800">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Claims, chargebacks, or reversals are filed because the item is significantly different from how it was 
                      described (e.g., you described an item as "new" but sent a used one).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Illegal or counterfeit items.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>
                      It involves an item that you deliver in person, including in connection with a payment made in your physical store.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="mt-8">
            <p className="text-lg font-bold text-gray-900 mb-4">
              <em>Contact us</em>
            </p>
            
            <p>
              Email:{" "}
              <a 
                href="mailto:eulotus.com@gmail.com" 
                className="text-primary hover:underline font-medium"
              >
                eulotus.com@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProtection;

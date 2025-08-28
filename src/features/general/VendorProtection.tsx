import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Vendor Protection Program page - theo mẫu bazatify.com
 * Brief: Giải thích chương trình bảo vệ vendor khỏi claims và chargebacks
 */
const VendorProtection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm py-2">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">»</span>
        <span>Vendor Protection Program</span>
      </nav>

      {/* Main Heading */}
      <div className="text-center mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Vendor Protection Program
        </h1>
      </div>

      {/* Main Content - theo mẫu bazatify.com */}
      <div className="space-y-6">
        <div className="space-y-4 leading-relaxed">
          <p className="text-sm">
            We understand how important security and peace of mind are in online
            business, so we created a Vendor Protection Program to help guard
            you from losing money to claims and chargebacks. Vendor Protection
            covers two particular types of buyer complaints:
          </p>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Unauthorized Transaction</strong>
                    <p className="mt-1 text-xs">
                      There's a transaction, but the accountholder claims that
                      he or she didn't authorize payment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Item Not Received</strong>
                    <p className="mt-1 text-xs">
                      A buyer pays for an item but claims he or she didn't
                      receive it.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <div className="mt-4">
            <p className="text-base font-bold mb-2">
              <em>What are the requirements for Vendor Protection Program?</em>
            </p>

            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>The item must be shipped.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Items are sent to the address on the Transaction Details
                      page.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      You ship items on time and according to your item
                      description.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      You must provide proof of delivery of the goods in the
                      form of a shipping tracking code.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      If we request documentation or other relevant information,
                      we ask that you respond promptly (typically within three
                      business days).
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Valid Request */}
          <div className="mt-4">
            <p className="mb-3 text-sm">
              If your vendor protection request is valid we will pay the full
              amount of the order made to the vendor's wallet.
            </p>
          </div>

          {/* What isn't covered */}
          <div className="mt-4">
            <p className="text-base font-bold mb-2">
              <em>What isn't covered by Vendor Protection Program?</em>
            </p>

            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Claims, chargebacks, or reversals are filed because the
                      item is significantly different from how it was described
                      (e.g., you described an item as "new" but sent a used
                      one).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Illegal or counterfeit items.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      It involves an item that you deliver in person, including
                      in connection with a payment made in your physical store.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="mt-4">
            <p className="text-base font-bold mb-2">
              <em>Contact us</em>
            </p>

            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:contact.eulotus@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                contact.eulotus@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProtection;

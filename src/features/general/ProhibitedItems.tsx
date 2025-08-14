import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, FileX, ArrowRight, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Prohibited Items page - theo mẫu bazatify.com
 * Brief: Danh sách các item không được phép bán trên Eulotus và hậu quả vi phạm
 */
const ProhibitedItems = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">»</span>
        <span>Prohibited Items</span>
      </nav>

      {/* Main Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Prohibited Items
        </h1>
      </div>

      {/* Main Content - theo mẫu bazatify.com */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Eulotus.com prohibits the listing or sale of any item that is set forth in the list of prohibited items. 
            If a vendor lists a prohibited item, it will be deemed to be a violation of our Terms of Service, regardless 
            of whether the vendor acted intentionally or not. If Eulotus.com determines that a listing is in violation 
            or is otherwise inappropriate, it may, at its discretion, remove the listing and cancel any related transactions 
            up to and including termination or suspension.
          </p>

          {/* General Prohibited Activities */}
          <div>
            <p className="mb-4 font-medium">
              "Eulotus.com may not be used in connection with any product, service, transaction, or activity that, in general:"
            </p>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Violates any law or government regulation, or promotes or facilitates such action by third parties;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Is fraudulent, deceptive, unfair, or predatory;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Causes or threatens to damage Eulotus.com's reputation;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Violates the terms of any bank, card, or electronic funds transfer network;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Results in or creates a significant risk of chargebacks, penalties, damages, or other harm or liability;</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <p className="mt-4 text-sm text-muted-foreground">
              The list of prohibited items may be updated from time to time at Eulotus.com's discretion. Examples of items 
              that fall under certain categories may also be expanded to provide better communication and context for our users.
            </p>
          </div>

          {/* Specific Prohibited Items */}
          <div className="mt-8">
            <p className="mb-6 font-medium">
              "Eulotus.com may not be used to sell any of the following products or services:"
            </p>

            <Card className="bg-white border-border/60">
              <CardContent className="p-6">
                <ul className="space-y-6">
                  <li>Anything is not a legal product.</li>
                  
                  <li>
                    Inflated prices where listings attempt to profit from tragedies and disasters 
                    (such as "paradise fire," "coronavirus outbreak," etc.)
                  </li>
                  
                  <li>
                    <strong>"Stolen goods:"</strong>
                    <ul className="mt-2 ml-4 space-y-1 text-sm text-muted-foreground">
                      <li>
                        "Note: If a purchased item is reported as stolen, a demand for return may be received from the victim 
                        or another party, and the item may be confiscated."
                      </li>
                    </ul>
                  </li>
                  
                  <li>
                    <strong>"Counterfeit goods or goods infringing on a third party's intellectual property rights:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>Listings of non-brand, non-genuine, imitation, fake, or replica.</li>
                      <li>Items in violation of a copyright, including handmade or other items with copyrighted characters, brand logos, etc.</li>
                      <li className="text-sm text-muted-foreground">
                        "Note: For brand-name products, serial numbers or receipts must be available when listing the item."
                      </li>
                    </ul>
                  </li>
                  
                  <li>Any item that contains a computer virus, malware, or spyware</li>
                  
                  <li>
                    <strong>"Digital items: any items where the order is fulfilled electronically or requires a download. such as:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>Ebooks, PDF files, user-generated content (UGC).</li>
                    </ul>
                  </li>
                  
                  <li>
                    <strong>"Items not in your possession:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>Coupons to purchase products</li>
                    </ul>
                  </li>
                  
                  <li>
                    <strong>"Items that are a safety hazard include, but are not limited to, the following:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>Restricted from shipping in the mail or other delivery services</li>
                      <li>Products that have been recalled by the Consumer Product Safety Commission may not be sold on the platform.</li>
                    </ul>
                  </li>
                  
                  <li>
                    Products designed to circumvent copyright protection techniques or otherwise facilitate the unlicensed use 
                    of copyright materials (such as the "mod chips tutorial item" to break the encryption on game computers 
                    to allow the playing of unlicensed game copies)
                  </li>
                  
                  <li>Age-restricted products or products that require legal approval, vendor/buyer registration, or licenses to be sold</li>
                  
                  <li>
                    <strong>"Explicit items:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>Pornographic or obscene materials</li>
                      <li>Sexually related book items, such as sex toys and fetish items</li>
                    </ul>
                  </li>
                  
                  <li>
                    <strong>"Offensive listings:"</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>
                        Items, listings, photos, or content that promote or glorify hatred, violence, racism, or discrimination 
                        aren't allowed (determined at our discretion).
                      </li>
                    </ul>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Final Note */}
          <div className="mt-8">
            <p className="text-center font-medium text-gray-900">
              "Note: Any item may be removed at our discretion."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProhibitedItems;

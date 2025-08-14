import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Camera, Clock, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Authenticate page - theo mẫu bazatify.com
 * Brief: Giải thích dịch vụ authenticate luxury goods cho buyers và vendors
 */
const Authenticate = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm py-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">»</span>
        <span>Authenticate</span>
      </nav>

      {/* Main Heading */}
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Authenticate
        </h1>
      </div>

      {/* Main Content - theo mẫu bazatify.com */}
      <div className="space-y-6">
        <div className="space-y-4 leading-relaxed">
          <h5 className="text-lg font-bold">
            Buy and sell luxury goods the easy way.
          </h5>
          
          <p className="text-sm">
            <strong>Eulotus Authenticate</strong> is a feature that allows you to assess the authenticity of select luxury items. 
            We have partnered with an independent third party{" "}
            <a 
              href="https://realauthentication.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              <em>Real Authentication</em>
            </a>{" "}
            to carefully examine photos of wallets, shoes, eyewear, jewelry, watches, and handbags by examining logos, labels, 
            materials, and serial numbers.
          </p>
          
          <p className="text-sm">
            Once verified, the product will be marked with a blue tick badge on the Eulotus product page so that shoppers 
            can easily know that the product is authentic.
          </p>

          {/* For Shoppers */}
          <div className="mt-6">
            <p className="text-lg font-bold mb-2">
              <em>Eulotus Authenticate for Shoppers</em>
            </p>
            
            <p className="mb-2 text-sm">
              When you see the blue tick <CheckCircle className="inline h-4 w-4 text-blue-600" />, know that it has been 
              assessed by Real Authentication. For certified products, you will receive a QR coded certificate of authenticity 
              after the transaction is completed, which we will email to you.
            </p>
            
            <p className="mb-3 text-sm">
              See{" "}
              <Link to="/authenticate-terms" className="text-primary hover:underline font-medium">
                <em>Eulotus Authenticate Terms and Conditions</em>
              </Link>{" "}
              for details.
            </p>
          </div>

          {/* For Vendors */}
          <div className="mt-6">
            <p className="text-lg font-bold mb-2">
              <em>Eulotus Authenticates for Vendors</em>
            </p>
            
            <p className="mb-2 text-sm">
              When you list a handbag, wallet, jewelry, watch, eyewear, or pair of shoes priced over $100, authentication 
              is completely optional unless you list more than the required authentication amount for the category and brand 
              of the item. The amount may vary by category and will be announced at the time of listing. If you list a designer 
              item priced above that amount, we will ask you to submit specific photos for authentication.
            </p>
            
            <p className="mb-3 text-sm">
              <a 
                href="https://realauthentication.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <em>Real Authentication</em>
              </a>{" "}
              will quickly and automatically verify your items.
            </p>

            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-2">Photo Requirements by Category:</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong>For Handbags:</strong> During the listing process, you will be asked to take photos of the front, 
                    back, bottom, handle or strap, logo, serial number or date code (make sure the number is legible), 
                    hardware, zipper, and "Made in" label. See more examples{" "}
                    <a 
                      href="https://realauthentication.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      at Real Authentication
                    </a>.
                  </li>
                  <li>
                    <strong>For Shoes:</strong> During the listing process, you will be asked to take photos of the front, 
                    side, sole, insole, serial number or shoe size label, and manufacturing label.
                  </li>
                  <li>
                    <strong>For Eyeglasses:</strong> After tapping "List," you will be asked to take photos of the front 
                    of the glasses, the "Made in" text, the engraving on the frame, the serial number, the screws, 
                    and the engraving on the lenses.
                  </li>
                  <li>
                    <strong>For Jewelry:</strong> During the listing process, you will be asked to take photos of the front, 
                    back, logo, serial number (make sure the number is legible), the authentication mark (Example: 14K, 18K, etc.), 
                    and the "Made in" label.
                  </li>
                  <li>
                    <strong>For Watches:</strong> During the listing process, you will be asked to take photos of the front, 
                    back, watch face, engraving on the case, the serial number (make sure the number is legible), 
                    the crown, and the clasp.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Response Time */}
          <div className="mt-4">
            <p className="font-semibold mb-2 text-sm">
              Get a response in less than 48 hours.
            </p>
            
            <p className="mb-2 text-sm">
              <a 
                href="https://realauthentication.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <em>Real Authentication</em>
              </a>{" "}
              will carefully review your item and make a decision in 48 hours or less.
            </p>
            
            <p className="text-xs italic mb-3">
              "Note: While items are pending review, they will not be available on the Eulotus marketplace and will not appear in search results."
            </p>
          </div>

          {/* Verification */}
          <div className="mt-4">
            <h5 className="text-base font-bold mb-2">Verification.</h5>
            
            <p className="mb-3 text-sm">
              Once your product is verified as authentic by{" "}
              <a 
                href="https://realauthentication.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <em>Real Authentication</em>
              </a>, we will give it an authentication badge and boost its search ranking. 
              Vendors please contact a "Eulotus vendor support specialist" directly for faster approval.
            </p>

            <div className="mb-3">
              <p className="font-semibold mb-2">What happens if…</p>
              
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-4">
                  <ul className="space-y-2 text-xs">
                    <li>
                      <strong><em>Real Authentication needs more information about my wallet, shoes, glasses, jewelry, watches, or handbag?</em></strong>{" "}
                      Sometimes photos are blurry or{" "}
                      <a 
                        href="https://realauthentication.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Real Authentication
                      </a>{" "}
                      needs more information. We will let you know what to include in the application.
                    </li>
                    <li className="text-xs">
                      <strong><em>is my wallet, shoes, glasses, jewelry, watches, or handbag verified as authentic?</em></strong>{" "}
                      Eulotus will automatically list your product, boost its search ranking, and grant it an authentication badge.
                    </li>
                    <li className="text-xs">
                      <strong><em>my item was rejected?</em></strong>{" "}
                      We will automatically remove any listings that cannot be verified for authenticity.
                    </li>
                    <li className="text-xs">
                      <strong><em>no verdict?</em></strong>{" "}
                      This means{" "}
                      <a 
                        href="https://realauthentication.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Real Authentication
                      </a>{" "}
                      was unable to determine whether your wallet, shoe, or bag is authentic. Your item is not eligible to be listed on Eulotus.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Eligible Brands */}
          <div className="mt-4">
            <h5 className="text-lg font-bold mb-2">
              What brands are eligible* for authentication?
            </h5>
            
            <p className="mb-3 text-sm">
              Please refer to the product types and brands eligible for authentication{" "}
              <a 
                href="https://realauthentication.com/what-we-authenticate/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <strong><em>here</em></strong>
              </a>.
            </p>
          </div>

          {/* Important Note */}
          <div className="mt-4">
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-4">
                <p className="font-semibold mb-2 text-sm">Important Note*</p>
                
                <p className="text-xs">
                  Eulotus does not directly authenticate any products and the authentication results we receive will not 
                  guarantee that the vendor will always send genuine products. In case of a dispute (buyer claims to have 
                  received fake/imitation goods), Eulotus will request the vendor to provide additional documents directly 
                  related to the product of that order. Buyers please refer to Eulotus's Return and Refund policy{" "}
                  <Link to="/shipping-returns" className="hover:underline font-medium">
                    <strong>here</strong>
                  </Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

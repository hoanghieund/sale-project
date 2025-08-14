import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, RefreshCw, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Buyer Protection page - theo mẫu bazatify.com
 * Brief: Giải thích chính sách bảo vệ người mua, return policy, fraud warning
 */
const BuyerProtection = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">»</span>
        <span>Buyer Protection</span>
      </nav>

      {/* Main Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Buyer Protection
        </h1>
      </div>

      {/* Main Content - theo mẫu bazatify.com */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            <strong className="text-gray-900">Buy with confidence.</strong>
          </p>
          
          <p>
            When you buy on Eulotus, we hold your payment until you receive the item and have time to review it. 
            Once you receive the item, you have 30 days from the delivery time to confirm everything is to your 
            liking and to rate the seller.
          </p>
          
          <p>
            If you're not happy with your purchase because item(s) defected, you may return the item in 30 days 
            from the delivery time. We have you covered, the return label is free.
          </p>
          
          <p>
            Once you rate the seller, the sale is final and your payment is issued to the seller.
          </p>
          
          <p>
            To keep you safe, we recommend that all communication takes place in the website and not to share 
            personal or financial information for online transactions.
          </p>

          {/* Returns Section */}
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              How do returns work?
            </p>
            
            <p className="mb-4">
              You have 30 days from receiving the item to request a return. Returns will be accepted as long as 
              the item is in the same condition as when it was shipped (not modified or tampered). Once the return 
              is complete, you will be refunded, excluding applicable fees.
            </p>
            
            <p className="mb-4">
              Remember, don't rate the seller until you're confident you won't be returning the item.
            </p>

            <Card className="bg-white border-border/60">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Return Process Steps:</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Go to the Contact Us page and tell us why you would like to return the item.</li>
                  <li>
                    Provide photos of the item, highlighting any differences between the item listing and how 
                    the item was received. (This can help the seller improve their listings).
                  </li>
                  <li>
                    For damaged items, please include photos of the box, packaging materials and the damaged item.
                  </li>
                  <li>
                    You have 30 calendar days to drop off the return item with the shipping carrier or the 
                    payment will be released to the seller and the sale is final.
                  </li>
                  <li>
                    Refunds for completed returns will be processed no later than 14 calendar days from 
                    confirmation of the return's delivery. See more at{" "}
                    <Link to="/shipping-returns" className="text-primary hover:underline font-medium">
                      <em>Here</em>
                    </Link>.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Fraud Warning */}
          <div className="mt-8">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-900">
                      Fraud warning
                    </h3>
                    
                    <p className="mb-4 text-red-800">
                      Customers should be vigilant about protecting themselves from fraudsters and scams. 
                      Fraudulent transactions may result in the loss of your money with no recourse. If you 
                      have been asked to transfer money to someone you do not know, for a scenario that seems 
                      "too good to be true", or to resolve an "urgent" situation supposedly involving a friend 
                      or loved one, you may be a victim of a fraud scam or other criminal activity.
                    </p>
                    
                    <p className="text-red-800">
                      If you suspect that you may be a victim of fraud, please email us at{" "}
                      <a 
                        href="mailto:eulotus.com@gmail.com" 
                        className="text-red-600 hover:underline font-medium"
                      >
                        eulotus.com@gmail.com
                      </a>{" "}
                      or report your suspicions to law enforcement. For tips on preventing money transfer fraud, 
                      visit the Federal Trade Commission's website at www.consumer.ftc.gov.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProtection;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Buyer Protection Program page
 * Brief: Communicates Eulotus commitments, dispute resolution steps, and support contact.
 */
const BuyerProtection = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Buyer Protection Program
          </h1>
          <p className="text-lg text-gray-600">
            Our commitment to protect your rights and ensure a safe shopping experience
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  🔒 100% Secure Payments
                </h3>
                <p>
                  All payment transactions are SSL-encrypted and fully secured.
                  Your card information is never stored on our systems.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  📦 Delivery Guarantee
                </h3>
                <p>
                  If you don't receive your order or the item is not as described,
                  we guarantee a full refund.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  ⏰ 24/7 Support
                </h3>
                <p>
                  Our support team is available around the clock to assist you
                  whenever issues arise.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Dispute Resolution Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <h4 className="font-semibold mb-2">Report Issue</h4>
                  <p className="text-sm">Contact us within 7 days</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <h4 className="font-semibold mb-2">Investigation</h4>
                  <p className="text-sm">We review within 24–48 hours</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <h4 className="font-semibold mb-2">Resolution</h4>
                  <p className="text-sm">Refund or product exchange</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                If you need assistance or have questions about the Buyer Protection Program,
                please contact us:
              </p>
              <div className="mt-4">
                <p><strong>Email:</strong>{" "}
                  <a 
                    href="mailto:eulotus.com@gmail.com" 
                    className="text-primary hover:underline"
                  >
                    eulotus.com@gmail.com
                  </a>
                </p>
                <p><strong>Support hours:</strong> 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerProtection;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Vendor Protection Program page
 * Brief: Outlines vendor benefits, protection policies, support workflow, and contact.
 */
const VendorProtection = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Vendor Protection Program
          </h1>
          <p className="text-lg text-gray-600">
            Supporting and protecting vendor interests on our platform
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Vendor Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  💰 Payment Assurance
                </h3>
                <p>
                  We guarantee on-time, full payments for all successfully delivered orders.
                  Automated payout systems ensure transparency.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  🛡️ Anti-fraud Protection
                </h3>
                <p>
                  AI systems and experts monitor 24/7 to detect and prevent fraudulent
                  activities, protecting vendor revenue.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  📊 Business Support
                </h3>
                <p>
                  Access analytics tools, detailed reports, and strategic guidance to
                  optimize your sales performance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Protection Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    🏪 Store Protection
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Prevent unauthorized product copying</li>
                    <li>• Protect brand identity and logos</li>
                    <li>• Deter unfair competition</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base mb-2 text-gray-900">
                    💳 Revenue Protection
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Ensure timely payouts</li>
                    <li>• Assist in dispute resolution</li>
                    <li>• Insurance for high-value transactions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Support Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <h4 className="font-semibold mb-2">Report</h4>
                  <p className="text-sm">Submit issues via the system</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <h4 className="font-semibold mb-2">Review</h4>
                  <p className="text-sm">Our experts investigate</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <h4 className="font-semibold mb-2">Action</h4>
                  <p className="text-sm">Apply protection measures</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">4</div>
                  <h4 className="font-semibold mb-2">Follow-up</h4>
                  <p className="text-sm">Continuous monitoring & support</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p><strong>Support contact:</strong></p>
                <p>Email: <a href="mailto:eulotus.com@gmail.com" className="text-primary hover:underline">eulotus.com@gmail.com</a></p>
                <p>Response time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorProtection;

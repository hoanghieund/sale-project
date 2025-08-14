import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Product Authentication page
 * Brief: Explains vendor/product verification standards and how to contact the team.
 */
const Authenticate = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Authentication
          </h1>
          <p className="text-lg text-gray-600">
            Our system verifies product authenticity and quality
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Authentication Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    🔍 Vendor Verification
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Validate business licenses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Check product supply sources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Assess brand reputation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    ✅ Product Inspection
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Verify authenticity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Quality assurance checks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Safety and compliance evaluation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Authentication Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  📋 Quality Standards
                </h3>
                <p>
                  All products must meet international standards for quality and safety.
                  We apply rigorous inspections to ensure items match their descriptions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  🏷️ Brand Verification
                </h3>
                <p>
                  We work directly with brands and authorized distributors to ensure
                  product authenticity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  🔒 Data Security
                </h3>
                <p>
                  All verification information is kept strictly confidential and used
                  solely for product quality checks.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Authentication Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                If you have questions about product authenticity or need verification
                support, please contact us:
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
                <p><strong>Processing time:</strong> 24–48 business hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, Users, Shield } from "lucide-react";

/**
 * Marketplace Guidelines page
 * Brief: Safety guidelines for marketplace users based on bazatify.com structure - neighborly behavior, safety, and legal compliance.
 */
const MarketplaceGuidelines = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>Marketplace Guidelines</span>
        </nav>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Marketplace Guidelines
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Opening Statement */}
          <div className="leading-relaxed">
            <p className="mb-4 text-sm">
              We work hard to keep the marketplace safe. But we can't do it alone. We need your help to keep selling and buying safe for everyone.
            </p>
          </div>

          {/* Keep it neighborly */}
          <section className="space-y-4">
            <div className="space-y-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Keep it neighborly.
              </h2>
              
              <div className="space-y-3 leading-relaxed">
                <p className="text-sm">
                  Buyers and vendors on Eulotus are real people, <strong>most are not retail professionals</strong>. Treat them like you would your neighbor.
                </p>
                
                <p className="text-sm">
                  Accurately represent yourself and your stuff to them. Only list items you intend to sell. At a price you intend to sell it at. If you negotiate, do so in good faith.
                </p>
              </div>

              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Prohibited Conduct:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Sending chat messages intended to threaten, degrade, or harass another user</li>
                    <li>• Listing items associated with hate groups or glorifying violence</li>
                    <li>• Sending messages or listing items with racial slurs</li>
                    <li>• Listings or messages that provide false information</li>
                  </ul>
                </CardContent>
              </Card>

              <p className="text-sm">
                Check out our full list of{" "}
                <Link 
                  to="/prohibited-items" 
                  className="hover:underline font-medium"
                >
                  Prohibited items
                </Link>
                {" "}for more details.
              </p>
            </div>
          </section>

          {/* Keep it safe */}
          <section className="space-y-4">
            <div className="space-y-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Keep it safe.
              </h2>
              
              <div className="space-y-3 leading-relaxed">
                <p className="text-sm">
                  To keep you safe, we recommend that all communication takes place in the website and not to share personal or financial information for online transactions.
                </p>
              </div>

              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Prohibited Conduct:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Attempting to take a transaction off the Eulotus website (meeting in real life).</li>
                    <li>• Trades or partial trades (trading items so neither user pays or only partially pays).</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Keep it legal */}
          <section className="space-y-4">
            <div className="space-y-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Keep it legal.
              </h2>
              
              <div className="space-y-3 leading-relaxed">
                <p className="text-sm">
                  We follow the law. So should you. All listed items must be legal to sell and legal to ship — under federal, state and local law. If you don't own it, don't sell it.
                </p>
                
                <p className="text-sm">
                  We are also required to comply with the regulations of the payment processors and other partners that we work with. Check out our full list of{" "}
                  <Link 
                    to="/prohibited-items" 
                    className="text-primary hover:underline font-medium"
                  >
                    Prohibited Items
                  </Link>
                  {" "}for more details.
                </p>
              </div>
            </div>
          </section>

          {/* Separator */}
          <hr className="my-6" />

          {/* Contact Support */}
          <section className="text-center">
            <div className="space-y-3 leading-relaxed">
              <p className="text-sm">
                See something that doesn't feel right? We're here for you. Reach out to us through the{" "}
                <strong>
                  <em>
                    <Link 
                      to="/help" 
                      className="hover:underline"
                    >
                      Help Center
                    </Link>
                  </em>
                </strong>
                .
              </p>
              
              <p className="text-xs">
                Or contact us directly at{" "}
                <a 
                  href="mailto:eulotus.com@gmail.com" 
                  className="text-primary hover:underline font-medium"
                >
                  eulotus.com@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default MarketplaceGuidelines;

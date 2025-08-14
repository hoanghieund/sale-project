import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, Users, Shield } from "lucide-react";

/**
 * Marketplace Guidelines page
 * Brief: Safety guidelines for marketplace users based on bazatify.com structure - neighborly behavior, safety, and legal compliance.
 */
const MarketplaceGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Marketplace Guidelines</span>
        </nav>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Marketplace Guidelines
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Opening Statement */}
          <div className="text-lg text-muted-foreground leading-relaxed">
            <p className="mb-6">
              We work hard to keep the marketplace safe. But we can't do it alone. We need your help to keep selling and buying safe for everyone.
            </p>
          </div>

          {/* Keep it neighborly */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                Keep it neighborly.
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Buyers and vendors on Eulotus are real people, <strong>most are not retail professionals</strong>. Treat them like you would your neighbor.
                </p>
                
                <p>
                  Accurately represent yourself and your stuff to them. Only list items you intend to sell. At a price you intend to sell it at. If you negotiate, do so in good faith.
                </p>
              </div>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    "Prohibited Conduct:"
                  </h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Sending chat messages intended to threaten, degrade, or harass another user</li>
                    <li>• Listing items associated with hate groups or glorifying violence</li>
                    <li>• Sending messages or listing items with racial slurs</li>
                    <li>• Listings or messages that provide false information</li>
                  </ul>
                </CardContent>
              </Card>

              <p className="text-muted-foreground">
                Check out our full list of{" "}
                <Link 
                  to="/prohibited-items" 
                  className="text-primary hover:underline font-medium"
                >
                  Prohibited items
                </Link>
                {" "}for more details.
              </p>
            </div>
          </section>

          {/* Keep it safe */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                Keep it safe.
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To keep you safe, we recommend that all communication takes place in the website and not to share personal or financial information for online transactions.
                </p>
              </div>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    "Prohibited Conduct:"
                  </h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• Attempting to take a transaction off the Eulotus website (meeting in real life).</li>
                    <li>• Trades or partial trades (trading items so neither user pays or only partially pays).</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Keep it legal */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Keep it legal.
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We follow the law. So should you. All listed items must be legal to sell and legal to ship — under federal, state and local law. If you don't own it, don't sell it.
                </p>
                
                <p>
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
          <hr className="border-border my-8" />

          {/* Contact Support */}
          <section className="text-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                See something that doesn't feel right? We're here for you. Reach out to us through the{" "}
                <strong>
                  <em>
                    <Link 
                      to="/help" 
                      className="text-primary hover:underline"
                    >
                      Help Center
                    </Link>
                  </em>
                </strong>
                .
              </p>
              
              <p className="text-sm">
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

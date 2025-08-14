/**
 * Help page for users to find answers and contact support.
 * - English content per project requirement
 * - Uses shadcn components for consistent UI
 * - Keep layout responsive and accessible
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LifeBuoy, Mail, MessageSquare, Search, Shield, ArrowRight } from "lucide-react";

// Brand support email (kept in sync with Footer/config)
// NOTE: theo yêu cầu mới của user, sử dụng eulotus.com@gmail.com
const SUPPORT_EMAIL = "eulotus.com@gmail.com"; // public contact only

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero - theo mẫu bazatify.com Help Center */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">How can we help you?</h1>
          <h2 className="text-lg text-muted-foreground font-medium">
            Our crew of superheroes are standing by for Help & Support!
          </h2>

          {/* Search functionality */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                className="w-full pl-10 pr-4 py-3 text-lg"
                placeholder="Search help topics"
                aria-label="Search help topics"
              />
              <Button 
                type="button" 
                variant="default" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
                size="sm"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Popular sections */}
          <div className="text-left max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground mb-2">"Popular sections:"</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                How Do I Change My Shipping Address?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer & Seller sections - theo mẫu bazatify.com */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buyer Section */}
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-xl">
              <Link to="/help/buyer" className="text-blue-600 hover:underline">
                Buyer
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-blue-600 hover:underline">
                  Shop with an expert
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-600 hover:underline">
                  How to Contact a Vendor
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-600 hover:underline">
                  How Do I Change My Shipping Address?
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-600 hover:underline">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link to={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
                  How to Contact Eulotus Support
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/help/buyer" className="text-sm text-blue-600 hover:underline font-medium">
                View More
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Seller Section */}
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-lg flex items-center justify-center">
              <LifeBuoy className="h-10 w-10 text-emerald-600" />
            </div>
            <CardTitle className="text-xl">
              <Link to="/help/seller" className="text-emerald-600 hover:underline">
                Seller
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-emerald-600 hover:underline">
                  Manage your account
                </Link>
              </li>
              <li>
                <Link to="/seller-registration" className="text-emerald-600 hover:underline">
                  How to become a vendor
                </Link>
              </li>
              <li>
                <Link to="/vendor-protection" className="text-emerald-600 hover:underline">
                  Vendor Protection Program
                </Link>
              </li>
              <li>
                <Link to="/marketplace-guidelines" className="text-emerald-600 hover:underline">
                  Marketplace Guidelines
                </Link>
              </li>
              <li>
                <Link to={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-600 hover:underline">
                  Contact Seller Support
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/help/seller" className="text-sm text-emerald-600 hover:underline font-medium">
                View More
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* FAQ accordion: keep content concise and skimmable */}
      <section aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="order-tracking">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, we email you a tracking link. You can also
              find it in the Orders page. If tracking is missing after 48 hours,
              contact us at{" "}
              <a
                className="text-blue-600 hover:underline"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 14 days of delivery for eligible items in
              original condition. For steps and exclusions, please see{" "}
              <Link
                className="text-blue-600 hover:underline"
                to="/shipping-returns"
              >
                Shipping & Returns
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refunds" id="refunds">
            <AccordionTrigger>When will I receive my refund?</AccordionTrigger>
            <AccordionContent>
              Refunds are issued to your original payment method within 5–10
              business days after we receive and inspect the returned item.
              Processing times may vary by bank.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payments">
            <AccordionTrigger>
              Which payment methods are supported?
            </AccordionTrigger>
            <AccordionContent>
              We support major credit/debit cards and popular digital wallets.
              Availability can vary by region. If a payment fails, try another
              method or contact your bank.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="account" id="account">
            <AccordionTrigger>
              How do I update my account details?
            </AccordionTrigger>
            <AccordionContent>
              Go to your account settings to update profile information,
              password, and addresses. For security, you may be asked to
              re‑authenticate before saving changes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact support CTA */}
      <section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <a href={`mailto:${SUPPORT_EMAIL}`}>
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </Button>
        </div>
      </section>

      {/* Bottom CTA: đồng bộ kiểu với SellerRegistration */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-8 text-center border border-blue-200/50 shadow-sm">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">We're here to help</Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team typically responds within 1–2 business days. Reach out and we’ll assist you as soon as possible.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-8">
            <a href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email support">
              Email {SUPPORT_EMAIL}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Your information is secure and will never be shared</span>
          </div>
        </div>
      </section>
    </div>
  );
}

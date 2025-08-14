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
      {/* Hero: đồng nhất với mẫu SellerRegistration (badge, tiêu đề, mô tả, hành động) */}
      {/* Lý do: tạo nhận diện nhất quán cho các trang general */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Help Center</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Find answers to common questions or contact our team.
          </p>

          {/* Quick search: giữ client-only, đồng nhất button/icon */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex w-full max-w-xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full pl-9"
                  placeholder="Search help topics (e.g., order, refund, shipping)"
                  aria-label="Search help topics"
                />
              </div>
              <Button type="button" variant="default" aria-label="Search help">
                Search
              </Button>
            </div>
          </div>

          {/* Trust indicator giống mẫu */}
          <div className="pt-4 flex justify-center">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-md text-sm inline-flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Secure support, responsive within 1–2 business days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links to common topics */}
      <section aria-labelledby="quick-links">
        <h2 id="quick-links" className="sr-only">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-white border-border/60 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Tracking, status updates, and order issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/account/orders"
                className="text-blue-600 hover:underline"
              >
                Go to Orders
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-border/60 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Shipping & Returns</CardTitle>
              <CardDescription>
                Delivery times, returns, and exchanges policy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/shipping-returns"
                className="text-blue-600 hover:underline"
              >
                View Policy
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-border/60 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Payments & Refunds</CardTitle>
              <CardDescription>
                Payment methods, charges, and refund timelines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href="#refunds" className="text-blue-600 hover:underline">
                See FAQs
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white border-border/60 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Account & Security</CardTitle>
              <CardDescription>
                Profile, password, and notification settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/account/profile"
                className="text-blue-600 hover:underline"
              >
                Manage Account
              </Link>
            </CardContent>
          </Card>
        </div>
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

      {/* Support section 3 cột: đồng bộ với mẫu SellerRegistration */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-background to-blue-50/30 rounded-lg border border-blue-100/50 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Need more information?</p>
            <p className="text-sm text-muted-foreground mb-2">
              We're here to help with any questions
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Email {SUPPORT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-background to-emerald-50/30 rounded-lg border border-emerald-100/50 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Support Center</p>
            <p className="text-sm text-muted-foreground mb-2">
              Dedicated support for all customers
            </p>
            <Link to="/help" className="text-sm text-emerald-600 hover:underline font-medium">
              Visit Help Center
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-background to-orange-50/30 rounded-lg border border-orange-100/50 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Community</p>
            <p className="text-sm text-muted-foreground mb-2">
              Connect with other users and share tips
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm text-orange-600 hover:underline font-medium"
            >
              Join Discussion
            </a>
          </div>
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

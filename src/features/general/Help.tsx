/**
 * Help page for users to find answers and contact support.
 * - English content per project requirement
 * - Uses shadcn components for consistent UI
 * - Keep layout responsive and accessible
 */
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Brand support email (kept in sync with Footer/config)
const SUPPORT_EMAIL = "support@eulotus.com"; // do not hardcode secrets; public contact only

export default function Help() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Hero section with quick search (non-indexed, client-only) */}
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-wide mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or contact our team.</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Input
            className="w-full max-w-xl"
            placeholder="Search help topics (e.g., order, refund, shipping)"
            aria-label="Search help topics"
          />
          <Button type="button" variant="default" aria-label="Search help">Search</Button>
        </div>
      </header>

      {/* Quick links to common topics */}
      <section aria-labelledby="quick-links" className="mb-10">
        <h2 id="quick-links" className="sr-only">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Tracking, status updates, and order issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/orders" className="text-blue-600 hover:underline">Go to Orders</Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Shipping & Returns</CardTitle>
              <CardDescription>Delivery times, returns, and exchanges policy.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/shipping-returns" className="text-blue-600 hover:underline">View Policy</Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Payments & Refunds</CardTitle>
              <CardDescription>Payment methods, charges, and refund timelines.</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="#refunds" className="text-blue-600 hover:underline">See FAQs</a>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Account & Security</CardTitle>
              <CardDescription>Profile, password, and notification settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="#account" className="text-blue-600 hover:underline">Manage Account</a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-6" />

      {/* FAQ accordion: keep content concise and skimmable */}
      <section aria-labelledby="faq" className="mb-12">
        <h2 id="faq" className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="order-tracking">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, we email you a tracking link. You can also find it in the Orders page. If tracking is missing after 48 hours, contact us at <a className="text-blue-600 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 14 days of delivery for eligible items in original condition. For steps and exclusions, please see <Link className="text-blue-600 hover:underline" to="/shipping-returns">Shipping & Returns</Link>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refunds" id="refunds">
            <AccordionTrigger>When will I receive my refund?</AccordionTrigger>
            <AccordionContent>
              Refunds are issued to your original payment method within 5–10 business days after we receive and inspect the returned item. Processing times may vary by bank.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payments">
            <AccordionTrigger>Which payment methods are supported?</AccordionTrigger>
            <AccordionContent>
              We support major credit/debit cards and popular digital wallets. Availability can vary by region. If a payment fails, try another method or contact your bank.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="account" id="account">
            <AccordionTrigger>How do I update my account details?</AccordionTrigger>
            <AccordionContent>
              Go to your account settings to update profile information, password, and addresses. For security, you may be asked to re‑authenticate before saving changes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact support panel */}
      <section aria-labelledby="contact" className="mb-4">
        <Card>
          <CardHeader>
            <CardTitle id="contact">Still need help?</CardTitle>
            <CardDescription>Our team is here to assist you.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button asChild variant="default">
              <a href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email support">Email {SUPPORT_EMAIL}</a>
            </Button>
            <span className="text-sm text-muted-foreground">We typically respond within 1–2 business days.</span>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


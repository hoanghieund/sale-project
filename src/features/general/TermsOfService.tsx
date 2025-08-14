import React from "react";

/**
 * Component to display the Terms of Service page.
 *
 * @returns {JSX.Element} The rendered TermsOfService component.
 * @constructor
 */
const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12" role="main" aria-label="Terms of Service">
      {/* Hero: đồng nhất với SellerRegistration (Badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex">
              <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-600 text-white">Legal</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Please read these terms carefully before using our website.
          </p>
        </div>
      </section>

      {/* Static Terms content - keep structure semantic and easy to scan */}
      <p className="text-sm text-gray-600">
        <span className="font-medium">Effective Date:</span> August 8, 2025
        <span className="mx-2">•</span>
        <span className="font-medium">Last Updated:</span> August 8, 2025
      </p>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using eulotus.com (“Website,” “we,” “us,” or “our”),
            you agree to be bound by these Terms of Service (“Terms”). If you do
            not agree, please do not use our Website.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years old (or the legal age in your
            jurisdiction) to make a purchase. By using our Website, you confirm
            that you meet these requirements.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Account Registration
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You may need to create an account to make purchases.</li>
            <li>
              You are responsible for keeping your login credentials
              confidential.
            </li>
            <li>We are not liable for any unauthorized use of your account.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Products and Pricing
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All prices are displayed in [currency, e.g., USD].</li>
            <li>
              Prices and product availability are subject to change without
              notice.
            </li>
            <li>We reserve the right to refuse or cancel any order.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Orders and Payment</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Payments are processed through [Payment Gateway Name(s)].</li>
            <li>
              You agree to provide accurate billing and shipping information.
            </li>
            <li>
              Orders may be cancelled if fraudulent or incomplete information is
              detected.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Shipping and Delivery
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Delivery times are estimates only.</li>
            <li>
              We are not responsible for delays caused by carriers or customs.
            </li>
            <li>Shipping fees and taxes are displayed at checkout.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">7. Returns and Refunds</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Please refer to our Return Policy at [Return Policy URL].</li>
            <li>
              Products must be returned in original condition unless defective.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            8. Intellectual Property
          </h2>
          <p>
            All content on eulotus.com, including text, graphics, logos, and
            images, is our property or licensed to us. You may not use it
            without permission.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Prohibited Activities
          </h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the Website for unlawful purposes.</li>
            <li>Interfere with its security or performance.</li>
            <li>Misrepresent your identity or payment details.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            10. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, we are not liable for
            indirect, incidental, or consequential damages arising from your use
            of the Website.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Country], without
            regard to conflict of law principles.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted
            on this page with the “Last Updated” date.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
          <p className="mb-1">If you have questions, contact us at:</p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:eulotus.com@gmail.com"
              className="text-blue-600 hover:underline"
            >
              eulotus.com@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;

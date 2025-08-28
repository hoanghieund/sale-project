import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders the Privacy Policy page.
 *
 * @returns {JSX.Element} The rendered Privacy Policy page.
 */
const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-0">
          {/* Dates section for effective and last updated times */}
          <div className="text-xs text-center space-y-1">
            <p>Effective Date: August 8, 2025</p>
            <p>Last Updated: August 8, 2025</p>
          </div>

          {/* 1. Introduction */}
          <h3 className="text-lg font-semibold">1. Introduction</h3>
          <p className="text-sm">
            eulotus.com (“we,” “us,” or “our”) respects your privacy and is
            committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, and safeguard your information.
          </p>

          {/* 2. Information We Collect */}
          <h3 className="text-lg font-semibold">2. Information We Collect</h3>
          <ul className="list-disc ml-4 space-y-1 text-sm">
            <li>
              <span className="font-medium">Personal Information:</span> Name,
              email, phone number, shipping address, billing address, payment
              details.
            </li>
            <li>
              <span className="font-medium">Non-Personal Information:</span> IP
              address, browser type, device information, browsing activity.
            </li>
            <li>
              Cookies: We use cookies to improve your browsing experience.
            </li>
          </ul>

          {/* 3. How We Use Your Information */}
          <h3 className="text-lg font-semibold">
            3. How We Use Your Information
          </h3>
          <p className="text-sm">We use your information to:</p>
          <ul className="list-disc ml-4 space-y-1 text-sm">
            <li>Process and deliver your orders.</li>
            <li>Improve our Website and services.</li>
            <li>
              Communicate with you regarding orders, promotions, or updates.
            </li>
            <li>Comply with legal obligations.</li>
          </ul>

          {/* 4. Sharing Your Information */}
          <h3 className="text-lg font-semibold">4. Sharing Your Information</h3>
          <p className="text-sm">
            We do not sell your personal information. We may share it with:
          </p>
          <ul className="list-disc ml-4 space-y-1 text-sm">
            <li>
              Service providers (e.g., payment processors, shipping companies).
            </li>
            <li>Legal authorities if required by law.</li>
            <li>Business partners with your consent.</li>
          </ul>

          {/* 5. Data Security */}
          <h3 className="text-lg font-semibold">5. Data Security</h3>
          <p className="text-sm">
            We use encryption, secure servers, and other measures to protect
            your information. However, no method of transmission over the
            Internet is 100% secure.
          </p>

          {/* 6. Your Rights */}
          <h3 className="text-lg font-semibold">6. Your Rights</h3>
          <p className="text-sm">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc ml-4 space-y-1 text-sm">
            <li>Access and request a copy of your data.</li>
            <li>Correct or delete your personal information.</li>
            <li>Opt out of marketing emails.</li>
          </ul>

          {/* 7. Cookies and Tracking */}
          <h3 className="text-lg font-semibold">7. Cookies and Tracking</h3>
          <p className="text-sm">
            You can manage cookies through your browser settings. Some features
            of the Website may not function properly without cookies.
          </p>

          {/* 8. Third-Party Links */}
          <h3 className="text-lg font-semibold">8. Third-Party Links</h3>
          <p className="text-sm">
            Our Website may contain links to third-party websites. We are not
            responsible for their privacy practices.
          </p>

          {/* 9. Children's Privacy */}
          <h3 className="text-lg font-semibold">9. Children&apos;s Privacy</h3>
          <p className="text-sm">
            We do not knowingly collect personal data from children under 13 (or
            the applicable age in your country).
          </p>

          {/* 10. Changes to Privacy Policy */}
          <h3 className="text-lg font-semibold">
            10. Changes to Privacy Policy
          </h3>
          <p className="text-sm">
            We may update this Privacy Policy from time to time. Any changes
            will be posted with the updated date.
          </p>

          {/* 11. Contact Us */}
          <h3 className="text-lg font-semibold">11. Contact Us</h3>
          <p className="text-sm">
            📧 Email:{" "}
            <a
              href="mailto:contact.eulotus@gmail.com"
              className="text-primary hover:underline"
            >
              contact.eulotus@gmail.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;

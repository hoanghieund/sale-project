import { Facebook, Instagram, Mail } from "lucide-react";
// Pinterest icon sẽ được thay thế bằng một icon tương tự
import { Link } from "react-router-dom";

/**
 * Footer links configuration - giữ nguyên các links hiện tại, chỉ tổ chức lại layout
 */
export const FOOTER_LINKS = {
  getToKnowUs: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  customerService: [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/faq" },
  ],
  ordersReturns: [
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  quickLinks: [{ label: "Terms of Service", href: "/terms-of-service" }],
};

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-white text-gray-800 py-8 border-t">
        <div className="container mx-auto px-4">
          {/* 4-column grid layout như trong hình */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Get to Know Us
              </h3>
              <ul className="space-y-2 mb-6">
                {FOOTER_LINKS.getToKnowUs.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mb-2">
                <Link
                  to="https://www.instagram.com/eulotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  to="https://www.facebook.com/eulotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  to="https://www.pinterest.com/eulotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {/* Sử dụng Mail icon thay cho Pinterest vì lucide-react không có Pinterest */}
                  <Mail className="h-5 w-5" />
                </Link>
              </div>

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" aria-label="Home">
                  <img
                    src="/logo.png"
                    alt="Eulotus Logo"
                    className="h-16 w-20"
                  />
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Customer Service
              </h3>
              <ul className="space-y-2">
                {FOOTER_LINKS.customerService.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Orders & Returns */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Orders & Returns
              </h3>
              <ul className="space-y-2">
                {FOOTER_LINKS.ordersReturns.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
              <ul className="space-y-2">
                {FOOTER_LINKS.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

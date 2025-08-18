import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Footer links configuration - theo cấu trúc bazatify.com
 * Chuẩn hóa cho Eulotus marketplace
 */
export const FOOTER_LINKS = {
  getToKnowUs: [
    { label: "About Us", href: "/about" },
    { label: "Vendor List", href: "/vendors" },
    { label: "FAQs", href: "/faq" },
  ],
  customerService: [
    { label: "Become a Vendor", href: "/seller-registration" },
    { label: "Help Center", href: "/help" },
    { label: "Buyer Protection", href: "/buyer-protection" },
    { label: "Authenticate", href: "/authenticate" },
    { label: "Vendor Protection Program", href: "/vendor-protection" },
  ],
  ordersReturns: [
    { label: "Returns & Refunds", href: "/shipping-returns" },
    { label: "Shipping Policy", href: "/shipping-returns" },
    // { label: "Track Order", href: "/account/orders" },
    { label: "Contact Us", href: "/contact" },
  ],
  quickLinks: [
    { label: "Legal", href: "/privacy-policy" },
    { label: "Prohibited Items", href: "/prohibited-items" },
    { label: "Marketplace Guidelines", href: "/marketplace-guidelines" },
    { label: "Intellectual Property Policy", href: "/terms-of-service" },
  ],
};

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-white text-gray-800 py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          {/* 4-column grid layout như trong hình */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Get to Know Us
              </h3>
              <ul className="space-y-2">
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

          {/* Bottom Bar với social icons và DMCA */}
          <div className="border-t border-gray-200 mt-8 pt-6 md:pt-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link to="/" aria-label="Home">
                <img
                  src="/logo.png"
                  alt="Eulotus Logo"
                  className="h-16 w-auto"
                />
              </Link>
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
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
                  to="https://www.twitter.com/eulotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>

              {/* Logo */}
              <div className="flex items-center gap-2">
                {/* React dùng className thay cho class trong TSX */}
                <a
                  href="//www.dmca.com/Protection/Status.aspx?ID=6cd73652-1377-457b-9ad2-1f66fe0c9ddc"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                >
                  <img
                    src="https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=6cd73652-1377-457b-9ad2-1f66fe0c9ddc"
                    alt="DMCA.com Protection Status"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../../data/constants";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log("Newsletter subscription:", email);
      setEmail("");
      // Show success message
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold tracking-wide">
            SIGN UP TO OUR NEWSLETTER
          </h2>
          <p className="text-white/90 mb-2 max-w-lg mx-auto">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/90 text-black rounded-full border-transparent focus-visible:ring-offset-white"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full hover:bg-secondary/90 transition-colors duration-200"
            >
              Subscribe
            </Button>
          </form>
          <div className="flex justify-center gap-4 mt-2">
            <Link
              to="https://www.instagram.com/shopofficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              to="https://www.facebook.com/shopofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              to="https://www.twitter.com/shopofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <div className="text-2xl font-bold">
                  <span>SHOP</span>
                  <div className="text-xs text-white/70 font-normal tracking-widest">
                    PREMIUM
                  </div>
                </div>
              </Link>
              <p className="text-white/80 mb-4 leading-relaxed">
                <strong>Shop</strong> is a premium online marketplace for
                high-quality products, offering exclusive collections and
                limited editions. Our products are guaranteed to be 100%
                authentic or your money back.
              </p>
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200">
                <Mail className="h-4 w-4" />
                <span>Email: support@shop.com</span>
              </div>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-semibold mb-3 text-white">HELP</h3>
              <ul className="space-y-1.5 text-white/80">
                {FOOTER_LINKS.help.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Links */}
            <div>
              <h3 className="font-semibold mb-3 text-white">POLICY</h3>
              <ul className="space-y-1.5 text-white/80">
                {FOOTER_LINKS.policy.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; 2025 Shop.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

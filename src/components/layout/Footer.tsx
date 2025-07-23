import { Facebook, Instagram, Mail, Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../../data/constants";
import { useState } from "react";

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
      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-sport-dark mb-4" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Fast delivery estimated 5-8 days.</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-12 w-12 text-sport-dark mb-4" />
              <h3 className="font-semibold mb-2">30 Days Returns</h3>
              <p className="text-sm text-muted-foreground">Refund if the product is defective.</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-sport-dark mb-4" />
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">with SSL 256-bit encryption.</p>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="h-12 w-12 text-sport-dark mb-4" />
              <h3 className="font-semibold mb-2">Local Support</h3>
              <p className="text-sm text-muted-foreground">Quick support for your problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-sport-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">SIGN UP TO OUR NEWSLETTER</h2>
          <p className="text-white/80 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black"
              required
            />
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </form>
          <div className="flex justify-center gap-4 mt-6">
            <Link to="https://www.instagram.com/donekick/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-white hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="https://www.facebook.com/donekickstore" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-white hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <div className="text-2xl font-bold">
                  <span>DONEKICK</span>
                  <div className="text-xs text-white/60 font-normal">SPORTS</div>
                </div>
              </Link>
              <p className="text-white/80 mb-4">
                <strong>Donekick</strong> is an online marketplace footwear platform for buying and selling sought-after sneakers, new releases, or limited edition footwear. Our products are guaranteed to be 100% authentic or your money back.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>Email: support@donekick.com</span>
              </div>
            </div>

            {/* Shopping Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">SHOPPING</h3>
              <ul className="space-y-2 text-white/80">
                {FOOTER_LINKS.shopping.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">HELP</h3>
              <ul className="space-y-2 text-white/80">
                {FOOTER_LINKS.help.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">POLICY</h3>
              <ul className="space-y-2 text-white/80">
                {FOOTER_LINKS.policy.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60">
            <p>&copy; 2025 Donekick.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">
                Terms Of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

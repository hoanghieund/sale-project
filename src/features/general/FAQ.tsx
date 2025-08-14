import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I know if a product is authentic?",
    answer:
      "Every product on DoneKick undergoes a rigorous authentication process conducted by expert authenticators. We use advanced techniques including material analysis, construction examination, and comparison with authentic reference materials. All products come with a certificate of authenticity, and we offer a 100% authenticity guarantee or your money back.",
    category: "Authentication",
  },
  {
    id: "2",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unworn items in their original packaging with all tags attached. Items must be in the same condition as when received. Custom or personalized items cannot be returned unless defective. Return shipping costs are the responsibility of the customer unless the item was damaged or incorrect.",
    category: "Returns & Refunds",
  },
  {
    id: "3",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-8 business days within the United States. Express shipping (2-3 business days) and overnight shipping options are available at checkout. International shipping times vary by destination, typically 7-14 business days. All orders are processed within 1-2 business days.",
    category: "Shipping",
  },
  {
    id: "4",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination. Customers are responsible for any customs duties, taxes, or fees imposed by their country. Some restricted items may not be available for international shipping.",
    category: "Shipping",
  },
  {
    id: "5",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. You can also view your order status by logging into your account and visiting the 'My Orders' section.",
    category: "Orders",
  },
  {
    id: "6",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely using SSL encryption. We do not store your payment information on our servers.",
    category: "Payment",
  },
  {
    id: "7",
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be canceled or modified within 1 hour of placement, provided they haven't entered the fulfillment process. After this window, we cannot guarantee changes. Contact our customer service team immediately if you need to make changes to your order.",
    category: "Orders",
  },
  {
    id: "8",
    question: "How do I become a vendor on DoneKick?",
    answer:
      "We welcome applications from reputable sellers. To become a vendor, you must meet our requirements including business registration, inventory verification, and authentication standards. Contact us through our vendor application form, and our team will review your application within 5-7 business days.",
    category: "Vendors",
  },
  {
    id: "9",
    question: "What if I receive a damaged item?",
    answer:
      "If you receive a damaged item, please contact us within 48 hours of delivery with photos of the damage. We'll provide a prepaid return label and either replace the item or issue a full refund. Our team will investigate the issue and work with our shipping partners to prevent future occurrences.",
    category: "Returns & Refunds",
  },
  {
    id: "10",
    question: "Do you have a size guide?",
    answer:
      "Yes, each product page includes detailed sizing information. We also have a comprehensive size guide that covers different brands and their sizing variations. Keep in mind that sizing can vary between brands and even different models from the same brand. When in doubt, we recommend going with your most commonly worn size.",
    category: "Sizing",
  },
  {
    id: "11",
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team via email at eulotus.com@gmail.com. We typically respond to emails within 24 hours.",
    category: "Support",
  },
  {
    id: "12",
    question: "Do you offer price matching?",
    answer:
      "We strive to offer competitive prices but do not currently offer price matching. Our prices reflect the authenticity guarantee, quality assurance, and customer service we provide. We regularly review our pricing to ensure we're offering fair market value for authentic products.",
    category: "Pricing",
  },
];

const categories = [
  "All",
  "Authentication",
  "Shipping",
  "Returns & Refunds",
  "Orders",
  "Payment",
  "Vendors",
  "Sizing",
  "Support",
  "Pricing",
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero: đồng nhất với SellerRegistration (Badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              FAQ
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6">
            Find answers to common questions about authentication, shipping,
            returns, and more.
          </p>
        </div>
      </section>

      {/* Search and Filter: giữ logic, chuẩn hoá khối */}
      <section className="bg-background rounded-lg border border-border/50 p-8 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 py-1 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section>
        <div className="max-w-6xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No FAQs found matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <Card key={faq.id} className="bg-white border-border/60">
                  <CardContent className="p-0">
                    {/* Toggle câu hỏi/đáp án: giữ logic cũ */}
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-sm">
                            {faq.question}
                          </h3>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    {expandedItems.includes(faq.id) && (
                      <div className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA: đồng nhất với các trang general khác */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-6 text-center border border-blue-200/50">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-3 text-xs">
          Need more help?
        </Badge>
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Still have questions?
        </h2>
        <p className="text-muted-foreground mb-4 max-w-2xl mx-auto text-sm">
          Can't find the answer you're looking for? Our customer support team is
          here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button size="lg">Contact Support</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

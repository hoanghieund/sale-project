import { Axios } from "@/api/Axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  LifeBuoy,
  Lock,
  Mail,
  Megaphone,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * @component SellerRegistration
 * @description React component to display the seller registration page.
 * Includes title, policy list, submit button and policy links.
 */

const SellerRegistration: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const isRoleShop = !!user?.roles?.find(role => {
    return role.name === "ROLE_SHOP_MANAGER";
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // State cho dialog và form
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shopName, setShopName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Seller success stories
  const testimonials = [
    {
      quote:
        "Joining Eulotus was the best business decision I made. My sales increased by 230% in just 3 months!",
      name: "Minh Nguyen",
      role: "Handcrafted Jewelry Seller",
      rating: 5,
    },
    {
      quote:
        "The platform's tools made it easy to reach new customers. I went from local sales to international shipping in weeks.",
      name: "Sarah Johnson",
      role: "Organic Skincare Vendor",
      rating: 5,
    },
  ];

  // Registration steps
  const registrationSteps = [
    {
      title: "Create Account",
      description: "Sign up for an Eulotus account with your email",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Submit Information",
      description: "Provide your shop details and product categories",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Verification",
      description: "We'll review your application within 24-48 hours",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Start Selling",
      description: "Set up your shop and list your first products",
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  // Function to handle the "Submit Registration Request" button click
  const handleClick = () => {
    // Check if userId exists
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isRoleShop) {
      navigate("/seller/shop");
      return;
    }
    // Mở dialog form
    setDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate shop name
    if (!shopName.trim()) {
      toast({
        title: "Error",
        description: "Shop name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current domain for URLs
      const currentDomain = window.location.origin;

      // Call API
      const response = await Axios.post(`/api/public/shop/register-request`, {
        shopName: shopName.trim(),
        frontendManageUrlBase: `${currentDomain}/seller/shop`,
        backendActivateUrlBase:
          "https://api.eulotus.com/api/public/shop/activate",
      });

      setDialogOpen(false);
      setShopName("");

      toast({
        title: "Success",
        description:
          "Your registration request has been submitted successfully! Please check your email to activate your shop within 24 hours.",
      });
    } catch (error) {
      console.error("Error calling API:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while submitting your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      {/* Dialog form đăng ký shop */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register Your Shop</DialogTitle>
            <DialogDescription>
              Please enter your shop information to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shopName" className="text-right">
                Shop name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shopName"
                value={shopName}
                onChange={e => setShopName(e.target.value)}
                className="col-span-3"
                placeholder="Enter your shop name"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !shopName.trim()}
            >
              {isSubmitting ? "Processing..." : "Register"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Hero section with more compelling elements */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              Limited Time Offer
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Become a Seller on Eulotus
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Join <span className="font-bold text-foreground">10,000+</span>{" "}
            successful vendors already selling on our platform
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Free registration</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>No monthly fees</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>24/7 support</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
            <Button
              size="lg"
              onClick={handleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              Start selling today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link
              to="/privacy-policy"
              className="text-sm text-primary underline"
            >
              View terms & privacy
            </Link>
          </div>

          <div className="pt-6 flex justify-center">
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-md text-sm inline-flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>
                Early adopter benefits end in 7 days! Register now to lock in
                lower fees.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration progress steps */}
      <section className="bg-background rounded-lg border border-border/50 p-8 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Simple 4-Step Registration Process
          </h2>
          <p className="text-muted-foreground">
            Most sellers get approved within 48 hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {registrationSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    index < 2
                      ? "bg-emerald-100"
                      : index === 2
                      ? "bg-blue-100"
                      : "bg-muted"
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="mt-4 font-medium text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {step.description}
                </p>

                {index < registrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-muted">
                    {index < 2 && (
                      <div className="h-full bg-emerald-600 w-full"></div>
                    )}
                    {index === 2 && (
                      <div className="h-full bg-blue-600 w-[50%]"></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success metrics section */}
      <section className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white border-blue-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-blue-600">
              10K+
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Active Sellers</p>
            <p className="text-sm text-muted-foreground">
              Join our growing community
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-orange-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-orange-600">
              $2.5K
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Avg. Monthly Sales</p>
            <p className="text-sm text-muted-foreground">
              For established sellers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-yellow-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-yellow-600">
              2.5%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Transaction Fee</p>
            <p className="text-sm text-muted-foreground">
              Industry-leading low rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-emerald-600">
              48hrs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Approval Time</p>
            <p className="text-sm text-muted-foreground">Fast review process</p>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials section */}
      <section className="bg-muted/30 rounded-lg p-8 border border-border/50">
        <div className="text-center mb-8">
          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white mb-4">
            Success Stories
          </Badge>
          <h2 className="text-2xl font-bold">What Our Sellers Say</h2>
          <p className="text-muted-foreground">
            Real stories from successful Eulotus sellers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-border/50 shadow-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits section with enhanced visuals */}
      <section>
        <div className="text-center mb-8">
          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white mb-4">
            Why Choose Eulotus
          </Badge>
          <h2 className="text-2xl font-bold">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground">
            Powerful tools and features designed for seller success
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-full bg-white border-emerald-100/50 shadow-sm">
            <CardHeader className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Maximize Your Profits</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                List your products for free and sell directly to customers with
                no middleman fees.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Average 40% profit increase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full bg-white border-blue-100/50 shadow-sm">
            <CardHeader className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Complete Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Comprehensive policies and dedicated support team to protect
                vendors and customers.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>99.9% secure transactions</span>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full bg-white border-orange-100/50 shadow-sm">
            <CardHeader className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Flexible Payments</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Choose from multiple payment methods that fit your business
                operations perfectly.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-medium">
                <Clock className="h-4 w-4" />
                <span>Daily payouts available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fees & Security section: đơn giản, minh bạch, an toàn */}
      <section>
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Simple, Transparent, Secure
          </h2>
          <p className="text-muted-foreground">
            We process transactions on a secure, SSL-256-bit encrypted platform
            backed by security experts and fraud detection systems.
          </p>
        </div>
        {/* Trust indicators */}
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50 mb-8">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 text-sm">
            <div className="flex items-center gap-2 text-emerald-600">
              <Lock className="h-4 w-4" />
              <span className="font-medium">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Daily automatic payouts</span>
            </div>
            <div className="flex items-center gap-2 text-orange-600">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Full seller protection</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-600">
              <Award className="h-4 w-4" />
              <span className="font-medium">No hidden monthly fees</span>
            </div>
          </div>
        </div>

        {/* Enhanced pricing cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <Card className="bg-white border-blue-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-md">
              Free
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Listing Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">$0</p>
              <p className="text-sm text-muted-foreground mt-2">
                List as many products as you want with no listing fees.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-emerald-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-3 py-1 rounded-bl-md">
              Best Value
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-emerald-600">2.5%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Industry-leading low commission fee for each completed order.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs px-3 py-1 rounded-bl-md">
              Optional
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Offsite Ads Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-600">5%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Only applies when you enable Offsite Ads for additional
                exposure.
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Ghi chú phí bổ sung giống trang tham chiếu */}
        <p className="text-xs text-muted-foreground mt-4">
          * Offsite Ads is optional. The 5% service fee applies only when you
          enable Offsite Ads.
        </p>
      </section>

      {/* Reach customers section with enhanced visuals */}
      <section className="grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-5">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-2">
            Marketing Tools
          </Badge>
          <h3 className="text-xl md:text-2xl font-bold">
            Reach millions of customers
          </h3>
          <p className="text-muted-foreground">
            Build your brand with powerful tools: set up ad channels (Google,
            Facebook), control your marketing, and optimize performance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Megaphone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Expand Reach</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reach 5x more potential customers with our marketing tools
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <span className="font-medium">Boost Sales</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sellers see an average 40% increase in sales within 3 months
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Grow Community</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build a loyal customer base with our community tools
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Detailed insights to optimize your product listings
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-8 text-center border border-blue-200/50 shadow-sm">
          <div className="inline-block bg-blue-600 text-white p-3 rounded-full mb-4">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h4 className="text-2xl font-bold mb-2">Ready to start selling?</h4>
          <p className="text-muted-foreground mb-6">
            Join 10,000+ sellers already growing their business on Eulotus
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleClick}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              Open your shop today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Early adopter benefits:
              </span>{" "}
              Lower fees, priority support, and featured placement
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Support section with enhanced visuals */}
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
            <Link
              to="/contact"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-background to-emerald-50/30 rounded-lg border border-emerald-100/50 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Seller Support Center</p>
            <p className="text-sm text-muted-foreground mb-2">
              Dedicated support for all sellers
            </p>
            <Link
              to="/help"
              className="text-sm text-emerald-600 hover:underline font-medium"
            >
              Visit Help Center
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-background to-orange-50/30 rounded-lg border border-orange-100/50 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Seller Community</p>
            <p className="text-sm text-muted-foreground mb-2">
              Connect with other successful sellers
            </p>
            <a
              href="mailto:contact.eulotus@gmail.com"
              className="text-sm text-orange-600 hover:underline font-medium"
            >
              Join Discussion
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA with enhanced visuals */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg p-8 text-center border border-blue-200/50 shadow-sm">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">
          Limited Time Offer
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start your seller journey today
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of successful sellers on Eulotus and turn your passion
          into profit with our powerful selling tools and supportive community.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-8"
          >
            Start selling now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-sm text-muted-foreground mt-2">
            By submitting your request, you agree to our{" "}
            <Link to="/terms-of-service" className="text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>
            .
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Your information is secure and will never be shared</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerRegistration;

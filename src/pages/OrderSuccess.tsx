import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const OrderSuccess = () => {
  // Generate a mock order number
  const orderNumber = `DK${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-medium">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-6">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Order Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation shortly with your order details.
                </p>
              </div>
              <div className="text-center">
                <Package className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your order for shipment within 1-2 business days.
                </p>
              </div>
              <div className="text-center">
                <Truck className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Your order will be shipped and you'll receive tracking information.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/account/orders">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Order History
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-3">Important Information</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                • All products are guaranteed to be 100% authentic or your money back
              </p>
              <p>
                • Free returns within 30 days of delivery
              </p>
              <p>
                • Orders over $100 qualify for free shipping
              </p>
              <p>
                • Customer support is available 24/7 to assist you
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;

import { Button } from "@/components/ui/button";
import PolicyInfoCard from "@/features/users/product-detail/components/PolicyInfoCard";
import { CheckCircle, Mail, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  // Generate a mock order number
  const orderNumber = `DK${Date.now().toString().slice(-6)}`;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully
            placed.
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
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PolicyInfoCard
              icon={<Mail className="h-12 w-12 text-primary mx-auto mb-3" />}
              title="Xác nhận đơn hàng"
              description="Bạn sẽ nhận được email xác nhận đơn hàng trong thời gian ngắn."
            />
            <PolicyInfoCard
              icon={<Package className="h-12 w-12 text-accent mx-auto mb-3" />}
              title="Đang xử lý"
              description="Chúng tôi sẽ chuẩn bị đơn hàng của bạn để vận chuyển trong vòng 1-2 ngày làm việc."
            />
            <PolicyInfoCard
              icon={<Truck className="h-12 w-12 text-primary mx-auto mb-3" />}
              title="Vận chuyển"
              description="Đơn hàng của bạn sẽ được vận chuyển và bạn sẽ nhận được thông tin theo dõi."
            />
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
            Need help?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-3">Important Information</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              • All products are guaranteed to be 100% authentic or your money
              back
            </p>
            <p>• Free returns within 30 days of delivery</p>
            <p>• Orders over $100 qualify for free shipping</p>
            <p>• Customer support is available 24/7 to assist you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

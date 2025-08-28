import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TrackOrderForm from "./components/TrackOrderForm";

/**
 * TrackOrderPage - Trang theo dõi đơn hàng
 * 
 * Cho phép người dùng theo dõi đơn hàng bằng cách nhập mã đơn hàng hoặc mã vận đơn
 * Thiết kế dựa trên tham khảo từ trang 17TRACK
 */
const TrackOrderPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Track Your Order</CardTitle>
          <CardDescription className="mt-2">
            Please use the tracking form below to enter your tracking number and track your order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Thông tin bổ sung về theo dõi đơn hàng */}
          <div className="mb-8 text-sm text-muted-foreground space-y-4">
            <p>
              Note that not all items are updated in real time with tracking, and there might be delays due to carrier processing times.
            </p>
            <p>
              Also note that if your order was placed within a few days, it might not be reflected yet in the tracking. This does not mean there is a problem or your order wasn't shipped. It can take several days for the shipping information to be updated in the online tracking system.
            </p>
            <p>
              If you'd like us to give you an update on your order, then just email our team at{" "}
              <a href="mailto:support@eulotus.com" className="text-primary hover:underline">
                support@eulotus.com
              </a>
              .
            </p>
          </div>

          {/* Form theo dõi đơn hàng */}
          <TrackOrderForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrderPage;

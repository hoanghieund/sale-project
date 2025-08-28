import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * TrackOrderForm - Component form theo dõi đơn hàng
 * 
 * Cho phép người dùng nhập thông tin đơn hàng hoặc mã vận đơn để theo dõi
 * Hỗ trợ hai phương thức theo dõi: theo mã đơn hàng hoặc theo mã vận đơn
 */
const TrackOrderForm = () => {
  // State để lưu trữ thông tin đơn hàng
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTab, setActiveTab] = useState("order-number");

  // Hàm xử lý khi người dùng nhấn nút Track
  const handleTrack = () => {
    if (activeTab === "order-number") {
      console.log("Tracking by order number:", orderNumber, "and email:", email);
      // TODO: Implement API call to track by order number
      alert(`Tracking order: ${orderNumber} with email: ${email}`);
    } else {
      console.log("Tracking by tracking number:", trackingNumber);
      // TODO: Implement API call to track by tracking number
      alert(`Tracking shipment with tracking number: ${trackingNumber}`);
    }
  };

  return (
    <div className="mt-6">
      <Tabs defaultValue="order-number" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="order-number">Order Number</TabsTrigger>
          <TabsTrigger value="tracking-number">Tracking Number</TabsTrigger>
        </TabsList>
        
        <TabsContent value="order-number" className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="order-number" className="text-sm font-medium">
              Order Number
            </label>
            <Input
              id="order-number"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tracking-number" className="mt-4">
          <div className="space-y-2">
            <label htmlFor="tracking-number" className="text-sm font-medium">
              Tracking Number
            </label>
            <Input
              id="tracking-number"
              placeholder="Enter your tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <div className="mt-6">
          <Button 
            onClick={handleTrack} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            TRACK
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default TrackOrderForm;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderList from "@/features/users/account-management/components/OrderList";
import React, { useState } from "react";

/**
 * @function OrderTabs
 * @description Component displaying order status tabs and passing the selected status to OrderList.
 * @returns {JSX.Element} Component OrderTabs.
 */
const OrderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending_confirmation">
          Pending Confirmation
        </TabsTrigger>
        <TabsTrigger value="awaiting_pickup">Awaiting Pickup</TabsTrigger>
        <TabsTrigger value="in_delivery">In Delivery</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <OrderList status="all" />
      </TabsContent>
      <TabsContent value="pending_confirmation">
        <OrderList status="0" />
      </TabsContent>
      <TabsContent value="awaiting_pickup">
        <OrderList status="1" />
      </TabsContent>
      <TabsContent value="in_delivery">
        <OrderList status="2" />
      </TabsContent>
      <TabsContent value="completed">
        <OrderList status="3" />
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;

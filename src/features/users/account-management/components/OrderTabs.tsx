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
      {/*
       * Responsive TabsList (no-scroll):
       * - xs: grid 2 cột, cho phép xuống dòng nhãn dài, giữ chiều cao đồng nhất
       * - sm: grid 3 cột
       * - md+: grid 5 cột như desktop
       */}
      <TabsList className="grid w-full grid-cols-2 gap-2 p-1 !h-auto sm:grid-cols-3 md:grid-cols-5">
        <TabsTrigger
          value="all"
          className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="pending_confirmation"
          className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
          aria-label="Pending Confirmation"
        >
          {/* Hiển thị nhãn rút gọn ở mobile để gọn gàng, nhãn đầy đủ ở sm+ */}
          <span className="sm:hidden">Pending Conf.</span>
          <span className="hidden sm:inline">Pending Confirmation</span>
        </TabsTrigger>
        <TabsTrigger
          value="awaiting_pickup"
          className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
          aria-label="Awaiting Pickup"
        >
          <span className="sm:hidden">Pickup</span>
          <span className="hidden sm:inline">Awaiting Pickup</span>
        </TabsTrigger>
        <TabsTrigger
          value="in_delivery"
          className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
          aria-label="In Delivery"
        >
          <span className="sm:hidden">Delivery</span>
          <span className="hidden sm:inline">In Delivery</span>
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
          aria-label="Completed"
        >
          <span className="sm:hidden">Done</span>
          <span className="hidden sm:inline">Completed</span>
        </TabsTrigger>
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

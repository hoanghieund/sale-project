import OrderList from "@/features/users/account-management/components/OrderList";
import React, { useState } from "react";

/**
 * @function OrderTabs
 * @description Component hiển thị các tab trạng thái đơn hàng và truyền trạng thái được chọn tới OrderList.
 * @returns {JSX.Element} Component OrderTabs.
 */
const OrderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    // <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
    //   <TabsList className="grid w-full grid-cols-5">
    //     <TabsTrigger value="all">Tất cả</TabsTrigger>
    //     <TabsTrigger value="pending_confirmation">Chờ xác nhận</TabsTrigger>
    //     <TabsTrigger value="awaiting_pickup">Chờ lấy hàng</TabsTrigger>
    //     <TabsTrigger value="in_delivery">Đang giao</TabsTrigger>
    //     <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="all">
    //     <OrderList status="all" />
    //   </TabsContent>
    //   <TabsContent value="pending_confirmation">
    //     <OrderList status="pending_confirmation" />
    //   </TabsContent>
    //   <TabsContent value="awaiting_pickup">
    //     <OrderList status="awaiting_pickup" />
    //   </TabsContent>
    //   <TabsContent value="in_delivery">
    //     <OrderList status="in_delivery" />
    //   </TabsContent>
    //   <TabsContent value="completed">
    //     <OrderList status="completed" />
    //   </TabsContent>
    // </Tabs>
    <OrderList status="all" />
  );
};

export default OrderTabs;

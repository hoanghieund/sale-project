// src/features/users/account-management/pages/OrderHistoryPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import OrderTabs from "../components/OrderTabs"; // OrderTabs will contain OrderList inside

/**
 * @component OrderHistoryPage
 * @description Page displaying user order history.
 * Includes tabs to filter order status and a list of orders.
 */
const OrderHistoryPage: React.FC = () => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Order History</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        {/* OrderTabs already includes OrderList inside */}
        <OrderTabs />
      </CardContent>
    </Card>
  );
};

export default OrderHistoryPage;

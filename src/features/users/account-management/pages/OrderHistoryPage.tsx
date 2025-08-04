// src/features/users/account-management/pages/OrderHistoryPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import OrderTabs from "../components/OrderTabs"; // OrderTabs sẽ chứa OrderList bên trong

/**
 * @component OrderHistoryPage
 * @description Trang hiển thị lịch sử đơn hàng của người dùng.
 * Bao gồm các tab để lọc trạng thái đơn hàng và danh sách các đơn hàng.
 */
const OrderHistoryPage: React.FC = () => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Lịch sử đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        {/* OrderTabs đã bao gồm OrderList bên trong */}
        <OrderTabs />
      </CardContent>
    </Card>
  );
};

export default OrderHistoryPage;

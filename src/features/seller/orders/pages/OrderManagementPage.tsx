/**
 * @fileoverview Seller order management page.
 * Displays the order list with status-filtered tabs.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/types";
import OrderTable from "../components/OrderTable";

/**
 * @function OrderManagementPage
 * @description Seller order management page.
 * @returns {JSX.Element} OrderManagementPage component.
 */
const OrderManagementPage = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          View and manage all orders of your shop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Seller tabs synced with the user's OrderTabs: 5 statuses */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 gap-2 p-1 !h-auto sm:grid-cols-3 lg:grid-cols-6">
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
            <TabsTrigger
              value="cancelled"
              className="w-full justify-center !whitespace-normal break-words !h-auto min-h-[40px] px-2 text-sm leading-snug"
              aria-label="Cancelled"
            >
              <span className="sm:hidden">Cancel</span>
              <span className="hidden sm:inline">Cancelled</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <OrderTable status={OrderStatus.ALL} />
          </TabsContent>
          <TabsContent value="pending_confirmation">
            {/* Map to enum PENDING_CONFIRMATION */}
            <OrderTable status={OrderStatus.PENDING_CONFIRMATION} />
          </TabsContent>
          <TabsContent value="awaiting_pickup">
            {/* Map to enum AWAITING_PICKUP (confirmed - awaiting pickup) */}
            <OrderTable status={OrderStatus.AWAITING_PICKUP} />
          </TabsContent>
          <TabsContent value="in_delivery">
            {/* Map to enum IN_DELIVERY (processing/delivery) */}
            <OrderTable status={OrderStatus.IN_DELIVERY} />
          </TabsContent>
          <TabsContent value="completed">
            {/* Map to enum COMPLETED (finalized) */}
            <OrderTable status={OrderStatus.COMPLETED} />
          </TabsContent>
          <TabsContent value="cancelled">
            {/* Map to enum CANCELLED */}
            <OrderTable status={OrderStatus.CANCELLED} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderManagementPage;

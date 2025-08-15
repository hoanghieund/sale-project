import CustomPagination from "@/components/common/CustomPagination";
import OrderStatusBadge from "@/components/common/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderStatus } from "@/types";
import { formatCurrencyUSD, formatDate } from "@/utils/formatters"; // format currency for display (USD) + date formatter
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Eye,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";

interface OrderTableProps {
  status?: OrderStatus; // Order status filter (ALL | 0-3 enum)
}

const OrderTable: React.FC<OrderTableProps> = ({
  status = OrderStatus.ALL,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  // Date filter state in YYYY-MM-DD to sync with API
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  // UI state for DateRange (shadcn Calendar)
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  // Responsive: số tháng hiển thị của Calendar theo breakpoint (mobile 1, desktop 2)
  const [calendarMonths, setCalendarMonths] = useState<number>(2);
  useEffect(() => {
    // Theo dõi thay đổi kích thước màn hình để cập nhật số tháng
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCalendarMonths(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Pagination: base-0 for API, base-1 for UI
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 20,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Persist applied filters (avoid losing filters when paging)
  const [appliedFilters, setAppliedFilters] = useState<{
    code?: string;
    fromDate?: string;
    toDate?: string;
  }>({});

  // Helper: convert Date -> YYYY-MM-DD (local) to sync with API
  const toYMD = (d: Date) => {
    // Adjust timezone to avoid off-by-one due to UTC
    const tz = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tz).toISOString().slice(0, 10);
  };

  // Sync calendar UI from fromDate/toDate values (when reset or reloaded)
  useEffect(() => {
    if (fromDate || toDate) {
      setDateRange({
        from: fromDate ? new Date(fromDate) : undefined,
        to: toDate ? new Date(toDate) : undefined,
      });
    } else {
      setDateRange(undefined);
    }
  }, [fromDate, toDate]);

  // Reset to first page when switching status tab
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 0 }));
  }, [status]);

  // Fetch orders when: status | page | pageSize | appliedFilters change
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const numericStatus =
          status !== OrderStatus.ALL
            ? Number(status as unknown as string)
            : undefined;

        const result = await orderService.getOrdersByShop({
          page: pagination.currentPage,
          size: pagination.pageSize,
          status: numericStatus,
          ...appliedFilters,
        });
        setOrders(result?.content || []);
        setTotalPages(result?.totalPages || 0);
        setTotalElements(result?.totalElements || 0);
      } catch (err) {
        console.error("Error loading orders:", err);
        setOrders([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    };
    fetchOrders();
  }, [status, pagination.currentPage, pagination.pageSize, appliedFilters]);

  // Handle searching orders
  const handleSearch = async () => {
    try {
      // Validate date range if both ends provided
      if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
        toast({
          title: "Invalid date range",
          description:
            '"From date" must be earlier than or equal to "To date".',
          variant: "destructive",
        });
        return;
      }
      // Apply filters and reset to first page; effect will fetch
      setAppliedFilters({
        code: searchKeyword || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      });
      setPagination(prev => ({ ...prev, currentPage: 0 }));
    } catch (err) {
      console.error("Error searching orders:", err);
    }
  };

  // Handle reset filters
  const handleResetSearch = async () => {
    // Reset keyword and date range
    setSearchKeyword("");
    setFromDate("");
    setToDate("");
    try {
      // Clear applied filters and reset to first page; effect will fetch
      setAppliedFilters({});
      setPagination(prev => ({ ...prev, currentPage: 0 }));
    } catch (err) {
      console.error("Error resetting search:", err);
    }
  };

  // Handle order status update
  // newStatus: use OrderStatus enum ("0"|"1"|"2"|"3") to sync with backend
  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        newStatus
      );
      if (updatedOrder) {
        // Update local list
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // Success toast
        toast({
          title: "Updated successfully",
          description: `Order #${updatedOrder.code} status updated.`,
        });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast({
        title: "Update failed",
        description: "Unable to update order status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Navigate to order detail page
  const handleViewOrderDetail = (orderId: number) => {
    navigate(`/seller/orders/${orderId}`);
  };

  // Status UI delegated to reusable component: OrderStatusBadge

  // Render dropdown menu for status update
  const renderStatusUpdateMenu = (order: Order) => {
    // Determine possible next statuses
    const nextPossibleStatuses: { status: OrderStatus; label: string }[] = [];

    // Compare using OrderStatus enum to avoid type mismatch
    switch (order.status) {
      case OrderStatus.PENDING_CONFIRMATION:
        // 0 cannot go to 1 manually; payment webhook updates it automatically
        break;
      case OrderStatus.AWAITING_PICKUP:
        // 1 -> 2
        nextPossibleStatuses.push({
          status: OrderStatus.IN_DELIVERY,
          label: "In delivery",
        });
        break;
      case OrderStatus.IN_DELIVERY:
        // 2 -> 3
        nextPossibleStatuses.push({
          status: OrderStatus.COMPLETED,
          label: "Completed",
        });
        break;
      case OrderStatus.COMPLETED:
        // Final state; no further step
        break;
      default:
        return null;
    }

    if (nextPossibleStatuses.length === 0) {
      return null;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Update <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {nextPossibleStatuses.map(item => (
            <DropdownMenuItem
              key={item.status}
              onClick={() => handleUpdateStatus(order.id, item.status)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search bar + date range (shadcn) */}
      {/* Responsive: cho phép wrap và full-width trên mobile */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by order code"
            className="pl-8"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        {/* Visual separator */}
        <Separator orientation="vertical" className="hidden sm:block h-8" />
        {/* Select date range via Popover + Calendar (range mode) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[260px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <span>
                    {formatDate(dateRange.from!)} - {formatDate(dateRange.to!)}
                  </span>
                ) : (
                  <span>{formatDate(dateRange.from!)}</span>
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto max-w-full p-0 overflow-x-auto"
            align="start"
          >
            {/* shadcn Calendar supports range */}
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={range => {
                // Update UI + API state when selecting dates
                setDateRange(range);
                setFromDate(range?.from ? toYMD(range.from) : "");
                setToDate(range?.to ? toYMD(range.to) : "");
              }}
              numberOfMonths={calendarMonths}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button className="w-full sm:w-auto" onClick={handleSearch}>
          Search
        </Button>
        <Button
          className="w-full sm:w-auto"
          variant="outline"
          onClick={handleResetSearch}
        >
          <X className="mr-2 h-4 w-4" /> Clear filters
        </Button>
      </div>

      {/* Orders table */}
      {orders.length === 0 ? (
        <div className="text-center py-8 bg-background border rounded-md">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          {/* Responsive: bật scroll ngang cho bảng ở màn hình nhỏ, tối thiểu 700px để đủ cột chính */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Code</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {order.orderAddressDTO?.firstName +
                          " " +
                          order.orderAddressDTO?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.phoneNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.timeOrder)}</TableCell>
                  <TableCell>{formatCurrencyUSD(order.totalPrice)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewOrderDetail(order.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {renderStatusUpdateMenu(order)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination: use CustomPagination, base-1 for UI */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {orders.length} / {totalElements} orders
              </p>
              <CustomPagination
                currentPage={pagination.currentPage + 1}
                totalPages={totalPages}
                onPageChange={page =>
                  setPagination(prev => ({ ...prev, currentPage: page - 1 }))
                }
                className="justify-end"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTable;

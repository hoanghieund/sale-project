import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPalButtons
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/**
 * Các section đã tách nhỏ
 */
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useCart } from "@/providers/cart-provider";
import CheckoutHeader from "./components/sections/CheckoutHeader";
import ContactInformationSection from "./components/sections/ContactInformationSection";
import OrderItemsList from "./components/sections/OrderItemsList";
import PriceSummary from "./components/sections/PriceSummary";
import ShippingAddressSection from "./components/sections/ShippingAddressSection";
import { orderService } from "./services/orderService";

/**
 * CheckoutForm: typing cho toàn bộ form checkout
 * Lưu ý: Tuân thủ form-rules -> react-hook-form + shadcn/ui/form
 */
export interface CheckoutForm {
  email: string;
  name: string;
  phone: string;
  address: string;
  selectedAddressId: string; // ID của địa chỉ đã chọn, hoặc 'other' nếu là địa chỉ khác
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  // Sử dụng custom hook để truy cập Cart context
  const {
    cartByShop,
    isLoading,
    selectedItems,
    cartSummary,
    fetchCartData,
    setSelectedItems,
  } = useCart();

  const cart = {
    cartByShopList: cartByShop
      .map(shopCart => {
        // Lọc cartDTOList để chỉ giữ lại các item có id trong selectedItems
        const filteredCartDTOList = shopCart.cartDTOList.filter(item =>
          selectedItems.has(String(item.id))
        );
        // Trả về shopCart đã cập nhật với cartDTOList đã lọc
        return { ...shopCart, cartDTOList: filteredCartDTOList };
      })
      .filter(shopCart => shopCart.cartDTOList.length > 0),
    summary: cartSummary,
  };

  // React Hook Form setup
  const methods = useForm<CheckoutForm>({
    defaultValues: {
      selectedAddressId: "other",
    },
  });

  const selectedAddressId = methods.watch("selectedAddressId"); // Theo dõi selectedAddressId

  // Tối ưu flatMap items để không tính lại khi re-render
  // Đảm bảo allItems được định nghĩa trước bất kỳ return có điều kiện nào
  const allItems = useMemo(
    () => cart?.cartByShopList.flatMap(shopCart => shopCart.cartDTOList) ?? [],
    [cart]
  );

  // Defensive: tránh crash nếu cart null
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!cart || !cart.cartByShopList || cart.cartByShopList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mt-4">
          <Button onClick={() => navigate("/cart")}>Quay lại giỏ hàng</Button>
        </div>
      </div>
    );
  }

  // Submit tổng: giữ nguyên logic ban đầu
  /**
   * Xử lý gửi biểu mẫu checkout để tạo đơn hàng.
   * @param data Dữ liệu từ biểu mẫu checkout.
   * @returns Promise<string> ID đơn hàng PayPal.
   */
  const onSubmit = async (data: CheckoutForm): Promise<string> => {
    setIsProcessing(true);
    try {
      // Gọi dịch vụ đặt hàng để tạo đơn hàng
      const response = await orderService.checkout({
        // Chuyển đổi Set selectedItems thành một mảng chuỗi
        lstIdCart: Array.from(selectedItems).map(Number),
        feeShip: 1,
        orderAddressDTO: {
          id:
            data.selectedAddressId === "other"
              ? null
              : Number(data.selectedAddressId),
          fullName: data.name,
          address: data.address,
          phoneNumber: data.phone,
        },
      });

      // Kiểm tra các tên property có thể có trong response
      const possibleOrderIdFields = [
        "paypalOrderId",
        "orderId",
        "id",
        "order_id",
        "paypal_order_id",
        "data.paypalOrderId",
        "data.orderId",
      ];

      let paypalOrderId = null;
      for (const field of possibleOrderIdFields) {
        const value = field.includes(".")
          ? field.split(".").reduce((obj, key) => obj?.[key], response)
          : response?.[field];
        if (value) {
          paypalOrderId = value;
          break;
        }
      }

      if (!paypalOrderId) {
        console.error(
          "Không tìm thấy PayPal Order ID trong response:",
          response
        );
        throw new Error("API không trả về PayPal Order ID");
      }

      return paypalOrderId;
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
      // Ném lỗi để PayPal Buttons có thể xử lý
      // Ném lỗi để PayPal Buttons có thể hiển thị lỗi cho người dùng.
      throw new Error("Không thể tạo đơn hàng.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header tối giản */}
        <CheckoutHeader
          onBack={() => navigate("/cart")}
          title="Checkout"
          backIcon={<ArrowLeft className="h-4 w-4" />}
        />

        {/* FormProvider chia sẻ context cho các section con */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cột trái: Thông tin khách + địa chỉ + thanh toán */}
              <div className="space-y-8">
                <ContactInformationSection />

                <ShippingAddressSection
                  isDisabled={selectedAddressId !== "other"}
                />
              </div>

              {/* Cột phải: Tóm tắt đơn hàng */}
              <div className="bg-white rounded-lg p-6 shadow-sm h-fit border border-border lg:sticky top-32">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <OrderItemsList items={allItems} />

                <Separator className="my-4 bg-black" />

                <PriceSummary summary={cart.summary} />

                <PayPalButtons
                  style={{ layout: "vertical", disableMaxWidth: true }}
                  disabled={!methods.formState.isValid || isProcessing}
                  createOrder={async (_, actions) => {
                    // Xử lý logic tạo đơn hàng và trả về ID đơn hàng
                    try {
                      // Validate form trước khi gọi onSubmit
                      const isValid = await methods.trigger();
                      if (!isValid) {
                        throw new Error("Thông tin form không hợp lệ.");
                      }

                      // Lấy form data và gọi onSubmit trực tiếp
                      const formData = methods.getValues();
                      const orderId = await onSubmit(formData);

                      if (typeof orderId === "string" && orderId) {
                        return orderId;
                      } else {
                        // Nếu onSubmit không trả về string, có thể là lỗi hoặc không mong muốn
                        console.error(
                          "onSubmit không trả về ID đơn hàng hợp lệ:",
                          orderId
                        );
                        throw new Error("Không thể tạo đơn hàng PayPal.");
                      }
                    } catch (error) {
                      console.error(
                        "Lỗi khi gọi onSubmit trong createOrder của PayPal:",
                        error
                      );
                      // Ném lỗi để PayPal Buttons có thể hiển thị lỗi cho người dùng
                      throw error;
                    }
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("Order captured:", order);
                    // Gọi hàm onSubmit của bạn sau khi thanh toán thành công
                    localStorage.removeItem("local_selected_items");
                    setSelectedItems(new Set<string>());
                    toast({
                      title: "Success",
                      description: "Order placed successfully.",
                    });
                    await fetchCartData();
                    navigate("/account/orders");
                  }}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Checkout;

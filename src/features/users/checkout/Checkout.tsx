import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { OrderStatus } from "@/types";
import { AxiosError } from "axios";
import { ArrowLeft, Lock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { cartService } from "../cart/services/cartService";
import { CartByShop, CartSummary } from "../cart/types/cart-types";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
/**
 * Các section đã tách nhỏ
 */
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { calculateCartSummary } from "@/utils/cartUtils";
import CheckoutHeader from "./components/sections/CheckoutHeader";
import ContactInformationSection from "./components/sections/ContactInformationSection";
import OrderItemsList from "./components/sections/OrderItemsList";
import PaymentSection from "./components/sections/PaymentSection";
import PriceSummary from "./components/sections/PriceSummary";
import ShippingAddressSection from "./components/sections/ShippingAddressSection";
import SubmitOrderButton from "./components/sections/SubmitOrderButton";
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
  paymentMethodId: number; // ID phương thức thanh toán từ DB
  paymentMethodType: "card" | "paypal"; // loại phương thức cho UI
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  sameAsBilling: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState<{
    cartByShopList: CartByShop[];
    summary: CartSummary;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedItems = new Set<string>(
    JSON.parse(localStorage.getItem("selectedItems") || "[]")
  );

  /**
   * @function fetchCartData
   * @description Lấy dữ liệu giỏ hàng từ API.
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        const response = await cartService.getCart();
        const summary = calculateCartSummary(response, selectedItems);
        const cartList = response
          .map(shopCart => {
            // Lọc cartDTOList để chỉ giữ lại các item có id trong selectedItems
            const filteredCartDTOList = shopCart.cartDTOList.filter(item =>
              selectedItems.has(String(item.id))
            );
            // Trả về shopCart đã cập nhật với cartDTOList đã lọc
            return { ...shopCart, cartDTOList: filteredCartDTOList };
          })
          .filter(shopCart => shopCart.cartDTOList.length > 0); // Chỉ giữ lại các shopCart có cartDTOList không rỗng
        setCart({ cartByShopList: cartList, summary });
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "Không thể tải giỏ hàng.");
        toast({
          title: "Lỗi",
          description: error.message || "Không thể tải giỏ hàng.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // React Hook Form setup
  const methods = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethodType: "paypal",
      paymentMethodId: 2, // giả định paypal là mặc định
      sameAsBilling: true,
      selectedAddressId: "other",
    },
    // Tip: có thể thêm resolver của zod/yup nếu muốn nâng cấp validate
  });

  const paymentMethodType = methods.watch("paymentMethodType");
  const paymentMethodId = methods.watch("paymentMethodId");
  const selectedAddressId = methods.watch("selectedAddressId"); // Theo dõi selectedAddressId

  // Handler: thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (id: number, type: string) => {
    methods.setValue("paymentMethodId", id);
    methods.setValue("paymentMethodType", type as "card" | "paypal");
  };

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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Lỗi: {error}</p>
        <Button onClick={() => navigate("/cart")} className="mt-4">
          Quay lại giỏ hàng
        </Button>
      </div>
    );
  }

  if (!cart || !cart.cartByShopList || cart.cartByShopList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">
          Giỏ hàng trống hoặc không khả dụng.
        </p>
        <div className="flex justify-center mt-4">
          <Button onClick={() => navigate("/cart")}>Quay lại giỏ hàng</Button>
        </div>
      </div>
    );
  }

  // Submit tổng: giữ nguyên logic ban đầu
  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    const orderData = {
      ...data,
      items: allItems,
      totalPrice: cart?.summary.total ?? 0,
      status: OrderStatus.PENDING,
      timeOrder: new Date(),
    };
    console.log("🚀 ~ onSubmit ~ orderData:", orderData);

    try {
      // mô phỏng xử lý thanh toán
      await orderService.checkout({
        lstIdCart: JSON.parse(localStorage.getItem("selectedItems") || "[]"),
        feeShip: 1,
      });
      localStorage.removeItem("selectedItems");
      toast({
        title: "Success",
        description: "Order placed successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
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

                <PaymentSection
                  header="Payment Method"
                  selector={
                    <PaymentMethodSelector
                      value={paymentMethodId}
                      onChange={handlePaymentMethodChange}
                      register={methods.register}
                    />
                  }
                  paymentMethodType={paymentMethodType}
                  errors={methods.formState.errors}
                />
              </div>

              {/* Cột phải: Tóm tắt đơn hàng */}
              <div className="bg-white rounded-lg p-6 shadow-sm h-fit border border-border lg:sticky top-32">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <OrderItemsList items={allItems} />

                <Separator className="my-4 bg-black" />

                <PriceSummary summary={cart.summary} />

                <SubmitOrderButton
                  isProcessing={isProcessing}
                  labelProcessing="Processing..."
                  labelDefault={
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  }
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

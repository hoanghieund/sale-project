import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "@/types";
import { ArrowLeft, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CartByShop, CartSummary } from "../cart/types/cart-types";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
/**
 * Các section đã tách nhỏ
 */
import CheckoutHeader from "./components/sections/CheckoutHeader";
import ContactInformationSection from "./components/sections/ContactInformationSection";
import OrderItemsList from "./components/sections/OrderItemsList";
import PaymentSection from "./components/sections/PaymentSection";
import PriceSummary from "./components/sections/PriceSummary";
import ShippingAddressSection from "./components/sections/ShippingAddressSection";
import SubmitOrderButton from "./components/sections/SubmitOrderButton";

/**
 * CheckoutForm: typing cho toàn bộ form checkout
 * Lưu ý: Tuân thủ form-rules -> react-hook-form + shadcn/ui/form
 */
export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  paymentMethodId: number; // ID phương thức thanh toán từ DB
  paymentMethodType: "card" | "paypal"; // loại phương thức cho UI
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  saveInfo: boolean;
  sameAsBilling: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Dữ liệu cart mock: giữ nguyên như code gốc để không phá vỡ luồng
  const [cart] = useState<{
    cartByShopList: CartByShop[];
    summary: CartSummary;
  } | null>({
    cartByShopList: [
      {
        id: 1,
        shopName: "Shop A",
        shopIdDistrict: 1,
        cartDTOList: [
          {
            id: 101,
            quantity: 2,
            isReview: false,
            shop: { id: 1, name: "Shop A" },
            productDTO: {
              id: 1001,
              title: "Sản phẩm A",
              price: 150.0,
              status: true,
              imagesDTOList: [
                {
                  id: 1,
                  path: "https://via.placeholder.com/150/0000FF/808080?text=ProductA",
                },
              ],
            },
            totalPrice: 300.0,
          },
          {
            id: 102,
            quantity: 1,
            isReview: false,
            shop: { id: 1, name: "Shop A" },
            productDTO: {
              id: 1002,
              title: "Sản phẩm B",
              price: 250.0,
              status: true,
              imagesDTOList: [
                {
                  id: 2,
                  path: "https://via.placeholder.com/150/FF0000/FFFFFF?text=ProductB",
                },
              ],
            },
            totalPrice: 250.0,
          },
        ],
      },
      {
        id: 2,
        shopName: "Shop B",
        shopIdDistrict: 2,
        cartDTOList: [
          {
            id: 201,
            quantity: 3,
            isReview: false,
            shop: { id: 2, name: "Shop B" },
            productDTO: {
              id: 2001,
              title: "Sản phẩm C",
              price: 50.0,
              status: true,
              imagesDTOList: [
                {
                  id: 3,
                  path: "https://via.placeholder.com/150/00FF00/000000?text=ProductC",
                },
              ],
            },
            totalPrice: 150.0,
          },
        ],
      },
    ],
    summary: {
      subtotal: 700.0,
      discount: 50.0,
      shipping: 10.0,
      tax: 35.0,
      total: 695.0,
      couponCode: "DISCOUNT10",
    },
  });

  // React Hook Form setup
  const methods = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethodType: "card",
      paymentMethodId: 1, // giả định thẻ là mặc định
      sameAsBilling: true,
      saveInfo: false,
      country: "United States",
    },
    // Tip: có thể thêm resolver của zod/yup nếu muốn nâng cấp validate
  });

  const paymentMethodType = methods.watch("paymentMethodType");
  const paymentMethodId = methods.watch("paymentMethodId");

  // Tối ưu flatMap items để không tính lại khi re-render
  const allItems = useMemo(
    () =>
      cart?.cartByShopList.flatMap((shopCart) => shopCart.cartDTOList) ?? [],
    [cart]
  );

  // Handler: thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (id: number, type: string) => {
    methods.setValue("paymentMethodId", id);
    methods.setValue("paymentMethodType", type as "card" | "paypal");
  };

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

    try {
      // mô phỏng xử lý thanh toán
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Order data:", orderData);
      navigate("/order-success");
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart) {
    // Defensive: tránh crash nếu cart null
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

                <ShippingAddressSection />

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

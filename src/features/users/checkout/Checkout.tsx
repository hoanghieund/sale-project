import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPalButtons
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/**
 * Separated sections
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
 * Note: Follow form-rules -> react-hook-form + shadcn/ui/form
 */
export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  orderNotes?: string;
  selectedAddressId: string; // ID of the selected address, or 'other' if it's a different address
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  // Use custom hook to access Cart context
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
        // Filter cartDTOList to only keep items with IDs in selectedItems
        const filteredCartDTOList = shopCart.cartDTOList.filter(item =>
          selectedItems.has(String(item.id))
        );
        // Return updated shopCart with filtered cartDTOList
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

  const selectedAddressId = methods.watch("selectedAddressId"); // Track selectedAddressId

  // Optimize flatMap items to avoid re-calculation on re-render
  // Ensure allItems is defined before any conditional return
  const allItems = useMemo(
    () => cart?.cartByShopList.flatMap(shopCart => shopCart.cartDTOList) ?? [],
    [cart]
  );

  // Defensive: avoid crash if cart is null
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
          <Button onClick={() => navigate("/cart")}>Back to cart</Button>
        </div>
      </div>
    );
  }

  // Overall submit: keep original logic
  /**
   * Handle submission of the checkout form to create an order.
   * @param data Data from the checkout form.
   * @returns Promise<string> PayPal order ID.
   */
  const onSubmit = async (data: CheckoutForm): Promise<string> => {
    setIsProcessing(true);
    try {
      // Call order service to create the order
      const response = await orderService.checkout({
        // Convert Set selectedItems to a string array
        lstIdCart: Array.from(selectedItems).map(Number),
        feeShip: 1,
        orderAddressDTO: {
          id:
            data.selectedAddressId === "other"
              ? null
              : Number(data.selectedAddressId),
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          country: data.country,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          orderNotes: data.orderNotes,
        },
      });

      // Check for possible property names in the response
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
        console.error("PayPal Order ID not found in response:", response);
        throw new Error("API did not return PayPal Order ID");
      }

      return paypalOrderId;
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while creating the order. Please try again.",
        variant: "destructive",
      });
      // Throw error so PayPal Buttons can handle it
      // Throw error so PayPal Buttons can display the error to the user.
      throw new Error("Could not create order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Minimal Header */}
      <CheckoutHeader
        onBack={() => navigate("/cart")}
        title="Checkout"
        backIcon={<ArrowLeft className="h-4 w-4" />}
      />

      {/* FormProvider shares context with child sections */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Customer info + address + payment */}
            <div className="space-y-8">
              <ContactInformationSection />

              <ShippingAddressSection
                isDisabled={selectedAddressId !== "other"}
              />
            </div>

            {/* Right column: Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm h-fit border border-border lg:sticky top-32">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <OrderItemsList items={allItems} />

              <Separator className="my-4 bg-black" />

              <PriceSummary summary={cart.summary} />

              <PayPalButtons
                style={{ layout: "vertical", disableMaxWidth: true }}
                disabled={!methods.formState.isValid || isProcessing}
                createOrder={async (_, actions) => {
                  // Handle order creation logic and return order ID
                  try {
                    // Validate form before calling onSubmit
                    const isValid = await methods.trigger();
                    if (!isValid) {
                      throw new Error("Invalid form information.");
                    }

                    // Get form data and call onSubmit directly
                    const formData = methods.getValues();
                    const orderId = await onSubmit(formData);

                    if (typeof orderId === "string" && orderId) {
                      return orderId;
                    } else {
                      // If onSubmit does not return a string, it might be an error or unexpected
                      console.error(
                        "onSubmit did not return a valid order ID:",
                        orderId
                      );
                      throw new Error("Could not create PayPal order.");
                    }
                  } catch (error) {
                    console.error(
                      "Error calling onSubmit in PayPal's createOrder:",
                      error
                    );
                    // Throw error so PayPal Buttons can display the error to the user
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
  );
};

export default Checkout;

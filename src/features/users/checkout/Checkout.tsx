import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { OrderStatus } from "@/types";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "./components/PaymentMethodSelector";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  paymentMethodId: number; // ID của phương thức thanh toán từ database
  paymentMethodType: "card" | "paypal"; // Loại phương thức thanh toán cho UI
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  saveInfo: boolean;
  sameAsBilling: boolean;
}

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethodType: "card",
      paymentMethodId: 1, // Giả sử ID 1 là phương thức thanh toán thẻ mặc định
      sameAsBilling: true,
      saveInfo: false,
      country: "United States",
    },
  });

  const paymentMethodType = watch("paymentMethodType");
  const paymentMethodId = watch("paymentMethodId");

  // Handler khi thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (id: number, type: string) => {
    setValue("paymentMethodId", id);
    setValue("paymentMethodType", type as "card" | "paypal");
  };

  if (cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);

    // Tạo đối tượng order với paymentMethod
    const orderData = {
      ...data,
      items: cart.items,
      totalPrice: cart.total,
      status: OrderStatus.PENDING, // Sử dụng enum OrderStatus
      timeOrder: new Date(),
    };

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Order data:", orderData);

      // Trong thực tế, gọi API để lưu đơn hàng
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });
      // const result = await response.json();
      // if (!result.success) throw new Error(result.message);

      // Clear cart and redirect to success page
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
      // Hiển thị thông báo lỗi cho người dùng
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      {...register("city", { required: "City is required" })}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      {...register("state", {
                        required: "State is required",
                      })}
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      {...register("zipCode", {
                        required: "ZIP code is required",
                      })}
                      className={errors.zipCode ? "border-destructive" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                {/* Sử dụng component PaymentMethodSelector mới */}
                <PaymentMethodSelector
                  value={paymentMethodId}
                  onChange={handlePaymentMethodChange}
                  register={register}
                />

                {paymentMethodType === "card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber", {
                          required: "Card number is required",
                        })}
                        className={
                          errors.cardNumber ? "border-destructive" : ""
                        }
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          {...register("expiryDate", {
                            required: "Expiry date is required",
                          })}
                          className={
                            errors.expiryDate ? "border-destructive" : ""
                          }
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.expiryDate.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          {...register("cvv", {
                            required: "CVV is required",
                          })}
                          className={errors.cvv ? "border-destructive" : ""}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.cvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        {...register("nameOnCard", {
                          required: "Name on card is required",
                        })}
                        className={
                          errors.nameOnCard ? "border-destructive" : ""
                        }
                      />
                      {errors.nameOnCard && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.nameOnCard.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="saveInfo" {...register("saveInfo")} />
                  <Label htmlFor="saveInfo" className="text-sm">
                    Save this information for next time
                  </Label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 shadow-sm h-fit border border-border ">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-4">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? item.product.images[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={item.product.title || "Sản phẩm"}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size.value} • Color: {item.color.name}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Price Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {cart.shipping === 0
                      ? "Free"
                      : `$${cart.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

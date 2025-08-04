import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Payment
 * - Nhận vào selector (component chọn phương thức thanh toán) để linh hoạt thay đổi UI
 * - Hiển thị form card khi type === 'card'
 */
interface Props {
  header: string;
  selector: React.ReactNode;
  paymentMethodType: "card" | "paypal";
  errors: FieldErrors<CheckoutForm>;
}

const PaymentSection = ({ header, selector, paymentMethodType, errors }: Props) => {
  const { register } = useFormContext<CheckoutForm>();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">{header}</h2>

      {/* Component selector bên ngoài (PaymentMethodSelector) */}
      {selector}

      {paymentMethodType === "card" && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              {...register("cardNumber", { required: "Card number is required" })}
              className={errors.cardNumber ? "border-destructive" : ""}
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
                {...register("expiryDate", { required: "Expiry date is required" })}
                className={errors.expiryDate ? "border-destructive" : ""}
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
                {...register("cvv", { required: "CVV is required" })}
                className={errors.cvv ? "border-destructive" : ""}
              />
              {errors.cvv && (
                <p className="text-sm text-destructive mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              {...register("nameOnCard", { required: "Name on card is required" })}
              className={errors.nameOnCard ? "border-destructive" : ""}
            />
            {errors.nameOnCard && (
              <p className="text-sm text-destructive mt-1">
                {errors.nameOnCard.message}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentSection;
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethod } from "@/types";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

// Interface cho props của component
interface PaymentMethodSelectorProps {
  value: number;
  onChange: (paymentMethodId: number, paymentMethodType: string) => void;
  register: any; // react-hook-form register
}

/**
 * Component to display and select payment methods
 * Uses PaymentMethod type from the database
 *
 * @param value - ID of the currently selected payment method
 * @param onChange - Callback when changing the payment method
 * @param register - react-hook-form register function
 */
const PaymentMethodSelector = ({
  value,
  onChange,
  register,
}: PaymentMethodSelectorProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch payment method list from API or mock data
  useEffect(() => {
    // Mock data for payment methods
    const mockPaymentMethods: PaymentMethod[] = [
      // {
      //   id: 1,
      //   name: "Credit Card",
      //   status: true,
      // },
      {
        id: 2,
        name: "PayPal",
        status: true,
      },
      // {
      //   id: 3,
      //   name: "Bank Transfer",
      //   status: true,
      // },
    ];

    // Simulate API call
    setTimeout(() => {
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 500);

    // In a real application, you would call the API here
    // const fetchPaymentMethods = async () => {
    //   try {
    //     const response = await fetch("/api/payment-methods");
    //     const data = await response.json();
    //     setPaymentMethods(data);
    //   } catch (error) {
    //     console.error("Failed to fetch payment methods:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchPaymentMethods();
  }, []);

  // Determine payment method type based on ID
  const getPaymentMethodType = (id: number): "card" | "paypal" | "bank" => {
    const method = paymentMethods.find(m => m.id === id);
    if (!method) return "card"; // Default to card

    // Determine type based on name (in a real application, there might be a separate type field)
    if (method.name?.toLowerCase().includes("card")) return "card";
    if (method.name?.toLowerCase().includes("paypal")) return "paypal";
    return "bank";
  };

  // Handler for payment method change
  const handlePaymentMethodChange = (id: number) => {
    const type = getPaymentMethodType(id);
    onChange(id, type);
  };

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="space-y-4">
      <RadioGroup
        value={value.toString()}
        onValueChange={(value) => handlePaymentMethodChange(parseInt(value))}
      >
        {paymentMethods
          .filter((method) => method.status) // Only display active payment methods
          .map((method) => (
            <div key={method.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={method.id.toString()}
                id={`payment-${method.id}`}
                {...register("paymentMethodId")}
              />
              <Label
                htmlFor={`payment-${method.id}`}
                className="flex items-center gap-2"
              >
                {method.name?.toLowerCase().includes("card") && (
                  <CreditCard className="h-4 w-4" />
                )}
                {method.name}
              </Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;

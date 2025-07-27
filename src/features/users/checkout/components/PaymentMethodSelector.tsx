import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/types";
import { CreditCard } from "lucide-react";

// Interface cho props của component
interface PaymentMethodSelectorProps {
  value: number;
  onChange: (paymentMethodId: number, paymentMethodType: string) => void;
  register: any; // react-hook-form register
}

/**
 * Component hiển thị và chọn phương thức thanh toán
 * Sử dụng PaymentMethod type từ database
 * 
 * @param value - ID của phương thức thanh toán đang được chọn
 * @param onChange - Callback khi thay đổi phương thức thanh toán
 * @param register - react-hook-form register function
 */
const PaymentMethodSelector = ({
  value,
  onChange,
  register,
}: PaymentMethodSelectorProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách phương thức thanh toán từ API hoặc mock data
  useEffect(() => {
    // Mock data cho phương thức thanh toán
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: 1,
        name: "Credit Card",
        status: true,
      },
      {
        id: 2,
        name: "PayPal",
        status: true,
      },
      {
        id: 3,
        name: "Bank Transfer",
        status: true,
      },
    ];

    // Giả lập API call
    setTimeout(() => {
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 500);

    // Trong thực tế, sẽ gọi API ở đây
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

  // Xác định loại phương thức thanh toán dựa vào ID
  const getPaymentMethodType = (id: number): "card" | "paypal" | "bank" => {
    const method = paymentMethods.find(m => m.id === id);
    if (!method) return "card"; // Mặc định là card

    // Xác định loại dựa vào tên (trong thực tế có thể có trường type riêng)
    if (method.name?.toLowerCase().includes("card")) return "card";
    if (method.name?.toLowerCase().includes("paypal")) return "paypal";
    return "bank";
  };

  // Handler khi thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (id: number) => {
    const type = getPaymentMethodType(id);
    onChange(id, type);
  };

  if (loading) {
    return <div>Đang tải phương thức thanh toán...</div>;
  }

  return (
    <div className="space-y-4">
      <RadioGroup
        value={value.toString()}
        onValueChange={(value) => handlePaymentMethodChange(parseInt(value))}
      >
        {paymentMethods
          .filter((method) => method.status) // Chỉ hiển thị các phương thức đang hoạt động
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

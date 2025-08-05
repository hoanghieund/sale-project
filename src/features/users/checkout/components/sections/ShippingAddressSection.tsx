import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Shipping Address
 * Groups address fields and displays errors for each input
 */
interface ShippingAddressSectionProps {
  isDisabled: boolean;
}

const ShippingAddressSection = ({ isDisabled }: ShippingAddressSectionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "First name is required" })}
            className={errors.name ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address", { required: "Address is required" })}
            className={errors.address ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            disabled={isDisabled}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressSection;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Shipping Address
 * Gom nhóm field địa chỉ, hiển thị lỗi theo từng input
 */
const ShippingAddressSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
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
            {...register("lastName", { required: "Last name is required" })}
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
            {...register("address", { required: "Address is required" })}
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
            {...register("state", { required: "State is required" })}
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
            {...register("zipCode", { required: "ZIP code is required" })}
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
  );
};

export default ShippingAddressSection;
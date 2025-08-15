import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Shipping Address
 * Groups address fields and displays errors for each input
 */
interface ShippingAddressSectionProps {
  isDisabled: boolean;
}

const ShippingAddressSection = ({
  isDisabled,
}: ShippingAddressSectionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Họ và tên người nhận */}
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            className={errors.firstName ? "border-destructive" : ""}
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{1,3}(?:[\s-]?\d{1,4}){1,4}$/,
                message: "Invalid phone number format.",
              },
            })}
            className={errors.phoneNumber ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Công ty (không bắt buộc) */}
        <div>
          <Label htmlFor="companyName">Company (Optional)</Label>
          <Input
            id="companyName"
            {...register("companyName")}
            disabled={isDisabled}
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="md:col-span-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            {...register("addressLine1", { required: "Address is required" })}
            className={errors.addressLine1 ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.addressLine1 && (
            <p className="text-sm text-destructive mt-1">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
          <Input
            id="addressLine2"
            {...register("addressLine2")}
            disabled={isDisabled}
          />
        </div>

        {/* Thành phố, Bang/Tỉnh, Mã bưu điện */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register("city", { required: "City is required" })}
            className={errors.city ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.city && (
            <p className="text-sm text-destructive mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            {...register("state", { required: "State/Province is required" })}
            className={errors.state ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.state && (
            <p className="text-sm text-destructive mt-1">
              {errors.state.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            {...register("postalCode", {
              required: "Postal code is required",
              pattern: {
                value: /^\d{5,6}$/,
                message: "Invalid postal code format",
              },
            })}
            className={errors.postalCode ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.postalCode && (
            <p className="text-sm text-destructive mt-1">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            {...register("country", { required: "Country is required" })}
            className={errors.country ? "border-destructive" : ""}
            disabled={isDisabled}
          />
          {errors.country && (
            <p className="text-sm text-destructive mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Ghi chú đơn hàng (không bắt buộc) */}
        <div className="md:col-span-2">
          <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
          <Textarea
            id="orderNotes"
            {...register("orderNotes")}
            placeholder="Notes about your order, e.g. special delivery instructions"
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressSection;

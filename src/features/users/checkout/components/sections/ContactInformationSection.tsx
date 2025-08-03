import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Contact Information (Email)
 * Dùng useFormContext để truy cập register, errors mà không prop drilling
 */
const ContactInformationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
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
  );
};

export default ContactInformationSection;
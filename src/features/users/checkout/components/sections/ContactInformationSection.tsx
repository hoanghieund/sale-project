import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addressService } from "@/features/users/account-management/services/addressService";
import { useUser } from "@/hooks/use-user";
import { Address } from "@/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CheckoutForm } from "../../Checkout";

/**
 * Section: Contact Information and Shipping Address
 * Uses useFormContext to access register, errors, setValue without prop drilling
 */
const ContactInformationSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext<CheckoutForm>();
  const { user } = useUser(); // Use useUser hook to get user information

  const [addresses, setAddresses] = useState<Address[]>([]);
  // No need for local state for selectedAddressId anymore, using react-hook-form

  /**
   * @function fetchAddresses
   * @description Fetches the user's address list when the component mounts or userId changes.
   */
  useEffect(() => {
    const fetchAddresses = async () => {
      if (user?.id) {
        try {
          const fetchedAddresses = await addressService.getAddresses();
          setAddresses(fetchedAddresses);
        } catch (error) {
          console.error("Failed to fetch addresses:", error);
        }
      }
    };

    fetchAddresses();
  }, [user?.id]);

  /**
   * @function applyAddressToForm
   * @description Assigns values from the Address object to the form fields.
   * @param address - Address object containing address information.
   */
  const applyAddressToForm = (address: Address) => {
    // Gán các trường theo cấu trúc Address mới
    setValue("firstName", address.firstName || "", { shouldValidate: true });
    setValue("lastName", address.lastName || "", { shouldValidate: true });
    setValue("companyName", address.companyName || "");
    setValue("phoneNumber", address.phoneNumber || "", {
      shouldValidate: true,
    });
    setValue("email", address.email || "", { shouldValidate: true });
    setValue("addressLine1", address.addressLine1 || "", {
      shouldValidate: true,
    });
    setValue("addressLine2", address.addressLine2 || "");
    setValue("city", address.city || "", { shouldValidate: true });
    setValue("state", address.state || "", { shouldValidate: true });
    setValue("postalCode", address.postalCode || "", { shouldValidate: true });
    setValue("country", address.country || "", { shouldValidate: true });
    setValue("orderNotes", address.orderNotes || "");
    // Trigger validation after setting all fields
    trigger();
  };

  /**
   * @function handleAddressChange
   * @description Handles the event when a user selects an address from the dropdown.
   * @param addressId - ID of the selected address.
   */
  const handleAddressChange = (addressId: string) => {
    setValue("selectedAddressId", addressId); // Cập nhật selectedAddressId qua react-hook-form
    if (addressId === "other") {
      // Xóa các trường form liên quan đến địa chỉ khi chọn "Other"
      setValue("firstName", "", { shouldValidate: true });
      setValue("lastName", "", { shouldValidate: true });
      setValue("companyName", "");
      setValue("phoneNumber", "", { shouldValidate: true });
      setValue("email", "", { shouldValidate: true });
      setValue("addressLine1", "", { shouldValidate: true });
      setValue("addressLine2", "");
      setValue("city", "", { shouldValidate: true });
      setValue("state", "", { shouldValidate: true });
      setValue("postalCode", "", { shouldValidate: true });
      setValue("country", "", { shouldValidate: true });
      setValue("orderNotes", "");
      trigger();
    } else {
      const address = addresses.find(addr => addr.id.toString() === addressId);
      if (address) {
        applyAddressToForm(address);
      }
    }
  };

  /**
   * @description Automatically selects the default address (isDefault = true) if available, and assigns it to the form.
   */
  useEffect(() => {
    if (addresses.length > 0) {
      // Tìm địa chỉ mặc định (isCurrent)
      const defaultAddress = addresses.find(addr => addr.isCurrent);
      if (defaultAddress) {
        setValue("selectedAddressId", defaultAddress.id.toString(), {
          shouldValidate: true,
        }); // Cập nhật qua react-hook-form
        applyAddressToForm(defaultAddress);
        trigger();
      } else if (addresses.length > 0) {
        // Nếu không có địa chỉ mặc định, nhưng có địa chỉ, chọn địa chỉ đầu tiên
        setValue("selectedAddressId", addresses[0].id.toString(), {
          shouldValidate: true,
        }); // Cập nhật qua react-hook-form
        applyAddressToForm(addresses[0]);
        trigger();
      } else {
        // Nếu không có địa chỉ nào, đặt selectedAddressId là 'other'
        setValue("selectedAddressId", "other", { shouldValidate: true });
        trigger();
      }
    } else {
      setValue("selectedAddressId", "other", { shouldValidate: true });
      trigger();
    }
  }, [addresses]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">
        Contact Information and Shipping Address
      </h2>
      <div className="space-y-4">
        {/* Dropdown to select a saved address */}
        <div className="col-span-full space-y-2">
          <Label htmlFor="address-radio-group">
            Select an existing address
          </Label>
          {/* Use register to let react-hook-form manage the RadioGroup value */}
          <RadioGroup
            onValueChange={handleAddressChange}
            value={watch("selectedAddressId") || ""}
            id="address-radio-group"
          >
            {addresses.map(address => (
              <div key={address.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={address.id.toString()}
                  id={`address-${address.id}`}
                />
                <Label
                  htmlFor={`address-${address.id}`}
                  className="flex flex-col p-2 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors duration-200 w-full"
                >
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Recipient:</span>
                    <span className="text-sm text-muted-foreground">
                      {address.firstName} {address.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Phone:</span>
                    <span className="text-sm text-muted-foreground">
                      {address.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Email:</span>
                    <span className="text-sm text-muted-foreground">
                      {address.email}
                    </span>
                  </div>
                  {address.companyName && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">Company:</span>
                      <span className="text-sm text-muted-foreground">
                        {address.companyName}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Address:</span>
                    <span className="text-sm text-muted-foreground">
                      {address.addressLine1}
                      {address.addressLine2 &&
                        `, ${address.addressLine2}`}, {address.city},{" "}
                      {address.state}, {address.postalCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Country:</span>
                    <span className="text-sm text-muted-foreground">
                      {address.country}
                    </span>
                  </div>
                  {address.orderNotes && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">Notes:</span>
                      <span className="text-sm text-muted-foreground">
                        {address.orderNotes}
                      </span>
                    </div>
                  )}
                  {address.isCurrent && (
                    <div className="text-xs text-emerald-600 font-medium">
                      (Default)
                    </div>
                  )}
                </Label>
              </div>
            ))}
            {/* Add "Other" option */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="address-other" />
              <Label
                htmlFor="address-other"
                className="p-2 cursor-pointer hover:bg-muted/50 transition-colors duration-200 w-full border rounded-md"
              >
                Other (Enter new address details)
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;

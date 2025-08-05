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
          const fetchedAddresses = await addressService.getAddresses(user.id);
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
    // Gán firstName và lastName, sử dụng fullName nếu firstName/lastName không tồn tại
    setValue("name", address.fullName, { shouldValidate: true });
    setValue("address", address.address, { shouldValidate: true });
    setValue("phone", address.phoneNumber, { shouldValidate: true });
    // Trigger validation after setting all fields
    trigger();
    // Các trường city, state, zipCode, country không được cập nhật theo yêu cầu
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
      setValue("name", "", { shouldValidate: true });
      setValue("address", "", { shouldValidate: true });
      setValue("phone", "", { shouldValidate: true });
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
        setValue("selectedAddressId", defaultAddress.id.toString(), { shouldValidate: true }); // Cập nhật qua react-hook-form
        applyAddressToForm(defaultAddress);
        trigger();
      } else if (addresses.length > 0) {
        // Nếu không có địa chỉ mặc định, nhưng có địa chỉ, chọn địa chỉ đầu tiên
        setValue("selectedAddressId", addresses[0].id.toString(), { shouldValidate: true }); // Cập nhật qua react-hook-form
        applyAddressToForm(addresses[0]);
        trigger();
      } else {
        // Nếu không có địa chỉ nào, đặt selectedAddressId là 'other'
        setValue("selectedAddressId", "other", { shouldValidate: true });
        trigger();
      }
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
          <Label htmlFor="address-radio-group">Select an existing address</Label>
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
                    <span className="font-semibold text-sm">Name:</span>
                    <span className="text-sm text-muted-foreground">{address.fullName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Address:</span>
                    <span className="text-sm text-muted-foreground">{address.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">Phone:</span>
                    <span className="text-sm text-muted-foreground">{address.phoneNumber}</span>
                  </div>
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
              <Label htmlFor="address-other" className="p-2 cursor-pointer hover:bg-muted/50 transition-colors duration-200 w-full border rounded-md">
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

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
 * Dùng useFormContext để truy cập register, errors, setValue mà không cần prop drilling
 */
const ContactInformationSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CheckoutForm>();
  const { user } = useUser(); // Sử dụng hook useUser để lấy thông tin người dùng

  const [addresses, setAddresses] = useState<Address[]>([]);
  // Không cần state cục bộ cho selectedAddressId nữa, sẽ dùng react-hook-form

  /**
   * @function fetchAddresses
   * @description Lấy danh sách địa chỉ của người dùng khi component mount hoặc userId thay đổi.
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
   * @description Gán các giá trị từ đối tượng Address vào các trường của form.
   * @param address - Đối tượng Address chứa thông tin địa chỉ.
   */
  const applyAddressToForm = (address: Address) => {
    // Gán firstName và lastName, sử dụng fullName nếu firstName/lastName không tồn tại
    setValue("name", address.fullName);
    setValue("address", address.address);
    setValue("phone", address.phoneNumber);
    // Các trường city, state, zipCode, country không được cập nhật theo yêu cầu
  };

  /**
   * @function handleAddressChange
   * @description Xử lý sự kiện khi người dùng chọn một địa chỉ từ dropdown.
   * @param addressId - ID của địa chỉ được chọn.
   */
  const handleAddressChange = (addressId: string) => {
    setValue("selectedAddressId", addressId); // Cập nhật selectedAddressId qua react-hook-form
    if (addressId === "other") {
      // Xóa các trường form liên quan đến địa chỉ khi chọn "Other"
      setValue("name", "");
      setValue("address", "");
      setValue("phone", "");
    } else {
      const address = addresses.find(addr => addr.id.toString() === addressId);
      if (address) {
        applyAddressToForm(address);
      }
    }
  };

  /**
   * @description Tự động chọn địa chỉ mặc định (isDefault = true) nếu có, và gán vào form.
   */
  useEffect(() => {
    if (addresses.length > 0) {
      // Tìm địa chỉ mặc định (isCurrent)
      const defaultAddress = addresses.find(addr => addr.isCurrent);
      if (defaultAddress) {
        setValue("selectedAddressId", defaultAddress.id.toString()); // Cập nhật qua react-hook-form
        applyAddressToForm(defaultAddress);
      } else if (addresses.length > 0) {
        // Nếu không có địa chỉ mặc định, nhưng có địa chỉ, chọn địa chỉ đầu tiên
        setValue("selectedAddressId", addresses[0].id.toString()); // Cập nhật qua react-hook-form
        applyAddressToForm(addresses[0]);
      } else {
        // Nếu không có địa chỉ nào, đặt selectedAddressId là 'other'
        setValue("selectedAddressId", "other");
      }
    }
  }, [addresses]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">
        Contact Information and Shipping Address
      </h2>
      <div className="space-y-4">
        {/* Dropdown để chọn địa chỉ đã lưu */}
        <div className="col-span-full space-y-2">
          <Label htmlFor="address-radio-group">Select an existing address</Label>
          {/* Sử dụng register để react-hook-form quản lý giá trị của RadioGroup */}
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
            {/* Thêm tùy chọn "Other" */}
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

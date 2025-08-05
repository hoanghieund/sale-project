// src/features/users/account-management/components/AddressList.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Address } from "@/types";
import React, { useState } from "react";
import AddressForm from "./AddressForm";

/**
 * @interface AddressListProps
 * @description Props for the AddressList component.
 * @property {Address[]} addresses List of addresses to display.
 * @property {(address: Address) => void} onUpdateAddress Callback function when updating an address.
 * @property {(id: number) => void} onDeleteAddress Callback function when deleting an address.
 * @property {(id: number) => void} onSetDefaultAddress Callback function when setting default address.
 */
interface AddressListProps {
  addresses: Address[];
  onUpdateAddress: (address: Address) => void;
  onDeleteAddress: (id: number) => void;
  onSetDefaultAddress: (id: number) => void;
  disabled?: boolean;
}

/**
 * @function AddressList
 * @description Component that displays a list of addresses with edit and delete functionality.
 * The "Add New Address" button has been moved up to AddressPage.
 * @param {AddressListProps} props Component props.
 * @returns {JSX.Element} React element.
 */
const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  disabled,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  /**
   * @function handleEdit
   * @description Handles edit button click.
   * @param {Address} address Address to be edited.
   */
  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  /**
   * @function handleDelete
   * @description Handles delete button click.
   * @param {number} id ID of the address to be deleted.
   */
  const handleDelete = (id: number) => {
    console.log("Deleting address with ID:", id);
    onDeleteAddress(id);
  };

  /**
   * @function handleFormSubmit
   * @description Handles form submission (update).
   * @param {Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>} data Address data from the form.
   */
  const handleFormSubmit = (
    data: Omit<
      Address,
      | "id"
      | "user"
      | "provinceName"
      | "districtName"
      | "wardName"
      | "shopIdDistrict"
    >
  ) => {
    if (editingAddress) {
      // Update existing address
      const updatedAddress: Address = {
        ...editingAddress, // Keep unchanged fields
        ...data,
      };
      onUpdateAddress(updatedAddress);
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  /**
   * @function handleFormCancel
   * @description Handles form cancellation.
   */
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      {/* Dialog for Edit Address form */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            initialData={editingAddress || undefined} // initialData can be undefined if no address is being edited
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            You don't have any addresses yet.
          </p>
        ) : (
          addresses.map(address => (
            // Mỗi địa chỉ được hiển thị trong một div với kiểu dáng tinh tế
            <div
              key={address.id}
              className={cn(
                "p-4 border rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center",
                address.isCurrent && "border-primary" // Đánh dấu địa chỉ mặc định
              )}
            >
              <div className="flex-grow mb-4 md:mb-0">
                {/* Recipient name and phone number */}
                <p className="font-semibold text-lg text-gray-900">
                  Full Name: {address.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {address.phoneNumber}
                </p>
                {/* Detailed address */}
                <p className="text-sm text-gray-600">
                  Address: {address.address}
                </p>
                {/* Tags for default and pickup addresses */}
                <div className="flex items-center gap-2 mt-1">
                  {address.isCurrent && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                  {/* Using isShop property from Address to display this tag */}
                  {address.isShop && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Pickup Address
                    </span>
                  )}
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col md:flex-row gap-2 flex-shrink-0">
                {!address.isCurrent && (
                  <Button
                    disabled={disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onSetDefaultAddress(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  disabled={disabled}
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </Button>
                <Button
                  disabled={disabled}
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AddressList;

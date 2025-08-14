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
   * @param {Omit<Address, 'id'>} data Address data from the form.
   */
  const handleFormSubmit = (data: Omit<Address, "id">) => {
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
        <DialogContent className="max-h-[calc(100vh-10rem)] overflow-y-auto">
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
                "p-4 border rounded-lg shadow-sm bg-white flex flex-row justify-between items-start md:items-center",
                address.isCurrent && "border-primary" // Đánh dấu địa chỉ mặc định
              )}
            >
              <div className="flex-grow mb-4 md:mb-0">
                {/* Recipient name and contact info */}
                <p className="font-semibold text-lg">
                  <span className="font-medium text-primary">Recipient:</span>{" "}
                  {address.firstName} {address.lastName}
                </p>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1 mt-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                    {address.phoneNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {address.email}
                  </p>
                </div>

                {/* Company name if available */}
                {address.companyName && (
                  <p className="text-sm mt-1">
                    <span className="font-medium text-gray-700">Company:</span>{" "}
                    {address.companyName}
                  </p>
                )}

                {/* Detailed address */}
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Address:</p>
                  <div className="ml-2">
                    <p className="text-sm">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="text-sm">{address.addressLine2}</p>
                    )}
                    <p className="text-sm">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">
                        Country:
                      </span>{" "}
                      {address.country}
                    </p>
                  </div>
                </div>

                {/* Order notes if available */}
                {address.orderNotes && (
                  <p className="text-sm mt-1 italic">
                    <span className="font-medium text-gray-700">Notes:</span>{" "}
                    {address.orderNotes}
                  </p>
                )}

                {/* Tags for default and pickup addresses */}
                <div className="flex items-center gap-2 mt-2">
                  {address.isCurrent && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                  {address.isShop && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Pickup Address
                    </span>
                  )}
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
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

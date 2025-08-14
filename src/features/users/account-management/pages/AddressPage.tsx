// src/features/users/account-management/pages/AddressPage.tsx
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-user";
import { Address } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";
import { addressService } from "../services/addressService";

/**
 * @component AddressPage
 * @description User's address management page.
 * Displays a list of addresses and allows adding, editing, and deleting addresses through AddressList and AddressForm.
 */
const AddressPage: React.FC = () => {
  const { user } = useUser();
  // State to manage the open/close state of the add address dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // State to store the list of addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(false);
  // State to store error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchAddresses
   * @description Fetches the list of addresses from the API.
   */
  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Error loading addresses:", err);
      setError("Failed to load address list.");
      toast.error("Failed to load address list.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to load addresses when component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  /**
   * @function handleAddAddress
   * @description Handles adding a new address.
   * @param {Omit<Address, 'id'>} address - The address information to add.
   */
  const handleAddAddress = async (address: Omit<Address, "id">) => {
    const payload = {
      ...address,
      userId: user.id,
    };
    try {
      await addressService.addAddress(payload);
      setIsAddDialogOpen(false);
      toast.success("Address added successfully!");
      fetchAddresses(); // Re-fetch data after successful addition
    } catch (err) {
      console.error("Error adding address:", err);
      toast.error("Failed to add address.");
    }
  };

  /**
   * @function handleUpdateAddress
   * @description Handles updating an address.
   * @param {Address} address - The address information to update.
   */
  const handleUpdateAddress = async (address: Address) => {
    const payload = {
      ...address,
      userId: user.id,
    };
    try {
      await addressService.updateAddress(payload);
      toast.success("Address updated successfully!");
      fetchAddresses(); // Re-fetch data after successful update
    } catch (err) {
      console.error("Error updating address:", err);
      toast.error("Failed to update address.");
    }
  };

  /**
   * @function handleDeleteAddress
   * @description Handles deleting an address.
   * @param {number} id - The ID of the address to delete.
   */
  const handleDeleteAddress = async (id: number) => {
    setLoading(true);
    try {
      await addressService.deleteAddress(id);
      toast.success("Address deleted successfully!");
      fetchAddresses(); // Re-fetch data after successful deletion
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.error("Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function handleSetDefaultAddress
   * @description Handles setting the default address.
   * @param {number} id - The ID of the address to set as default.
   */
  const handleSetDefaultAddress = async (id: number) => {
    setLoading(true);
    try {
      // Assuming there's an API call to set default address
      await addressService.setDefaultAddress(id);
      toast.success("Default address set successfully!");
      fetchAddresses(); // Re-fetch data after successfully setting default
    } catch (err) {
      console.error("Error setting default address:", err);
      toast.error("Failed to set default address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">My Addresses</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading} // Disable button while loading
            >
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[calc(100vh-10rem)] overflow-y-auto">
            {/* Bọc nội dung của DialogContent trong một div để đảm bảo chỉ có một phần tử con */}
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setIsAddDialogOpen(false)} // Add onCancel để đóng dialog
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error && !loading ? (
          <EmptyStateMessage icon="🛍️" message={error} />
        ) : addresses.length === 0 ? (
          <EmptyStateMessage
            icon="🛍️"
            message="You don't have any addresses yet. Add a new address!"
          />
        ) : (
          <AddressList
            disabled={loading}
            addresses={addresses} // Truyền dữ liệu địa chỉ từ state
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefaultAddress={handleSetDefaultAddress} // Truyền hàm đặt địa chỉ mặc định
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AddressPage;

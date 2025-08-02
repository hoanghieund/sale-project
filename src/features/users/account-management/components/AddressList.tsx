// src/features/users/account-management/components/AddressList.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Address } from '@/features/users/account-management/types/address';
import React, { useState } from 'react';
import AddressForm from './AddressForm';

/**
 * @interface AddressListProps
 * @description Props cho component AddressList.
 * @property {Address[]} addresses Danh sách các địa chỉ để hiển thị.
 * @property {(address: Address) => void} onUpdateAddress Hàm callback khi cập nhật địa chỉ.
 * @property {(id: string) => void} onDeleteAddress Hàm callback khi xóa địa chỉ.
 */
interface AddressListProps {
  addresses: Address[];
  onUpdateAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
}

/**
 * @function AddressList
 * @description Component hiển thị danh sách các địa chỉ, cung cấp chức năng sửa, xóa.
 * Nút "Thêm địa chỉ mới" đã được chuyển lên AddressPage.
 * @param {AddressListProps} props Props của component.
 * @returns {JSX.Element} Element React.
 */
const AddressList: React.FC<AddressListProps> = ({ addresses, onUpdateAddress, onDeleteAddress }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  /**
   * @function handleEdit
   * @description Xử lý khi nhấn nút "Sửa".
   * @param {Address} address Địa chỉ cần chỉnh sửa.
   */
  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  /**
   * @function handleDelete
   * @description Xử lý khi nhấn nút "Xóa".
   * @param {string} id ID của địa chỉ cần xóa.
   */
  const handleDelete = (id: string) => {
    console.log("Deleting address with ID:", id);
    onDeleteAddress(id);
  };

  /**
   * @function handleFormSubmit
   * @description Xử lý khi form địa chỉ được submit (cập nhật).
   * @param {Omit<Address, 'id'>} data Dữ liệu địa chỉ từ form.
   */
  const handleFormSubmit = (data: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Cập nhật địa chỉ hiện có
      onUpdateAddress({ ...data, id: editingAddress.id });
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  /**
   * @function handleFormCancel
   * @description Xử lý khi form địa chỉ bị hủy.
   */
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      {/* Dialog cho form Sửa địa chỉ */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sửa địa chỉ</DialogTitle>
          </DialogHeader>
          <AddressForm
            initialData={editingAddress || undefined} // initialData có thể là undefined nếu không có địa chỉ chỉnh sửa
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Bạn chưa có địa chỉ nào.</p>
        ) : (
          addresses.map((address) => (
            <Card key={address.id} className="p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-sm text-gray-700">{address.phone}</p>
                  <p className="text-sm text-gray-700">{address.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(address)}>
                    Sửa
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(address.id)}>
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default AddressList;
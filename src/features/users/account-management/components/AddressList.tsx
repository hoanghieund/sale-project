// src/features/users/account-management/components/AddressList.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Address } from '@/features/users/account-management/types/address';
import React, { useState } from 'react';
import AddressForm from './AddressForm';

/**
 * @interface AddressListProps
 * @description Props cho component AddressList.
 * @property {Address[]} addresses Danh sách các địa chỉ để hiển thị.
 * @property {(address: Omit<Address, 'id'>) => void} onAddAddress Hàm callback khi thêm địa chỉ mới.
 * @property {(address: Address) => void} onUpdateAddress Hàm callback khi cập nhật địa chỉ.
 * @property {(id: string) => void} onDeleteAddress Hàm callback khi xóa địa chỉ.
 */
interface AddressListProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onUpdateAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
}

/**
 * @function AddressList
 * @description Component hiển thị danh sách các địa chỉ, cung cấp chức năng thêm, sửa, xóa.
 * @param {AddressListProps} props Props của component.
 * @returns {JSX.Element} Element React.
 */
const AddressList: React.FC<AddressListProps> = ({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress }) => {
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
   * @description Xử lý khi form địa chỉ được submit (thêm mới hoặc cập nhật).
   * @param {Omit<Address, 'id'>} data Dữ liệu địa chỉ từ form.
   */
  const handleFormSubmit = (data: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Cập nhật địa chỉ hiện có
      onUpdateAddress({ ...data, id: editingAddress.id });
    } else {
      // Thêm địa chỉ mới (tạo ID tạm thời)
      onAddAddress(data);
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Địa chỉ của bạn</CardTitle> {/* Thay đổi text-2xl font-bold thành text-lg */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAddress(null)}>Thêm địa chỉ mới</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</DialogTitle>
            </DialogHeader>
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4"> {/* Thêm padding cho CardContent */}
        {addresses.length === 0 ? (
          <p className="text-muted-foreground">Bạn chưa có địa chỉ nào.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-sm text-gray-700">{address.phone}</p> {/* Thay text-gray-600 thành text-gray-700 */}
                    <p className="text-sm text-gray-700">{address.address}</p> {/* Thay text-gray-600 thành text-gray-700 */}
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressList;
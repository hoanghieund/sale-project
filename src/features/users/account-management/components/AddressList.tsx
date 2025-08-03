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
 * @description Props cho component AddressList.
 * @property {Address[]} addresses Danh sách các địa chỉ để hiển thị.
 * @property {(address: Address) => void} onUpdateAddress Hàm callback khi cập nhật địa chỉ.
 * @property {(id: number) => void} onDeleteAddress Hàm callback khi xóa địa chỉ.
 * @property {(id: number) => void} onSetDefaultAddress Hàm callback khi đặt địa chỉ mặc định.
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
 * @description Component hiển thị danh sách các địa chỉ, cung cấp chức năng sửa, xóa.
 * Nút "Thêm địa chỉ mới" đã được chuyển lên AddressPage.
 * @param {AddressListProps} props Props của component.
 * @returns {JSX.Element} Element React.
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
   * @param {number} id ID của địa chỉ cần xóa.
   */
  const handleDelete = (id: number) => {
    console.log("Deleting address with ID:", id);
    onDeleteAddress(id);
  };

  /**
   * @function handleFormSubmit
   * @description Xử lý khi form địa chỉ được submit (cập nhật).
   * @param {Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>} data Dữ liệu địa chỉ từ form.
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
      // Cập nhật địa chỉ hiện có
      const updatedAddress: Address = {
        ...editingAddress, // Giữ lại các trường không thay đổi
        ...data,
      };
      onUpdateAddress(updatedAddress);
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
          <p className="text-muted-foreground text-center py-4">
            Bạn chưa có địa chỉ nào.
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
                {/* Tên người nhận và số điện thoại */}
                <p className="font-semibold text-lg text-gray-900">
                  Tên đầy đủ: {address.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  Điện thoại: {address.phoneNumber}
                </p>
                {/* Địa chỉ chi tiết */}
                <p className="text-sm text-gray-600">
                  Địa chỉ: {address.address}
                </p>
                {/* Nhãn cho địa chỉ hiện tại và địa chỉ lấy hàng */}
                <div className="flex items-center gap-2 mt-1">
                  {address.isCurrent && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Mặc định
                    </span>
                  )}
                  {/* Sử dụng thuộc tính isShop trong Address để hiển thị nhãn này */}
                  {address.isShop && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Địa chỉ lấy hàng
                    </span>
                  )}
                </div>
              </div>
              {/* Các nút hành động */}
              <div className="flex flex-col md:flex-row gap-2 flex-shrink-0">
                {!address.isCurrent && (
                  <Button
                    disabled={disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onSetDefaultAddress(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )}
                <Button
                  disabled={disabled}
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address)}
                >
                  Sửa
                </Button>
                <Button
                  disabled={disabled}
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                >
                  Xóa
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

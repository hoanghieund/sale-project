// src/features/users/account-management/pages/AddressPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'; // Loại bỏ useState vì AddressList sẽ quản lý state
import AddressList from '../components/AddressList';

// Giả định kiểu Address và các hàm service
import { addAddress, deleteAddress, updateAddress } from '@/features/users/account-management/services/addressService';
import { Address } from '@/features/users/account-management/types/address';

/**
 * @component AddressPage
 * @description Trang quản lý địa chỉ của người dùng.
 * Hiển thị danh sách địa chỉ và cho phép thêm, sửa, xóa địa chỉ thông qua AddressList.
 */
const AddressPage: React.FC = () => {
  // Dữ liệu giả định cho danh sách địa chỉ. Trong thực tế sẽ fetch từ API.
  const mockAddresses: Address[] = [
    { id: '1', name: 'Nguyễn Văn A', phone: '0912345678', address: '123 Đường ABC, Quận 1, TP.HCM' },
    { id: '2', name: 'Trần Thị B', phone: '0987654321', address: '456 Đường XYZ, Quận 2, TP.HCM' },
  ];

  const handleAddAddress = async (address: Omit<Address, 'id'>) => {
    console.log('Thêm địa chỉ mới:', address);
    // Gọi API để thêm địa chỉ
    await addAddress(address); // Giả định hàm addAddress tồn tại và hoạt động
    // Cập nhật lại danh sách địa chỉ sau khi thêm thành công (có thể bằng cách re-fetch data hoặc cập nhật state cục bộ)
  };

  const handleUpdateAddress = async (address: Address) => {
    console.log('Cập nhật địa chỉ:', address);
    // Gọi API để cập nhật địa chỉ
    await updateAddress(address); // Giả định hàm updateAddress tồn tại và hoạt động
    // Cập nhật lại danh sách địa chỉ sau khi cập nhật thành công
  };

  const handleDeleteAddress = async (id: string) => {
    console.log('Xóa địa chỉ:', id);
    // Gọi API để xóa địa chỉ
    await deleteAddress(id); // Giả định hàm deleteAddress tồn tại và hoạt động
    // Cập nhật lại danh sách địa chỉ sau khi xóa thành công
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Địa chỉ của tôi</CardTitle>
        {/* Nút "Thêm địa chỉ mới" sẽ được quản lý bởi AddressList */}
      </CardHeader>
      <CardContent className="p-4">
        <AddressList
          addresses={mockAddresses} // Truyền dữ liệu địa chỉ giả định
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleUpdateAddress}
          onDeleteAddress={handleDeleteAddress}
        />
      </CardContent>
    </Card>
  );
};

export default AddressPage;
// src/features/users/account-management/pages/AddressPage.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import AddressList from '../components/AddressList';

// Giả định kiểu Address và các hàm service
import { addAddress, deleteAddress, updateAddress } from '@/features/users/account-management/services/addressService';
import { Address } from '@/types';

/**
 * @component AddressPage
 * @description Trang quản lý địa chỉ của người dùng.
 * Hiển thị danh sách địa chỉ và cho phép thêm, sửa, xóa địa chỉ thông qua AddressList và AddressForm.
 */
const AddressPage: React.FC = () => {
  // State để quản lý trạng thái mở/đóng của dialog thêm địa chỉ
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dữ liệu giả định cho danh sách địa chỉ. Trong thực tế sẽ fetch từ API.
  // TODO: Thực hiện fetch dữ liệu từ API và quản lý state cho danh sách địa chỉ
  const mockAddresses: Address[] = [
    { id: 1, fullName: 'Nguyễn Văn A', phoneNumber: '0912345678', address: '123 Đường ABC, Quận 1, TP.HCM', district: 1, districtName: 'Quận 1', isCurrent: true, isShop: false, province: 79, provinceName: 'TP.HCM', shopIdDistrict: 0, user: {} as any, userId: 1, wardCode: '00001', wardName: 'Phường Bến Nghé' },
    { id: 2, fullName: 'Trần Thị B', phoneNumber: '0987654321', address: '456 Đường XYZ, Quận 2, TP.HCM', district: 2, districtName: 'Quận 2', isCurrent: false, isShop: true, province: 79, provinceName: 'TP.HCM', shopIdDistrict: 0, user: {} as any, userId: 1, wardCode: '00002', wardName: 'Phường An Khánh' },
  ];

    /**
     * @function handleAddAddress
     * @description Xử lý thêm địa chỉ mới.
     * @param {Omit<Address, 'id'>} address - Thông tin địa chỉ cần thêm.
     */
    const handleAddAddress = async (address: Omit<Address, 'id'>) => {
      console.log('Thêm địa chỉ mới:', address);
      // Gọi API để thêm địa chỉ
      await addAddress(address); // Giả định hàm addAddress tồn tại và hoạt động
      // Đóng dialog sau khi thêm thành công
      setIsAddDialogOpen(false);
      // TODO: Cập nhật lại danh sách địa chỉ sau khi thêm thành công (có thể bằng cách re-fetch data hoặc cập nhật state cục bộ)
    };


    /**
     * @function handleUpdateAddress
     * @description Xử lý cập nhật địa chỉ.
     * @param {Address} address - Thông tin địa chỉ cần cập nhật.
     */
    const handleUpdateAddress = async (address: Address) => {
      console.log('Cập nhật địa chỉ:', address);
      // Gọi API để cập nhật địa chỉ
      await updateAddress(address); // Giả định hàm updateAddress tồn tại và hoạt động
      // TODO: Cập nhật lại danh sách địa chỉ sau khi cập nhật thành công
    };

    /**
     * @function handleDeleteAddress
     * @description Xử lý xóa địa chỉ.
     * @param {number} id - ID của địa chỉ cần xóa.
     */
    const handleDeleteAddress = async (id: number) => {
      console.log('Xóa địa chỉ:', id);
      // Gọi API để xóa địa chỉ
      await deleteAddress(id); // Giả định hàm deleteAddress tồn tại và hoạt động
      // TODO: Cập nhật lại danh sách địa chỉ sau khi xóa thành công
    };

    /**
     * @function handleSetDefaultAddress
     * @description Xử lý đặt địa chỉ mặc định.
     * @param {number} id - ID của địa chỉ cần đặt làm mặc định.
     */
    const handleSetDefaultAddress = async (id: number) => {
      console.log('Đặt địa chỉ mặc định:', id);
      // TODO: Gọi API để đặt địa chỉ mặc định
      // Giả định có một API call để đặt địa chỉ mặc định
      // Sau khi gọi API thành công, cần cập nhật lại danh sách địa chỉ
    };

    return (
      <Card className="w-full bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Địa chỉ của tôi</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Thêm địa chỉ mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {/* Bọc nội dung của DialogContent trong một div để đảm bảo chỉ có một phần tử con */}
                <DialogHeader>
                  <DialogTitle>Thêm địa chỉ mới</DialogTitle>
                </DialogHeader>
                <AddressForm
                  onSubmit={handleAddAddress}
                  onCancel={() => setIsAddDialogOpen(false)} // Thêm onCancel để đóng dialog
                />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <AddressList
            addresses={mockAddresses} // Truyền dữ liệu địa chỉ giả định
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefaultAddress={handleSetDefaultAddress} // Truyền hàm đặt địa chỉ mặc định
          />
        </CardContent>
      </Card>
    );
  };

export default AddressPage;

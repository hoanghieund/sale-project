// src/features/users/account-management/pages/AddressPage.tsx
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Address } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";
import { addressService } from "../services/addressService";

/**
 * @component AddressPage
 * @description Trang quản lý địa chỉ của người dùng.
 * Hiển thị danh sách địa chỉ và cho phép thêm, sửa, xóa địa chỉ thông qua AddressList và AddressForm.
 */
const AddressPage: React.FC = () => {
  // State để quản lý trạng thái mở/đóng của dialog thêm địa chỉ
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // State để lưu trữ danh sách địa chỉ
  const [addresses, setAddresses] = useState<Address[]>([]);
  // State để theo dõi trạng thái tải dữ liệu
  const [loading, setLoading] = useState(true);
  // State để lưu trữ thông báo lỗi
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchAddresses
   * @description Tải danh sách địa chỉ từ API.
   */
  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Lỗi khi tải địa chỉ:", err);
      setError("Không thể tải danh sách địa chỉ.");
      toast.error("Không thể tải danh sách địa chỉ.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect để tải địa chỉ khi component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  /**
   * @function handleAddAddress
   * @description Xử lý thêm địa chỉ mới.
   * @param {Omit<Address, 'id'>} address - Thông tin địa chỉ cần thêm.
   */
  const handleAddAddress = async (address: Omit<Address, "id">) => {
    console.log("Thêm địa chỉ mới:", address);
    try {
      await addressService.addAddress(address);
      setIsAddDialogOpen(false);
      toast.success("Thêm địa chỉ thành công!");
      fetchAddresses(); // Re-fetch dữ liệu sau khi thêm thành công
    } catch (err) {
      console.error("Lỗi khi thêm địa chỉ:", err);
      toast.error("Không thể thêm địa chỉ.");
    }
  };

  /**
   * @function handleUpdateAddress
   * @description Xử lý cập nhật địa chỉ.
   * @param {Address} address - Thông tin địa chỉ cần cập nhật.
   */
  const handleUpdateAddress = async (address: Address) => {
    console.log("Cập nhật địa chỉ:", address);
    try {
      await addressService.updateAddress(address);
      toast.success("Cập nhật địa chỉ thành công!");
      fetchAddresses(); // Re-fetch dữ liệu sau khi cập nhật thành công
    } catch (err) {
      console.error("Lỗi khi cập nhật địa chỉ:", err);
      toast.error("Không thể cập nhật địa chỉ.");
    }
  };

  /**
   * @function handleDeleteAddress
   * @description Xử lý xóa địa chỉ.
   * @param {number} id - ID của địa chỉ cần xóa.
   */
  const handleDeleteAddress = async (id: number) => {
    console.log("Xóa địa chỉ:", id);
    try {
      await addressService.deleteAddress(id);
      toast.success("Xóa địa chỉ thành công!");
      fetchAddresses(); // Re-fetch dữ liệu sau khi xóa thành công
    } catch (err) {
      console.error("Lỗi khi xóa địa chỉ:", err);
      toast.error("Không thể xóa địa chỉ.");
    }
  };

  /**
   * @function handleSetDefaultAddress
   * @description Xử lý đặt địa chỉ mặc định.
   * @param {number} id - ID của địa chỉ cần đặt làm mặc định.
   */
  const handleSetDefaultAddress = async (id: number) => {
    console.log("Đặt địa chỉ mặc định:", id);
    try {
      // Giả định có một API call để đặt địa chỉ mặc định
      // await addressService.setDefaultAddress(id);
      toast.success("Đặt địa chỉ mặc định thành công!");
      fetchAddresses(); // Re-fetch dữ liệu sau khi đặt mặc định thành công
    } catch (err) {
      console.error("Lỗi khi đặt địa chỉ mặc định:", err);
      toast.error("Không thể đặt địa chỉ mặc định.");
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Địa chỉ của tôi</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
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
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <EmptyStateMessage message={error} />
        ) : addresses.length === 0 ? (
          <EmptyStateMessage message="Bạn chưa có địa chỉ nào. Hãy thêm một địa chỉ mới!" />
        ) : (
          <AddressList
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

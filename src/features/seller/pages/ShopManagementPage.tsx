import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid'; // Để tạo ID duy nhất cho shop
import DeleteShopDialog from '../components/DeleteShopDialog';
import { Shop } from '../components/ShopForm'; // Import Shop type
import ShopTable from '../components/ShopTable';

/**
 * ShopManagementPage component.
 * Trang Quản lý Shop của kênh bán hàng.
 * @returns {JSX.Element} ShopManagementPage component.
 */
const ShopManagementPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]); // State để lưu trữ danh sách các shop
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State để điều khiển đóng mở dialog xóa
  const [shopToDelete, setShopToDelete] = useState<string | null>(null); // State để lưu ID shop sẽ xóa
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  // Mock data hoặc load data từ localStorage khi component mount
  useEffect(() => {
    const storedShops = localStorage.getItem('shops');
    if (storedShops) {
      setShops(JSON.parse(storedShops));
    } else {
      // Dữ liệu giả định ban đầu nếu không có trong localStorage
      setShops([
        { id: uuidv4(), name: 'Shop ABC', address: '123 Đường ABC, Quận 1, TP.HCM', description: 'Chuyên bán đồ điện tử' },
        { id: uuidv4(), name: 'Cửa hàng XYZ', address: '456 Phố XYZ, Quận 5, TP.HCM', description: 'Quần áo thời trang' },
      ]);
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi danh sách shops thay đổi
  useEffect(() => {
    localStorage.setItem('shops', JSON.stringify(shops));
  }, [shops]);

  /**
   * @function handleDeleteShop
   * @description Mở dialog xác nhận xóa shop.
   * @param {string} shopId - ID của shop cần xóa.
   */
  const handleDeleteShop = (shopId: string) => {
    setShopToDelete(shopId);
    setIsDeleteDialogOpen(true);
  };

  /**
   * @function handleConfirmDelete
   * @description Xác nhận và thực hiện xóa shop.
   */
  const handleConfirmDelete = () => {
    if (shopToDelete) {
      setShops(shops.filter((shop) => shop.id !== shopToDelete));
      setShopToDelete(null);
      setIsDeleteDialogOpen(false);
      toast.success('Xóa shop thành công!');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý Shop</CardTitle>
          <CardDescription>
            Quản lý thông tin các shop của bạn, bao gồm thêm, chỉnh sửa và xóa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            {/* Nút thêm shop mới, điều hướng đến trang tạo shop */}
            <Button onClick={() => navigate('/seller/shop/create')}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Thêm Shop Mới
            </Button>
          </div>
          {/* Truyền hàm onEdit để điều hướng đến trang chỉnh sửa */}
          <ShopTable
            shops={shops}
            onEdit={(shop) => navigate(`/seller/shop/edit/${shop.id}`)}
            onDelete={handleDeleteShop}
          />
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa shop */}
      <DeleteShopDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        shopName={shops.find(s => s.id === shopToDelete)?.name || ''}
      />
    </div>
  );
};

export default ShopManagementPage;
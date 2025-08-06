import ShopForm from '@/features/seller/components/ShopForm'; // Sử dụng alias @ cho đường dẫn tuyệt đối
import React from 'react';
import { useParams } from 'react-router-dom';

const EditShopPage: React.FC = () => {
    // Lấy shopId từ URL params
    const { shopId } = useParams<{ shopId: string }>();

    return (
        <div>
            {/* Tiêu đề trang chỉnh sửa shop */}
            <h1>Chỉnh Sửa Shop</h1>
            {/* Render component ShopForm, truyền shopId nếu có */}
            {shopId ? <ShopForm shopId={shopId} /> : <p>Không tìm thấy ID shop.</p>}
        </div>
    );
};

export default EditShopPage;
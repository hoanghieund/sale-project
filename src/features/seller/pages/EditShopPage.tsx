import { Shop } from '@/types/seller'; // Import kiểu Shop
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopForm } from '../components/ShopForm';

const EditShopPage: React.FC = () => {
    // Lấy shopId từ URL params
    const { shopId } = useParams<{ shopId: string }>();
    const [shop, setShop] = useState<Shop | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Giả định hàm fetch shop theo ID
    // Trong một ứng dụng thực tế, hàm này sẽ gọi API từ backend
    const fetchShopById = async (id: string): Promise<Shop> => {
        // Mô phỏng việc gọi API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: id,
                    name: `Shop Name ${id}`,
                    description: `Description for Shop ${id}`,
                    address: `Address for Shop ${id}`,
                    logo: `https://example.com/logo-${id}.png`,
                    banner: `https://example.com/banner-${id}.png`,
                    userId: 'user123',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }, 1000); // Giả lập độ trễ 1 giây
        });
    };

    useEffect(() => {
        if (shopId) {
            setLoading(true);
            fetchShopById(shopId)
                .then(data => {
                    setShop(data);
                })
                .catch(error => {
                    console.error("Lỗi khi tải thông tin shop:", error);
                    setShop(null); // Đặt shop về null nếu có lỗi
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [shopId]);

    if (loading) {
        return <p>Đang tải thông tin shop...</p>;
    }

    if (!shopId) {
        return <p>Không tìm thấy ID shop.</p>;
    }

    return (
        <div>
            {/* Tiêu đề trang chỉnh sửa shop */}
            <h1>Chỉnh Sửa Shop</h1>
            {/* Render component ShopForm, truyền shop nếu có */}
            {shop ? <ShopForm shop={shop} onSubmit={() => {}} isLoading={false} /> : <p>Không tìm thấy thông tin shop.</p>}
        </div>
    );
};

export default EditShopPage;
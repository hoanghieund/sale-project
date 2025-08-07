import { Shop } from '@/features/seller/types'; // Import kiểu Shop
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner'; // Import toast
import { ShopForm, ShopFormData } from '../components/ShopForm';
import { sellerAPI } from '../services/seller'; // Import sellerAPI

const EditShopPage: React.FC = () => {
    const navigate = useNavigate();
    // Lấy shopId từ URL params
    const { shopId } = useParams<{ shopId: string }>();
    const [shop, setShop] = useState<Shop | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchShop = async () => {
            setLoading(true);
            try {
                // Lấy thông tin shop từ sellerAPI
                const data = await sellerAPI.getShop();
                setShop(data);
            } catch (error: any) {
                console.error("Error loading shop info:", error);
                toast.error("Error", { description: error.message || "Failed to load shop information." });
                setShop(null);
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
    }, []);

    /**
     * @function handleSubmit
     * @description Xử lý submit form cập nhật thông tin shop.
     * @param {ShopFormData} data - Dữ liệu từ form ShopForm.
     */
    const handleSubmit = async (data: ShopFormData) => {
        setLoading(true);
        try {
            // Cập nhật thông tin shop thông qua sellerAPI
            const updatedShop = await sellerAPI.updateShop(data);
            setShop(updatedShop);
            toast.success("Success", { description: "Shop information updated successfully!" });
            navigate("/seller/dashboard"); // Chuyển hướng về dashboard sau khi cập nhật
        } catch (error: any) {
            toast.error("Error", { description: error.message || "Failed to update shop information." });
        } finally {
            setLoading(false);
        }
    };

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
            {shop ? <ShopForm shop={shop} onSubmit={handleSubmit} isLoading={loading} /> : <p>Không tìm thấy thông tin shop.</p>}
        </div>
    );
};

export default EditShopPage;
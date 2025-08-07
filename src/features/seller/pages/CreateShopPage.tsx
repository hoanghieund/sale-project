import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Import toast
import { ShopForm, ShopFormData } from '../components/ShopForm';
import { sellerAPI } from '../services/seller'; // Import sellerAPI

const CreateShopPage: React.FC = () => {
    const navigate = useNavigate();
    /**
     * @function handleSubmitShop
     * @description Xử lý dữ liệu khi form tạo shop được submit.
     * @param {ShopFormData} data - Dữ liệu từ form ShopForm.
     */
    const handleSubmitShop = async (data: ShopFormData) => {
        try {
            // Giả lập việc tạo shop mới bằng cách cập nhật shop hiện có
            // Trong thực tế, shop sẽ được tạo cùng với người dùng
            const currentShop = await sellerAPI.getShop();
            if (currentShop) {
                await sellerAPI.updateShop({ ...currentShop, ...data });
                toast.success("Shop updated successfully!", { description: "Your shop information has been saved." });
                navigate("/seller/dashboard"); // Chuyển hướng đến dashboard sau khi cập nhật
            } else {
                toast.error("Error", { description: "Shop not found. Cannot create a new one." });
            }
        } catch (error: any) {
            toast.error("Error", { description: error.message || "Failed to update shop." });
        }
    };

    return (
        <div>
            {/* Tiêu đề trang thêm shop mới */}
            <h1>Thêm Shop Mới</h1>
            {/* Render component ShopForm để thêm shop */}
            <ShopForm onSubmit={handleSubmitShop} />
        </div>
    );
};

export default CreateShopPage;
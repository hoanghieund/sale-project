import React from 'react';
import { ShopForm, ShopFormData } from '../components/ShopForm';

const CreateShopPage: React.FC = () => {
    /**
     * @function handleSubmitShop
     * @description Xử lý dữ liệu khi form tạo shop được submit.
     * @param {ShopFormData} data - Dữ liệu từ form ShopForm.
     */
    const handleSubmitShop = (data: ShopFormData) => {
        console.log("Dữ liệu shop mới:", data);
        // TODO: Thực hiện gọi API để tạo shop mới tại đây
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
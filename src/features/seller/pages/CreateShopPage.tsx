import React from 'react';
import { ShopForm } from '../components/ShopForm';

const CreateShopPage: React.FC = () => {
    return (
        <div>
            {/* Tiêu đề trang thêm shop mới */}
            <h1>Thêm Shop Mới</h1>
            {/* Render component ShopForm để thêm shop */}
            <ShopForm />
        </div>
    );
};

export default CreateShopPage;
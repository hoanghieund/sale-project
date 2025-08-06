import React from 'react';
import ProductForm from '../../components/ProductForm'; // Đường dẫn sẽ được điều chỉnh sau khi ProductForm được tạo

const CreateProductPage: React.FC = () => {
    return (
        <div>
            <h1>Thêm Sản phẩm Mới</h1>
            <ProductForm />
        </div>
    );
};

export default CreateProductPage;
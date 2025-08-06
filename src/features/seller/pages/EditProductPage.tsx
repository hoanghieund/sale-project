import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm'; // Đường dẫn sẽ được điều chỉnh sau khi ProductForm được tạo

const EditProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    return (
        <div>
            <h1>Chỉnh Sửa Sản phẩm</h1>
            {productId ? <ProductForm productId={productId} /> : <p>Không tìm thấy ID sản phẩm.</p>}
        </div>
    );
};

export default EditProductPage;
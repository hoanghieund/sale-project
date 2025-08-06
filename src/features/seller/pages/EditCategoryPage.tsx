import CategoryForm from '@/features/seller/components/CategoryForm'; // Cập nhật đường dẫn import
import React from 'react';
import { useParams } from 'react-router-dom';

const EditCategoryPage: React.FC = () => {
    // Lấy categoryId từ URL params
    const { categoryId } = useParams<{ categoryId: string }>();

    return (
        <div>
            {/* Tiêu đề trang chỉnh sửa danh mục */}
            <h1>Chỉnh Sửa Danh mục</h1>
            {/* Render CategoryForm nếu categoryId tồn tại, ngược lại hiển thị thông báo lỗi */}
            {categoryId ? <CategoryForm categoryId={categoryId} /> : <p>Không tìm thấy ID danh mục.</p>}
        </div>
    );
};

export default EditCategoryPage;
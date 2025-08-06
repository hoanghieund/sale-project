import CategoryForm from '@/features/seller/components/CategoryForm'; // Cập nhật đường dẫn import
import React from 'react';

const CreateCategoryPage: React.FC = () => {
    return (
        <div>
            {/* Tiêu đề trang thêm danh mục mới */}
            <h1>Thêm Danh mục Mới</h1>
            {/* Component CategoryForm để xử lý logic thêm mới */}
            <CategoryForm />
        </div>
    );
};

export default CreateCategoryPage;
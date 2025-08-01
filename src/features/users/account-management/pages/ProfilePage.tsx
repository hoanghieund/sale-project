// src/features/users/account-management/pages/ProfilePage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from "@/features/users/account-management/types/account";
import { ProfileForm } from '../components/ProfileForm'; // Sửa lỗi import

/**
 * @component ProfilePage
 * @description Trang hiển thị và chỉnh sửa thông tin cá nhân của người dùng.
 * Sử dụng Card component để nhóm tiêu đề và form thông tin cá nhân.
 */
const ProfilePage: React.FC = () => {
  // Dữ liệu giả định cho hồ sơ người dùng (giữ nguyên từ file gốc)
  const mockUserProfile: UserProfile = {
    username: "john.doe",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0987654321",
    shopName: "John's Shop",
    gender: "male",
    dateOfBirth: "1990-05-15",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ProfileForm initialData={mockUserProfile} />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
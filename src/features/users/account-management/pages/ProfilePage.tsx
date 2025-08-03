// src/features/users/account-management/pages/ProfilePage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "../components/ProfileForm";

/**
 * @component ProfilePage
 * @description Trang hiển thị và chỉnh sửa thông tin cá nhân của người dùng.
 * Sử dụng Card component để nhóm tiêu đề và form thông tin cá nhân.
 * Dữ liệu hồ sơ người dùng được tải từ API.
 */
const ProfilePage: React.FC = () => {

  // Hiển thị form với dữ liệu đã tải hoặc thông báo nếu không có dữ liệu
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ProfileForm  />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;

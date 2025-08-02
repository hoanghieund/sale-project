// src/features/users/account-management/pages/ProfilePage.tsx
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Import LoadingSpinner
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import { profileService } from "../services/profileService";

/**
 * @component ProfilePage
 * @description Trang hiển thị và chỉnh sửa thông tin cá nhân của người dùng.
 * Sử dụng Card component để nhóm tiêu đề và form thông tin cá nhân.
 * Dữ liệu hồ sơ người dùng được tải từ API.
 */
const ProfilePage: React.FC = () => {
  // State để lưu trữ thông tin hồ sơ người dùng
  const [userProfile, setUserProfile] = useState<User | null>(null);
  // State để quản lý trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State để lưu trữ lỗi nếu có
  const { user } = useUser();

  useEffect(() => {
    /**
     * @function fetchUserProfile
     * @description Hàm bất đồng bộ để gọi API lấy thông tin hồ sơ người dùng.
     * Cập nhật trạng thái tải, lỗi và dữ liệu hồ sơ.
     */
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true); // Bắt đầu tải, đặt isLoading là true
        const data = await profileService.getUserProfile(user?.id); // Gọi API
        setUserProfile(data); // Cập nhật dữ liệu hồ sơ
      } catch (err) {
        console.error("Lỗi khi tải thông tin cá nhân:", err);
      } finally {
        setIsLoading(false); // Kết thúc tải, đặt isLoading là false
      }
    };

    fetchUserProfile(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []); // useEffect chỉ chạy một lần sau khi render ban đầu

  // Hiển thị trạng thái tải
  if (isLoading) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-center items-center h-40">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  // Hiển thị form với dữ liệu đã tải hoặc thông báo nếu không có dữ liệu
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {userProfile ? (
          <ProfileForm initialData={userProfile} />
        ) : (
          <p>Không có thông tin hồ sơ để hiển thị.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfilePage;

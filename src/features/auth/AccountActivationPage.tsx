import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from '../../hooks/use-toast';
import { useUser } from '../../hooks/use-user'; // Import useUser hook
import { authService } from '../../services/authService';

/**
 * Component hiển thị trang kích hoạt tài khoản.
 * Người dùng sẽ được chuyển hướng đến trang này nếu tài khoản của họ chưa được kích hoạt.
 */
const AccountActivationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { logout  } = useUser(); // Lấy hàm logout từ useUser hook
  const navigate = useNavigate(); // Khởi tạo useNavigate

  /**
   * Xử lý việc gửi lại email kích hoạt.
   * Gọi API để yêu cầu hệ thống gửi lại email kích hoạt đến địa chỉ email đã đăng ký.
   */
  const handleResendActivationEmail = async () => {
    setLoading(true);
    try {
      // Gọi API để gửi lại email kích hoạt
      await authService.resendActivationEmail();
      toast({
        title: "Thành công!",
        description: "Email kích hoạt đã được gửi lại. Vui lòng kiểm tra hộp thư đến của bạn.",
      });
    } catch (error) {
      console.error('Lỗi khi gửi lại email kích hoạt:', error);
      toast({
        title: "Lỗi!",
        description: "Không thể gửi lại email kích hoạt. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xử lý việc đăng nhập bằng tài khoản khác.
   * Thực hiện đăng xuất tài khoản hiện tại và chuyển hướng đến trang đăng nhập.
   */
  const handleLoginAnotherAccount = () => {
    logout(); // Đăng xuất tài khoản hiện tại
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Kích Hoạt Tài Khoản</CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra hộp thư đến (và cả thư mục spam) để tìm email kích hoạt.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-700 dark:text-300">
            Nếu bạn không nhận được email, bạn có thể yêu cầu gửi lại:
          </p>
          <Button onClick={handleResendActivationEmail} className="w-full" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi Lại Email Kích Hoạt'}
          </Button>
          <Button onClick={handleLoginAnotherAccount} className="w-full mt-4" variant="outline">
            Đăng nhập bằng tài khoản khác
          </Button>
        </CardContent>
      </Card>
  );
};

export default AccountActivationPage;
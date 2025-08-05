import { Axios } from '@/api/Axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @component SellerRegistration
 * @description React component to display the seller registration page.
 * Bao gồm tiêu đề, danh sách chính sách, nút gửi và liên kết chính sách.
 */
const SellerRegistration: React.FC = () => {
  const {user} = useUser();
  const policies = [
    'Chính sách chung về việc bán hàng và sử dụng nền tảng.',
    'Tiêu chuẩn sản phẩm và yêu cầu chất lượng đối với các mặt hàng được bán.',
    'Chính sách thanh toán, phí và quy trình tính toán hoa hồng.',
    'Hỗ trợ đối tác, bao gồm tài liệu, đào tạo và các kênh liên lạc.',
    'Quyền và nghĩa vụ của người bán khi tham gia nền tảng.',
  ];
  const { toast } = useToast();

  // Hàm xử lý sự kiện nhấp nút "Gửi yêu cầu đăng ký"
  const handleClick = async () => {
    // Lấy userId từ localStorage
    const userId = user?.id;

    // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Gọi API
     const response =  await Axios.get(`/api/admin/approveOrCancelByUserId/${userId}`);
      toast({
        title: 'Thành công',
        description: 'Yêu cầu đăng ký của bạn đã được gửi thành công!',
      });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      toast({
        title: 'Lỗi',
        description: error.response?.data?.message || 'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto p-8 shadow-lg rounded-lg">
        <CardHeader className="text-center mb-8">
          {/* Tiêu đề trang đăng ký người bán */}
          <CardTitle className="text-3xl font-bold text-gray-900">Đăng ký người bán</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6 text-lg">
            Chào mừng bạn đến với trang đăng ký người bán. Vui lòng đọc kỹ các chính sách dưới đây trước khi gửi yêu cầu.
          </p>

          <ul className="list-disc list-inside space-y-4 mb-8 text-gray-800">
            {/* Danh sách các chính sách người bán */}
            {policies.map((policy, index) => (
              <li key={index} className="text-base">
                {policy}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center space-y-4">
            {/* Nút gửi yêu cầu đăng ký */}
            <Button size="lg" className="w-full max-w-xs" onClick={handleClick}>
              Gửi yêu cầu đăng ký
            </Button>
            {/* Liên kết đến các chính sách khác */}
            <p className="text-sm text-gray-600">
              Bằng cách gửi yêu cầu, bạn đồng ý với{' '}
              <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                Điều khoản dịch vụ
              </Link>{' '}
              và{' '}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Chính sách quyền riêng tư
              </Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerRegistration;
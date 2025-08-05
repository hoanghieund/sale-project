import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders the Privacy Policy page.
 *
 * @returns {JSX.Element} The rendered Privacy Policy page.
 */
const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto my-12">
      <Card className="bg-white border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Chính sách Bảo mật
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Cảm ơn bạn đã ghé thăm trang web của chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
          <h3 className="text-xl font-semibold">1. Thu thập thông tin</h3>
          <p>
            Chúng tôi có thể thu thập thông tin cá nhân từ bạn khi bạn đăng ký tài khoản, đặt hàng hoặc liên hệ với chúng tôi. Thông tin này có thể bao gồm tên, địa chỉ email, số điện thoại và địa chỉ giao hàng của bạn.
          </p>
          <h3 className="text-xl font-semibold">2. Sử dụng thông tin</h3>
          <p>
            Thông tin của bạn được sử dụng để xử lý đơn hàng, cung cấp dịch vụ khách hàng và gửi cho bạn thông tin cập nhật về các sản phẩm và chương trình khuyến mãi của chúng tôi.
          </p>
          <h3 className="text-xl font-semibold">3. Bảo vệ thông tin</h3>
          <p>
            Chúng tôi thực hiện các biện pháp bảo mật để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
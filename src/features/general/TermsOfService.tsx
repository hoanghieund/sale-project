import React from 'react';

/**
 * Component hiển thị trang Điều khoản dịch vụ.
 *
 * @returns {JSX.Element} The rendered TermsOfService component.
 * @constructor
 */
const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Điều khoản dịch vụ</h1>
      <div className="space-y-4">
        <p>
          Chào mừng bạn đến với trang web của chúng tôi. Nếu bạn tiếp tục duyệt và sử dụng trang web này, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng sau đây, cùng với chính sách bảo mật của chúng tôi chi phối mối quan hệ của chúng tôi với bạn liên quan đến trang web này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản và điều kiện này, vui lòng không sử dụng trang web của chúng tôi.
        </p>
        <p>
          Thuật ngữ 'chúng tôi' hoặc 'chúng ta' đề cập đến chủ sở hữu của trang web. Thuật ngữ 'bạn' đề cập đến người dùng hoặc người xem trang web của chúng tôi. Việc sử dụng trang web này tuân theo các điều khoản sử dụng sau đây:
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>Nội dung của các trang của trang web này chỉ dành cho thông tin chung và sử dụng của bạn. Nó có thể thay đổi mà không cần thông báo trước.</li>
            <li>Trang web này sử dụng cookie để theo dõi sở thích duyệt web. Nếu bạn cho phép sử dụng cookie, thông tin cá nhân sau đây có thể được chúng tôi lưu trữ để sử dụng bởi các bên thứ ba.</li>
            <li>Cả chúng tôi và bất kỳ bên thứ ba nào đều không cung cấp bất kỳ bảo hành hoặc đảm bảo nào về tính chính xác, kịp thời, hiệu suất, tính đầy đủ hoặc tính phù hợp của thông tin và tài liệu được tìm thấy hoặc cung cấp trên trang web này cho bất kỳ mục đích cụ thể nào. Bạn thừa nhận rằng thông tin và tài liệu đó có thể chứa những điểm không chính xác hoặc lỗi và chúng tôi loại trừ rõ ràng trách nhiệm pháp lý đối với bất kỳ sự không chính xác hoặc lỗi nào như vậy trong phạm vi tối đa được pháp luật cho phép.</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService;
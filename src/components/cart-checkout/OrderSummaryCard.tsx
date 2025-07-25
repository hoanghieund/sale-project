import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho CartType, có thể cần điều chỉnh tùy theo cấu trúc dữ liệu thực tế của bạn
interface CartType {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  // Các trường khác của giỏ hàng nếu có
}

interface OrderSummaryCardProps {
  cart: CartType;
  onApplyCoupon: (couponCode: string) => void;
  onRemoveCoupon: () => void;
  couponError?: string;
  checkoutButtonLink?: string;
  continueShoppingButtonLink?: string;
}

/**
 * @component OrderSummaryCard
 * @param {OrderSummaryCardProps} props - Props cho component OrderSummaryCard.
 * @param {CartType} props.cart - Đối tượng chứa thông tin tổng quan giỏ hàng.
 * @param {(couponCode: string) => void} props.onApplyCoupon - Hàm callback khi áp dụng mã giảm giá.
 * @param {() => void} props.onRemoveCoupon - Hàm callback khi xóa mã giảm giá.
 * @param {string} [props.couponError] - Thông báo lỗi nếu có khi áp dụng mã giảm giá.
 * @param {string} [props.checkoutButtonLink] - Liên kết cho nút thanh toán.
 * @param {string} [props.continueShoppingButtonLink] - Liên kết cho nút tiếp tục mua sắm.
 * @returns {JSX.Element} Component OrderSummaryCard.
 */
const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  cart,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  checkoutButtonLink,
  continueShoppingButtonLink,
}) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    onApplyCoupon(couponCode);
  };

  const handleRemove = () => {
    setCouponCode('');
    onRemoveCoupon();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tóm tắt đơn hàng</CardTitle>
        <CardDescription>Chi tiết về tổng phụ, giảm giá, vận chuyển và tổng cộng.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span>Tổng phụ</span>
          <span>${cart.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Giảm giá</span>
          <span className="text-red-500">- ${cart.discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Vận chuyển</span>
          <span>${cart.shipping.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Thuế</span>
          <span>${cart.tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-bold text-lg">
          <span>Tổng cộng</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Mã giảm giá</h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Nhập mã giảm giá"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={handleApply} disabled={!couponCode}>Áp dụng</Button>
          </div>
          {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
          {cart.discount > 0 && (
            <Button variant="link" onClick={handleRemove} className="p-0 h-auto text-sm mt-2">
              Xóa mã giảm giá
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {checkoutButtonLink && (
          <Link to={checkoutButtonLink} className="w-full">
            <Button className="w-full">Tiến hành thanh toán</Button>
          </Link>
        )}
        {continueShoppingButtonLink && (
          <Link to={continueShoppingButtonLink} className="w-full">
            <Button variant="outline" className="w-full">Tiếp tục mua sắm</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shop } from "@/types";
import { formatCurrencyUSD } from "@/utils/formatters";
import { Link } from "react-router-dom";

/**
 * @interface ShopInfoCardProps
 * @description Định nghĩa props cho component ShopInfoCard.
 * @property {Shop} shop - Đối tượng chứa thông tin chi tiết về cửa hàng.
 */
interface ShopInfoCardProps {
  shop: Shop;
}

/**
 * @function ShopInfoCard
 * @description Component hiển thị thông tin chi tiết của một cửa hàng.
 * @param {ShopInfoCardProps} { shop } - Props chứa thông tin cửa hàng.
 * @returns {JSX.Element} Một thẻ div chứa thông tin cửa hàng.
 */
const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ shop }) => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-4 pt-6">
        <Avatar className="w-20 h-20 border-2 border-input">
          <AvatarImage src={shop.avatar} alt={shop.name} />
          <AvatarFallback className="text-xl font-bold">{shop.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <Link to={`/shop/${shop.id}`} className="text-xl font-bold text-primary hover:underline">
            {shop.name}
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            {shop.totalQuantity !== undefined && (
              <p>
                <span className="font-medium">Tổng sản phẩm:</span> {shop?.totalQuantity || 0}
              </p>
            )}
            {shop.totalPrice !== undefined && (
              <p>
                <span className="font-medium">Tổng doanh thu:</span>{" "}
                {formatCurrencyUSD(shop?.totalPrice || 0)}
              </p>
            )}
            {shop.status !== undefined && (
              <Badge variant={shop.status ? "default" : "destructive"}>
                {shop.status ? "Đang hoạt động" : "Tạm dừng"}
              </Badge>
            )}
            {shop.timeRequest && (
              <p className="text-xs text-muted-foreground">
                Tham gia từ: {new Date(shop.timeRequest).toLocaleDateString("vi-VN")}
              </p>
            )}
          </div>
        </div>
        <Button asChild variant="outline">
          <Link to={`/shop/${shop.id}`}>Xem shop</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopInfoCard;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shop } from "@/types";
import { Link } from "react-router-dom";

/**
 * @interface ShopInfoCardProps
 * @description Defines props for the ShopInfoCard component.
 * @property {Shop} shop - Object containing detailed shop information.
 */
interface ShopInfoCardProps {
  shop: Shop;
}

/**
 * @function ShopInfoCard
 * @description Component displaying detailed information about a shop.
 * @param {ShopInfoCardProps} { shop } - Props containing shop information.
 * @returns {JSX.Element} A div card containing shop information.
 */
const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ shop }) => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-4 pt-6">
        <Avatar className="w-20 h-20 border-2 border-input">
          <AvatarImage src={shop.avatar} alt={shop.name} />
          <AvatarFallback className="text-xl font-bold">
            {shop.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <Link
            to={`/shop/${shop.slug}`}
            className="text-xl font-bold text-primary hover:underline"
          >
            {shop.name}
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            {shop.totalProduct !== undefined && (
              <p>
                <span className="font-medium">Total Products:</span>{" "}
                {shop?.totalProduct || 0}
              </p>
            )}
            {shop.totalProductSold !== undefined && (
              <p>
                <span className="font-medium">Total Sold:</span>{" "}
                {shop?.totalProductSold || 0}
              </p>
            )}
            {shop.totalReview !== undefined && (
              <p>
                <span className="font-medium">Total Review:</span>{" "}
                {shop?.totalReview || 0}
              </p>
            )}
            {shop.status !== undefined && (
              <Badge variant={shop.status ? "default" : "destructive"}>
                {shop.status ? "Active" : "Paused"}
              </Badge>
            )}
            {shop.timeRequest && (
              <p className="text-xs text-muted-foreground">
                Joined: {new Date(shop.timeRequest).toLocaleDateString("en-US")}
              </p>
            )}
          </div>
        </div>
        <Button asChild variant="outline">
          <Link to={`/shop/${shop.slug}`}>View Shop</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopInfoCard;

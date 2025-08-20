import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Shop } from "@/types";
import { Link } from "react-router-dom";

/**
 * ShopCard Component
 * Hiển thị thông tin của một shop trong dạng card
 * @param {Shop} shop - Đối tượng shop cần hiển thị
 */
interface ShopCardProps {
  shop: Shop;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      {/* Banner của shop */}
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={shop.banner || "/placeholder.svg"}
          alt={`${shop.name} banner`}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="p-4 relative">
        {/* Avatar của shop */}
        <div className="absolute -top-10 left-4 h-16 w-16 rounded-full border-4 border-white overflow-hidden bg-white">
          <img
            src={shop.avatar || "/placeholder.svg"}
            alt={`${shop.name} avatar`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Thông tin shop */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold line-clamp-1">{shop.name}</h3>
            {shop.status && (
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <div>
              <span className="font-medium text-gray-700">
                {shop.totalProductInShop || 0}
              </span>{" "}
              Products
            </div>
            <div>
              <span className="font-medium text-gray-700">
                {shop.totalReviewInShop || 0}
              </span>{" "}
              Reviews
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/shop/${shop.slug}`}>Visit Shop</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;

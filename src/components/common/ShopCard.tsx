import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Shop } from "@/types";
import { CheckCircle, ExternalLink, MessageSquare, Package, Store } from "lucide-react";
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
    <Card>
      {/* Banner của shop */}
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={shop.banner || "/placeholder.svg"}
          alt={`${shop.name} banner`}
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>

        {/* Shop status badge */}
        {shop.status && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span className="hidden sm:inline">Verified</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified Shop</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <CardContent className="p-4 relative">
        {/* Avatar của shop */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="absolute -top-10 left-4 h-16 w-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={shop.avatar || "/placeholder.svg"}
                  alt={`${shop.name} avatar`}
                />
                <AvatarFallback>
                  {shop.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={shop.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {shop.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{shop.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {shop.description || "No description available"}
                </p>
                <div className="flex items-center pt-2">
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {shop.totalProductInShop || 0} products
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Thông tin shop */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300 flex items-center">
              <Store className="h-4 w-4 mr-1 inline-block text-primary" />
              {shop.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4  text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <Package className="h-3 w-3 mr-1 text-gray-500" />
              <span className="font-medium text-gray-700">
                {shop.totalProductInShop || 0}
              </span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1 text-primary" />
              <span className="font-medium text-gray-700">
                {shop.totalReviewInShop || 0}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full sm:w-auto transition-all duration-300 hover:bg-primary hover:text-primary-foreground group"
        >
          <Link
            to={`/shop/${shop.slug}`}
            className="flex items-center justify-center"
          >
            <span>Visit Shop</span>
            <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;

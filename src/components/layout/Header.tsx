import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { NAVIGATION_MENU } from "../../data/constants";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-sport-dark text-white text-center py-2 text-sm">
        SUMMER RUNNING TRACK! 5% OFF WITH COUPON "HELLODONEKICK"
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    placeholder="What are you looking for?"
                    className="w-64 pr-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                {searchQuery && (
                  <Button variant="ghost" size="sm" onClick={clearSearch}>
                    Clear
                  </Button>
                )}
              </form>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <MobileNavigation
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-center">
              <span className="text-sport-dark">DONEKICK</span>
              <div className="text-xs text-muted-foreground font-normal">
                SPORTS
              </div>
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Search */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              <Link to="/wishlist" className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  {getWishlistCount() > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {getWishlistCount()}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" data-testid="cart-icon">
                  <ShoppingBag className="h-5 w-5" />
                  {getCartItemsCount() > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {getCartItemsCount()}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center py-4 border-t border-border">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {NAVIGATION_MENU.map(item => (
                  <NavigationMenuItem key={item.id}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {item.children.map(child => (
                              <div key={child.id}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {child.label}
                                    </div>
                                    {child.children && (
                                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {child.children
                                          .map(subChild => subChild.label)
                                          .join(", ")}
                                      </div>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
    </>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({ onClose }: { onClose: () => void }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="mt-6 space-y-4">
      {NAVIGATION_MENU.map(item => (
        <div key={item.id}>
          {item.children ? (
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => toggleExpanded(item.id)}
              >
                {item.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes(item.id) ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {expandedItems.includes(item.id) && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.children.map(child => (
                    <div key={child.id}>
                      <Link
                        to={child.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                      {child.children && (
                        <div className="ml-4 space-y-1">
                          {child.children.map(subChild => (
                            <Link
                              key={subChild.id}
                              to={subChild.href}
                              className="block py-1 text-xs text-muted-foreground hover:text-foreground"
                              onClick={onClose}
                            >
                              {subChild.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.href}
              className="block py-2 text-sm font-medium"
              onClick={onClose}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;

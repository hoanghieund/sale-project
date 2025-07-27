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
  SheetTrigger
} from "@/components/ui/sheet";
import {
  ChevronDown,
  Heart,
  LogIn,
  Menu,
  Search,
  ShoppingBag,
  User, // Import LogIn icon
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { NAVIGATION_MENU } from "../../data/constants";
import { useUser } from "../../hooks/use-user"; // Import useUser hook

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, isAuthenticated } = useUser(); // Use useUser hook

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-medium tracking-wide">
        PREMIUM COLLECTION! 10% OFF WITH COUPON "HELLOSHOP"
      </div>

      {/* Main Header */}
      <header
        className={`bg-background border-b border-border sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-2.5">
            {/* Mobile Search - Top Row */}
            {isSearchOpen && (
              <div className="md:hidden absolute top-0 left-0 right-0 z-50 bg-background py-3 px-4 animate-in fade-in slide-in-from-top duration-300">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search for products..."
                      className="pr-10 rounded-full border-muted focus-visible:ring-primary"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full rounded-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                    onClick={() => {
                      clearSearch();
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    placeholder="Search for products..."
                    className="w-72 pr-10 rounded-full border-muted focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-full hover:bg-primary/10"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="rounded-full hover:bg-primary/10"
                  >
                    Clear
                  </Button>
                )}
              </form>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader className="flex justify-between items-center pr-4">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <MobileNavigation
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-xl font-bold">
                <span>SHOP</span>
              </div>
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/account">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>

                  <Link to="/wishlist" className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full hover:bg-primary/10"
                    >
                      <Heart className="h-5 w-5" />
                      {getWishlistCount() > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {getWishlistCount()}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link to="/cart" className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full hover:bg-primary/10"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      {getCartItemsCount() > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {getCartItemsCount()}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                    >
                      <LogIn className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                    >
                      <UserPlus className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Navigation */}
          <nav className="hidden md:flex py-2 justify-center border-t border-border">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {NAVIGATION_MENU.map(item => (
                  <NavigationMenuItem key={item.id}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-8 rounded-md px-2.5">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[750px] grid-cols-3">
                            {item.children.map(child => (
                              <div key={child.id}>
                                <NavigationMenuLink className="bg-card" asChild>
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
                className="w-full justify-between hover:bg-primary/5 rounded-md"
                onClick={() => toggleExpanded(item.id)}
              >
                {item.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedItems.includes(item.id) ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {expandedItems.includes(item.id) && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-border pl-3 animate-in slide-in-from-top duration-200">
                  {item.children.map(child => (
                    <div key={child.id}>
                      <Link
                        to={child.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                      {child.children && (
                        <div className="ml-4 space-y-1 border-l border-border/50 pl-2">
                          {child.children.map(subChild => (
                            <Link
                              key={subChild.id}
                              to={subChild.href}
                              className="block py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
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
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
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

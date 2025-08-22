import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useCart } from "@/providers/cart-provider";
import {
  ChevronDown,
  Handshake,
  History,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  Store,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user"; // Import useUser hook
import { categoryService } from "../../services/categoryService"; // Import categoryService
import { Category } from "../../types"; // Import Category type
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useUser(); // Use useUser hook
  const { getCartItemsCount } = useCart();
  const isRoleShop = !!user?.roles?.find(role => {
    return role.name === "ROLE_SHOP_MANAGER";
  });
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]); // State to store featured category data
  const [allCategories, setAllCategories] = useState<Category[]>([]); // State to store all category data

  // Fetch all category data from API
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await categoryService.getAllCategory();
        setAllCategories(response);
        setFeaturedCategories(
          response.filter(category => category.isShowSuggest === true)
        );
      } catch (error) {
        console.error("Error fetching all categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

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
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
          {/* Center Row */}
          <div className="flex items-center justify-between pb-2.5 md:pb-0 md:pt-2 md:gap-8">
            {/* Logo */}
            <div className="flex items-center md:gap-2">
              {/* Sử dụng logo từ public/logo.png để thống nhất branding */}
              <Link to="/" className="flex items-center" aria-label="Home">
                {/* Tăng kích thước logo và thêm responsive để hiển thị tốt trên màn hình lớn */}
                <img
                  src="/logo.png"
                  alt="Shop Logo"
                  className="h-14 md:h-16 lg:h-18 w-auto"
                />
              </Link>
              {/* All Categories Button - Desktop */}
              <Sheet
                open={isCategoryMenuOpen}
                onOpenChange={setIsCategoryMenuOpen}
              >
                <SheetTrigger asChild>
                  {/* Đồng bộ hover với NavigationMenu (featuredCategories): dùng accent để nhất quán shadcn */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <Menu className="h-5 w-5" />{" "}
                    <span className="hidden md:inline">Categories</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader className="flex justify-between items-center pr-4">
                    <SheetTitle>Categories</SheetTitle>
                  </SheetHeader>
                  <MobileNavigation
                    onClose={() => setIsCategoryMenuOpen(false)}
                    categories={allCategories} // Pass all categories
                  />
                </SheetContent>
              </Sheet>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

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
                    className="rounded-full hover:bg-primary"
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
            <div className="hidden md:flex items-center gap-4 flex-1">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 flex-1"
              >
                <div className="relative flex-1 max-w-[768px] mx-auto">
                  <Input
                    placeholder="Search for products..."
                    className="w-full pr-10 rounded-full border-border border-2 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-full hover:bg-primary"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link
                        to={isRoleShop ? "/seller" : "/seller-registration"}
                      >
                        {isRoleShop ? (
                          <Store className="h-4 w-4" />
                        ) : (
                          <Handshake className="h-4 w-4" />
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {isRoleShop ? "Seller Center" : "Become a seller"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link to="/help">
                        <LifeBuoy className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Help Center</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/cart" className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full hover:bg-primary"
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
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Shopping Cart</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-7 w-7 cursor-pointer">
                        <AvatarImage src={user?.avatar} alt={user?.avatar} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel className="text-base">
                        {user?.username}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate("/account/profile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/account/orders")}
                      >
                        <History className="mr-2 h-4 w-4" />
                        Order History
                      </DropdownMenuItem>
                      {isRoleShop ? (
                        <>
                          <DropdownMenuItem onClick={() => navigate("/seller")}>
                            <Store className="mr-2 h-4 w-4" />
                            Seller Channel
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem
                            onClick={() => navigate("/seller-registration")}
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Seller Registration
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/login">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-primary"
                        >
                          <LogIn className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Login</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          {/* Bottom Row - Navigation */}
          <nav className="hidden md:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {(featuredCategories || []).map(item => (
                  <NavigationMenuItem key={item.id}>
                    {item.child && item.child.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-8 rounded-md px-2.5 uppercase">
                          <Link
                            to={`/category/${item.slug}`} // Navigate to parent category page
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[700px] grid-cols-3">
                            {/* Links for subcategories */}
                            {item.child.map(child => (
                              <div key={child.id}>
                                <NavigationMenuLink className="bg-card" asChild>
                                  <Link
                                    to={`/category/${item.slug}/${child.slug}`} // Navigate to child category page
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground uppercase"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {child.name}
                                    </div>
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
                          to={`/category/${item.slug}`} // Use id to create path
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 uppercase"
                        >
                          {item.name}
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
const MobileNavigation = ({
  onClose,
  categories,
}: {
  onClose: () => void;
  // `categories` can be featured categories or all categories
  categories: Category[];
}) => {
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
      {categories.map(item => (
        <div key={item.id}>
          {item.child && item.child.length > 0 ? (
            <div>
              {/* Đồng bộ hover với NavigationMenu: sử dụng accent cho hover/focus */}
              <Button
                variant="ghost"
                className="w-full justify-between rounded-md uppercase hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => toggleExpanded(item.id.toString())} // Convert id to string
              >
                <Link
                  to={`/category/${item.slug}`} // Navigate to parent category page
                  onClick={onClose}
                >
                  {item.name}
                </Link>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedItems.includes(item.id.toString())
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Button>
              {expandedItems.includes(item.id.toString()) && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-border pl-3 animate-in slide-in-from-top duration-200">
                  {item.child.map(child => (
                    <div key={child.id}>
                      {/* Subcategory link: đồng bộ hover với NavigationMenu */}
                      <Link
                        to={`/category/${item.slug}/${child.slug}`} // Use id to create path
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground uppercase"
                        onClick={onClose}
                      >
                        {child.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Leaf category link: đồng bộ hover với NavigationMenu */}
              <Link
                to={`/category/${item.slug}`} // Use id to create path
                className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground uppercase"
                onClick={onClose}
              >
                {item.name}
              </Link>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;

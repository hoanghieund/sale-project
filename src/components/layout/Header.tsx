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
import { useUser } from "../../hooks/use-user"; // Import useUser hook
import { categoryService } from "../../services/categoryService"; // Import categoryService
import { Category } from "../../types"; // Import Category type

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, isAuthenticated } = useUser(); // Use useUser hook
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]); // State để lưu trữ dữ liệu danh mục nổi bật
  const [allCategories, setAllCategories] = useState<Category[]>([]); // State để lưu trữ tất cả dữ liệu danh mục
 
  // Lấy dữ liệu danh mục nổi bật từ API
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const response = await categoryService.getSuggestCategory();
        // Ánh xạ dữ liệu API sang định dạng Category[]
        setFeaturedCategories(response);
      } catch (error) {
        console.error("Error fetching featured categories:", error);
      }
    };
    fetchFeaturedCategories();
  }, []);

  // Lấy tất cả dữ liệu danh mục từ API
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await categoryService.getCategoryTree(0, 10000);
        setAllCategories(response);
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

              {/* All Categories Button - Desktop */}
              <Sheet open={isCategoryMenuOpen} onOpenChange={setIsCategoryMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-primary/10"
                  >
                   <Menu className="h-5 w-5" /> Category
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader className="flex justify-between items-center pr-4">
                    <SheetTitle>Category</SheetTitle>
                  </SheetHeader>
                  <MobileNavigation
                    onClose={() => setIsCategoryMenuOpen(false)}
                    categories={allCategories} // Truyền tất cả danh mục
                  />
                </SheetContent>
              </Sheet>
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
                    categories={allCategories} // Truyền categories nổi bật xuống MobileNavigation
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
                {featuredCategories.map(item => (
                  <NavigationMenuItem key={item.id}>
                    {item.child && item.child.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-8 rounded-md px-2.5">
                          <Link
                            to={`/category/${item.id}`} // Điều hướng đến trang category cha
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[750px] grid-cols-3">
                            {/* Các link cho danh mục con */}
                            {item.child.map(child => (
                              <div key={child.id}>
                                <NavigationMenuLink className="bg-card" asChild>
                                  <Link
                                    to={`/subcategory/${child.id}`} // Điều hướng đến trang category của danh mục con
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                          to={`/category/${item.id}`} // Sử dụng id để tạo đường dẫn
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
  // `categories` có thể là danh mục nổi bật hoặc tất cả danh mục
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
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-primary/5 rounded-md"
                onClick={() => toggleExpanded(item.id.toString())} // Convert id to string
              >
                <Link
                  to={`/category/${item.id}`} // Điều hướng đến trang category cha
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
                      <Link
                        to={`/subcategory/${child.id}`} // Sử dụng id để tạo đường dẫn
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
            <Link
              to={`/category/${item.id}`} // Sử dụng id để tạo đường dẫn
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={onClose}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;

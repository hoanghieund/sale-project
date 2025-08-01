/**
 * AccountSidebar Component
 * @description Sidebar for user account management pages, with navigation links and active state highlighting.
 * @returns {JSX.Element}
 */
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Import cn utility for conditional classes
import { User, MapPin, Package, Lock } from 'lucide-react'; // Import icons

const AccountSidebar = (): JSX.Element => {
  const location = useLocation(); // Get current location to determine active link

  // Define navigation links with names, paths, and icons
  const navLinks = [
    { name: 'Hồ sơ', path: '/account/profile', icon: User },
    { name: 'Địa chỉ', path: '/account/address', icon: MapPin },
    { name: 'Lịch sử đơn hàng', path: '/account/orders', icon: Package },
    { name: 'Đổi mật khẩu', path: '/account/change-password', icon: Lock },
  ];

  return (
    // Card-like container for the sidebar
    <div className="w-full rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">Tài khoản của tôi</h3>
      </div>
      <div className="p-4 pt-0">
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <Button
                key={link.path}
                asChild
                variant={isActive ? 'secondary' : 'ghost'} // Highlight active link
                className={cn('w-full justify-start')}
              >
                <Link to={link.path} className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AccountSidebar;
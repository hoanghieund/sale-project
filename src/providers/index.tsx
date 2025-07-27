import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import RecentlyViewedProvider from "@/context/RecentlyViewedContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ModeProvider } from "./mode-provider";
import { UserProvider } from "./user-provider";

// Tạo query client với config tối ưu
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 phút
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ModeProvider>
          <UserProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </UserProvider>
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Providers;

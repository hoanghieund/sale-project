import { TooltipProvider } from "@/components/ui/tooltip";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CartProvider } from "./cart-provider";
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
          {/* Cấu hình PayPalScriptProvider với client ID và currency */}
          <PayPalScriptProvider
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT,
            }}
          >
            <UserProvider>
              <CartProvider>{children}</CartProvider>
            </UserProvider>
          </PayPalScriptProvider>
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Providers;

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "react-cookie-consent";
import Providers from "@/providers";
import AppRouter from "@/router/AppRouter";
import { trackCookieConsent, initAnalytics } from "@/utils/analytics";
import { useEffect } from "react";

const App = () => {
  // Khởi tạo analytics khi ứng dụng khởi động
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Providers>
      <AppRouter />
      <Toaster />
      <Sonner />
      <CookieConsent
        location="bottom"
        buttonText="Accept All Cookies"
        declineButtonText="Decline"
        cookieName="eulotus-cookie-consent"
        style={{
          background: "#fff",
          color: "#000",
          borderTop: "1px solid #e2e8f0",
          boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          zIndex: 9999,
          alignItems: "center"
        }}
        buttonStyle={{
          background: "#000",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem"
        }}
        declineButtonStyle={{
          background: "transparent",
          border: "1px solid #e2e8f0",
          fontSize: "13px",
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
          marginRight: "0.5rem"
        }}
        contentStyle={{
          flex: "1",
          margin: "0"
        }}
        expires={150}
        enableDeclineButton
        flipButtons
        hideOnAccept
        onAccept={() => {
          // Gọi hàm tracking khi người dùng chấp nhận cookie
          trackCookieConsent('accepted');
        }}
        onDecline={() => {
          // Gọi hàm tracking khi người dùng từ chối cookie
          trackCookieConsent('declined');
        }}
      >
        <span className="text-sm">
          This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to our use of cookies in accordance with our{" "}
          <a href="/privacy-policy" className="underline text-primary hover:text-primary/80">
            Privacy Policy
          </a>.
        </span>
      </CookieConsent>
    </Providers>
  );
};

export default App;

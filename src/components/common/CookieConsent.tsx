import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * CookieConsent component hiển thị thông báo chấp nhận cookie
 * Lưu trạng thái đã chấp nhận vào localStorage để không hiển thị lại
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kiểm tra xem người dùng đã tương tác với thông báo cookie chưa (accept hoặc decline)
    const cookiePreference = localStorage.getItem("cookiePreference");

    // Nếu chưa tương tác, hiển thị thông báo
    if (!cookiePreference) {
      // Đợi 1 giây trước khi hiển thị để tránh hiển thị ngay khi trang tải
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Xử lý khi người dùng chấp nhận cookie
  const handleAccept = () => {
    localStorage.setItem("cookiePreference", "accepted");
    setIsVisible(false);
  };

  // Xử lý khi người dùng từ chối cookie
  const handleClose = () => {
    // Lưu trạng thái đã từ chối để không hiển thị lại
    localStorage.setItem("cookiePreference", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full px-4 z-50">
      <Card className="p-4 shadow-lg bg-white border border-border">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">Cookie Notice</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          We use cookies to enhance your browsing experience, serve personalized
          ads or content, and analyze our traffic. By clicking "Accept", you
          consent to our use of cookies.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleClose}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;

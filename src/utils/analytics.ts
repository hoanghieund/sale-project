/**
 * Module quản lý analytics cho ứng dụng
 * Cung cấp các hàm để theo dõi sự kiện người dùng
 */

// Các loại sự kiện có thể được theo dõi
export enum EventType {
  COOKIE_CONSENT = 'cookie_consent',
  PAGE_VIEW = 'page_view',
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  PRODUCT_VIEW = 'product_view',
  ADD_TO_CART = 'add_to_cart',
  CHECKOUT = 'checkout',
  PURCHASE = 'purchase',
}

// Interface cho dữ liệu sự kiện
export interface EventData {
  [key: string]: any;
}

/**
 * Gửi sự kiện đến dịch vụ analytics
 * @param eventType - Loại sự kiện
 * @param eventData - Dữ liệu bổ sung cho sự kiện
 */
export const trackEvent = (eventType: EventType, eventData: EventData = {}): void => {
  // Kiểm tra xem người dùng đã chấp nhận cookie chưa
  const cookieConsent = localStorage.getItem('eulotus-cookie-consent');
  if (cookieConsent !== 'true' && eventType !== EventType.COOKIE_CONSENT) {
    // Nếu người dùng chưa chấp nhận cookie và không phải là sự kiện cookie consent, không theo dõi
    console.log('Analytics tracking disabled: User has not accepted cookies');
    return;
  }

  // Log sự kiện cho mục đích phát triển
  console.log(`[Analytics] Event: ${eventType}`, eventData);

  // Trong môi trường thực tế, bạn sẽ gửi dữ liệu đến dịch vụ analytics
  // Ví dụ: Google Analytics, Mixpanel, hoặc dịch vụ tùy chỉnh

  // Mẫu code để tích hợp với Google Analytics (gtag)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventType, eventData);
  }

  // Mẫu code để tích hợp với Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventType, eventData);
  }
};

/**
 * Theo dõi sự kiện cookie consent
 * @param status - Trạng thái chấp nhận: 'accepted' hoặc 'declined'
 */
export const trackCookieConsent = (status: 'accepted' | 'declined'): void => {
  trackEvent(EventType.COOKIE_CONSENT, { status });
  
  // Nếu người dùng chấp nhận, chúng ta có thể khởi tạo các dịch vụ analytics khác
  if (status === 'accepted') {
    // Khởi tạo các dịch vụ analytics khác nếu cần
    console.log('Analytics services initialized');
  }
};

/**
 * Theo dõi lượt xem trang
 * @param pageName - Tên trang
 * @param pageUrl - URL của trang
 */
export const trackPageView = (pageName: string, pageUrl: string = window.location.href): void => {
  trackEvent(EventType.PAGE_VIEW, { pageName, pageUrl });
};

/**
 * Theo dõi sự kiện click nút
 * @param buttonName - Tên hoặc ID của nút
 * @param buttonLocation - Vị trí của nút trong UI
 */
export const trackButtonClick = (buttonName: string, buttonLocation: string): void => {
  trackEvent(EventType.BUTTON_CLICK, { buttonName, buttonLocation });
};

/**
 * Khởi tạo module analytics
 * Gọi hàm này khi ứng dụng khởi động
 */
export const initAnalytics = (): void => {
  console.log('Analytics module initialized');
  
  // Kiểm tra xem người dùng đã chấp nhận cookie chưa
  const cookieConsent = localStorage.getItem('eulotus-cookie-consent');
  if (cookieConsent === 'true') {
    console.log('Analytics tracking enabled: User has accepted cookies');
  } else {
    console.log('Analytics tracking disabled: User has not accepted cookies');
  }
};

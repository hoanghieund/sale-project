# Analytics Module

Module này cung cấp các hàm tiện ích để theo dõi hành vi người dùng và các sự kiện trong ứng dụng Eulotus.

## Cách sử dụng

### 1. Khởi tạo Analytics

Khởi tạo module analytics trong component cấp cao nhất của ứng dụng (đã được thêm vào `App.tsx`):

```tsx
import { initAnalytics } from "@/utils/analytics";

useEffect(() => {
  initAnalytics();
}, []);
```

### 2. Theo dõi sự kiện Cookie Consent

```tsx
import { trackCookieConsent } from "@/utils/analytics";

// Khi người dùng chấp nhận cookie
trackCookieConsent('accepted');

// Khi người dùng từ chối cookie
trackCookieConsent('declined');
```

### 3. Theo dõi lượt xem trang

```tsx
import { trackPageView } from "@/utils/analytics";

// Theo dõi lượt xem trang hiện tại
trackPageView('Trang chủ');

// Theo dõi lượt xem trang với URL tùy chỉnh
trackPageView('Trang sản phẩm', 'https://eulotus.com/products/123');
```

### 4. Theo dõi sự kiện click nút

```tsx
import { trackButtonClick } from "@/utils/analytics";

// Theo dõi sự kiện click nút
trackButtonClick('add-to-cart', 'product-detail-page');
```

### 5. Theo dõi sự kiện tùy chỉnh

```tsx
import { trackEvent, EventType } from "@/utils/analytics";

// Theo dõi sự kiện xem sản phẩm
trackEvent(EventType.PRODUCT_VIEW, { 
  productId: '123', 
  productName: 'Giày thể thao', 
  category: 'Giày dép' 
});

// Theo dõi sự kiện thêm vào giỏ hàng
trackEvent(EventType.ADD_TO_CART, { 
  productId: '123', 
  quantity: 2, 
  price: 1000000 
});
```

## Các loại sự kiện có sẵn

Module cung cấp các loại sự kiện được định nghĩa sẵn trong `EventType`:

- `COOKIE_CONSENT`: Sự kiện liên quan đến việc chấp nhận cookie
- `PAGE_VIEW`: Lượt xem trang
- `BUTTON_CLICK`: Sự kiện click nút
- `FORM_SUBMIT`: Sự kiện gửi form
- `PRODUCT_VIEW`: Lượt xem sản phẩm
- `ADD_TO_CART`: Thêm sản phẩm vào giỏ hàng
- `CHECKOUT`: Bắt đầu thanh toán
- `PURCHASE`: Hoàn tất mua hàng

## Tích hợp với các dịch vụ Analytics

Module này đã được chuẩn bị để tích hợp với các dịch vụ analytics phổ biến:

### Google Analytics

Để tích hợp với Google Analytics, thêm đoạn mã sau vào file `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Facebook Pixel

Để tích hợp với Facebook Pixel, thêm đoạn mã sau vào file `index.html`:

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## Mở rộng

Để thêm loại sự kiện mới:

1. Thêm loại sự kiện vào enum `EventType` trong `analytics.ts`
2. Tạo hàm tiện ích mới trong `analytics.ts` nếu cần

## Lưu ý

- Module này chỉ theo dõi sự kiện nếu người dùng đã chấp nhận cookie
- Các sự kiện được ghi log vào console trong môi trường phát triển
- Trong môi trường sản xuất, các sự kiện sẽ được gửi đến các dịch vụ analytics đã được tích hợp

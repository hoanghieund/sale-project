# Hệ thống thiết kế (Design System)

Hệ thống thiết kế này tổng hợp các thuộc tính giao diện người dùng được sử dụng trong dự án, đảm bảo tính nhất quán và hiệu quả trong phát triển. Các giá trị được xác định dựa trên phân tích các tệp `src/components/layout/Header.tsx`, `src/features/users/home/Home.tsx`, `src/features/users/product-detail/ProductDetailPage.tsx`, và `src/features/users/cart/Cart.tsx`.

## 1. Kích thước (Sizes)

Các kích thước được sử dụng phổ biến trong dự án, chủ yếu dựa trên hệ thống spacing của Tailwind CSS. `Header.tsx` được xem là kích thước chuẩn cho các thành phần UI chính.

- **Chiều cao/Chiều rộng Icon:** `h-4 w-4`
- **Chiều rộng các thành phần:**
  - SheetContent: `w-80`
  - Input tìm kiếm desktop: `w-72`
  - Các thành phần điều hướng: `h-8`, `w-max`
  - Badge: `h-5 w-5`
  - Hình ảnh sản phẩm trong giỏ hàng: `h-24 w-24`
  - Chi tiết sản phẩm: `w-full`, `h-full`, `w-16`, `h-16`
- **Kích thước font:**
  - `text-3xl`, `text-xl`, `text-lg`, `text-base`, `text-sm`, `text-xs`
- **Độ dày viền:** `border-1`

## 2. Khoảng cách (Spacing)

Các giá trị khoảng cách được sử dụng nhất quán trong toàn bộ ứng dụng.

- **Padding:**
  - `py-1`, `py-2`, `py-8` ,`py-12`
  - `px-4`, `px-2`
  - `p-0`, `p-2`, `p-4`
- **Margin:**
  - `mx-auto` (canh giữa)
  - `mb-2`, `mb-4`, `mb-8`
  - `mt-2`, `mt-4`
  - `ml-1`, `ml-2`
  - `my-2`, `my-4`
- **Gap (khoảng cách giữa các phần tử flex/grid):**
  - `gap-4`, `gap-8`
  - `space-y-2`, `space-y-4`
  - `gap-x-6`, `gap-y-3`

## 3. Màu sắc (Colors)

Bảng màu chính được sử dụng để duy trì sự nhất quán về thương hiệu.

- **Màu chính (Primary):** `bg-primary`, `text-primary-foreground`, `hover:bg-primary/10`, `focus-visible:ring-primary`, `hover:bg-primary/5`
- \*\*Màu nền (Background):: `bg-background`, `bg-white`, `bg-muted/30`, `bg-foreground`, `bg-new (blue)`, `bg-trending (orange)`, `bg-star (yellow)`
- **Màu chữ (Text Colors):** `text-primary`, `text-muted-foreground`, `text-white`, `text-gray-600`, `text-gray-900`, `text-star`, `text-gray-500`, `text-blue-600`, `text-orange-600`, `text-emerald-600`, `text-red-600`, `text-gray-700`, `hover:text-primary`, `hover:text-emerald-700`, `text-destructive`
- **Màu viền (Border Colors):** `border-border`, `border-muted`, `border-white`, `border-emerald-500`, `border-transparent`, `hover:border-gray-300`, `border-emerald-600`, `border-gray-300`, `hover:border-gray-400`, `border`, `border-gray-100`
- **Màu card:** `bg-card`
- **Màu phá hủy (Destructive):** `variant="destructive"`

## 4. Typography (Font chữ)

Các kiểu chữ được định nghĩa để đảm bảo khả năng đọc và thẩm mỹ.

- **Kích thước:** `text-xl`, `text-lg`, `text-base`, `text-sm`, `text-xs`
- **Độ đậm:** `font-bold`, `font-medium`, `font-semibold`
- **Căn chỉnh:** `text-center`
- **Line-height:** `leading-none`
- **Khác:** `tracking-wide`, `line-clamp-2`

## 5. Bo góc (Border Radius)

Các giá trị bo góc được sử dụng để tạo hình dạng cho các thành phần.

- `rounded-full` (hoàn toàn tròn)
- `rounded-md` (bo tròn vừa)
- `rounded-lg` (bo tròn lớn)
- `rounded-xl` (bo tròn rất lớn)

## 6. Bóng đổ (Shadows)

Các kiểu bóng đổ được sử dụng để thêm chiều sâu cho các thành phần.

- `shadow-sm` (bóng đổ nhỏ)
- `shadow-lg` (bóng đổ lớn)

## 7. Chuyển động (Transitions)

Các thuộc tính chuyển động được sử dụng để tạo hiệu ứng mượt mà.

- **Thời gian:** `duration-300`, `duration-200`
- **Loại chuyển động:** `transition-shadow`, `transition-colors`, `transition-transform`
- **Hiệu ứng:** `animate-in fade-in slide-in-from-top`

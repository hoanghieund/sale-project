# Kế hoạch triển khai tính năng quản lý tài khoản

## 1. Cấu trúc thư mục

Để đảm bảo tính tổ chức và dễ bảo trì, cấu trúc thư mục sau đây sẽ được tạo trong `src/features/users/`:

```
src/
├── features/
│   └── users/
│       └── account-management/
│           ├── components/
│           │   ├── AccountSidebar.tsx
│           │   ├── ProfileForm.tsx
│           │   ├── AddressList.tsx
│           │   ├── AddressForm.tsx
│           │   ├── OrderTabs.tsx
│           │   └── OrderList.tsx
│           ├── pages/
│           │   ├── AccountLayout.tsx          // Layout chung cho trang quản lý tài khoản
│           │   ├── ProfilePage.tsx            // Trang Hồ sơ của tôi
│           │   ├── AddressPage.tsx            // Trang Địa chỉ
│           │   ├── ChangePasswordPage.tsx     // Trang Đổi mật khẩu
│           │   └── OrderHistoryPage.tsx       // Trang Đơn mua
│           ├── hooks/
│           │   └── useAccountData.ts          // Custom hook để fetch/manage data
│           ├── services/
│           │   ├── accountService.ts          // API calls liên quan đến tài khoản
│           │   ├── addressService.ts          // API calls liên quan đến địa chỉ
│           │   └── orderService.ts            // API calls liên quan đến đơn hàng
│           └── types/
│               ├── account.d.ts               // Định nghĩa types cho dữ liệu tài khoản
│               ├── address.d.ts               // Định nghĩa types cho dữ liệu địa chỉ
│               └── order.d.ts                 // Định nghĩa types cho dữ liệu đơn hàng
```

## 2. Thiết kế Sidebar (`AccountSidebar.tsx`)

*   Sử dụng component `Sidebar` từ `src/components/ui/sidebar.tsx` hoặc tạo một component sidebar mới nếu cần tùy chỉnh nhiều.
*   Các mục menu:
    *   Tài khoản của tôi
        *   Hồ sơ (`/account/profile`)
        *   Địa chỉ (`/account/address`)
        *   Đổi mật khẩu (`/account/change-password`)
    *   Đơn mua (`/account/orders`)
*   Đảm bảo các liên kết điều hướng đến đúng các trang tương ứng.

## 3. Trang Layout chung (`AccountLayout.tsx`)

*   Đây sẽ là trang chính chứa sidebar và khu vực hiển thị nội dung của các trang con (hồ sơ, địa chỉ, đơn mua, đổi mật khẩu).
*   Sử dụng React Router để quản lý các tuyến đường con (nested routes) bên trong `/account`.

## 4. Hồ sơ của tôi (`ProfilePage.tsx` và `ProfileForm.tsx`)

*   `ProfilePage.tsx` sẽ là trang chứa `ProfileForm.tsx`.
*   `ProfileForm.tsx` sẽ là một form sử dụng `react-hook-form` và các component từ `src/components/ui/form.tsx`.
*   Các trường: Tên đăng nhập (không sửa), Tên, Email, Số điện thoại, Tên shop, Giới tính, Ngày sinh.
*   Xử lý logic fetch dữ liệu hồ sơ hiện tại và cập nhật hồ sơ.

## 5. Địa chỉ (`AddressPage.tsx`, `AddressList.tsx`, `AddressForm.tsx`)

*   `AddressPage.tsx` sẽ chứa `AddressList.tsx` và `AddressForm.tsx` (dạng modal hoặc riêng trang để thêm/sửa).
*   `AddressList.tsx`: Hiển thị danh sách các địa chỉ hiện có với các nút Sửa/Xóa.
*   `AddressForm.tsx`: Form để thêm địa chỉ mới hoặc chỉnh sửa địa chỉ hiện có.
*   Xử lý logic thêm, sửa, xóa địa chỉ.

## 6. Đơn mua (`OrderHistoryPage.tsx` và `OrderTabs.tsx`, `OrderList.tsx`)

*   `OrderHistoryPage.tsx` sẽ chứa `OrderTabs.tsx` và `OrderList.tsx`.
*   `OrderTabs.tsx`: Sử dụng component `Tabs` từ `src/components/ui/tabs.tsx` để tạo các tab: Tất cả, Chờ xác nhận, Chờ lấy hàng, Đang giao, Hoàn thành.
*   `OrderList.tsx`: Hiển thị danh sách các đơn hàng tương ứng với tab đang chọn.
*   Xử lý logic fetch danh sách đơn hàng theo trạng thái.

## 7. Đổi mật khẩu (`ChangePasswordPage.tsx`)

*   Trang chứa form để người dùng nhập mật khẩu cũ và mật khẩu mới.
*   Sử dụng `react-hook-form` và các component form UI.
*   Xử lý logic gọi API đổi mật khẩu.

## 8. Tích hợp API và Quản lý trạng thái

*   Sử dụng các file trong `services/` (`accountService.ts`, `addressService.ts`, `orderService.ts`) để tương tác với API backend.
*   Sử dụng `hooks/useAccountData.ts` hoặc các custom hook khác để quản lý trạng thái dữ liệu trong các trang/component.

## Luồng điều hướng

```mermaid
graph TD
    A[Người dùng truy cập /account] --> B{AccountLayout};
    B --> C[AccountSidebar];
    B --> D[Nội dung trang];

    C -- "Tài khoản của tôi" --> E[Hồ sơ];
    C -- "Địa chỉ" --> F[Địa chỉ];
    C -- "Đổi mật khẩu" --> G[Đổi mật khẩu];
    C -- "Đơn mua" --> H[Đơn mua];

    E --> E1[ProfilePage];
    F --> F1[AddressPage];
    G --> G1[ChangePasswordPage];
    H --> H1[OrderHistoryPage];

    E1 -- "Chỉnh sửa" --> E2[ProfileForm];
    F1 -- "Thêm/Sửa" --> F2[AddressForm];
    F1 -- "Xem danh sách" --> F3[AddressList];
    H1 -- "Chọn tab" --> H2[OrderTabs];
    H2 -- "Hiển thị đơn hàng" --> H3[OrderList];
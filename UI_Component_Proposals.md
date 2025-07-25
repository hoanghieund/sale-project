# Đề xuất các Component UI chung

Dựa trên phân tích các file giao diện trong dự án, tôi đề xuất các component UI chung sau đây để tăng khả năng tái sử dụng và duy trì mã.

## 1. `HeroSection` (hoặc `BannerSection`)

*   **Mục đích:** Hiển thị một phần hero hoặc banner nổi bật với tiêu đề, mô tả và nút hành động. Có thể tái sử dụng cho trang chủ, trang giới thiệu, trang liên hệ, trang FAQ, v.v.
*   **Props cần thiết:**
    *   `title: string`
    *   `description: string` (optional)
    *   `imageUrl: string` (optional)
    *   `primaryButtonText: string` (optional)
    *   `primaryButtonLink: string` (optional)
    *   `secondaryButtonText: string` (optional)
    *   `secondaryButtonLink: string` (optional)
    *   `gradientFrom: string` (optional)
    *   `gradientTo: string` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <HeroSection
      title="Chào mừng đến với Marketplace"
      description="Nơi kết nối người mua và người bán trên toàn quốc"
      primaryButtonText="Khám phá sản phẩm"
      primaryButtonLink="/products"
      secondaryButtonText="Bán hàng cùng chúng tôi"
      secondaryButtonLink="/seller"
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-600"
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/HeroSection.tsx`

## 2. `CardGridSection` (hoặc `CategoryGrid`, `ImageGrid`)

*   **Mục đích:** Hiển thị một lưới các thẻ (card) với hình ảnh, tiêu đề, mô tả và liên kết, có thể có chức năng cuộn ngang. Tái sử dụng cho các phần "Latest & Greatest", "Shop By Sports", "Top Footwear Selects", danh mục nổi bật, danh mục con nổi bật.
*   **Props cần thiết:**
    *   `title: string`
    *   `subtitle: string` (optional)
    *   `items: Array<{ id: string; name: string; description?: string; image?: string; link: string; icon?: string; productCount?: number; }>`
    *   `cardType: 'category' | 'product' | 'simple'` (để tùy biến hiển thị trong card)
    *   `enableScroll: boolean` (optional, default: false)
    *   `linkText: string` (optional, ví dụ: "Shop Now", "Xem thêm")
    *   `linkHref: string` (optional, liên kết chung cho "View All")
*   **Ví dụ sử dụng:**
    ```tsx
    <CardGridSection
      title="Latest & Greatest"
      items={ICON_CATEGORIES.slice(0, 3).map(cat => ({
        id: cat.id,
        name: cat.name,
        image: cat.image,
        link: `/products/${cat.id}`
      }))}
      linkText="Shop Now"
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/CardGridSection.tsx`

## 3. `EmptyState`

*   **Mục đích:** Hiển thị thông báo khi một danh sách hoặc phần nội dung trống (ví dụ: giỏ hàng trống, danh sách yêu thích trống, không tìm thấy sản phẩm/đơn hàng).
*   **Props cần thiết:**
    *   `icon: React.ReactNode`
    *   `title: string`
    *   `message: string`
    *   `buttonText: string` (optional)
    *   `buttonLink: string` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <EmptyState
      icon={<ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />}
      title="Your cart is empty"
      message="Looks like you haven't added anything to your cart yet."
      buttonText="Continue Shopping"
      buttonLink="/products"
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/EmptyState.tsx`

## 4. `QuantitySelector`

*   **Mục đích:** Cung cấp giao diện để người dùng chọn số lượng với các nút tăng/giảm.
*   **Props cần thiết:**
    *   `quantity: number`
    *   `onQuantityChange: (newQuantity: number) => void`
    *   `min: number` (optional, default: 1)
    *   `max: number` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <QuantitySelector
      quantity={quantity}
      onQuantityChange={setQuantity}
      max={product.stock}
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/QuantitySelector.tsx`

## 5. `OrderSummaryCard` (hoặc `PriceBreakdown`)

*   **Mục đích:** Hiển thị chi tiết tổng quan đơn hàng (tổng phụ, giảm giá, vận chuyển, thuế, tổng cộng) và áp dụng mã giảm giá.
*   **Props cần thiết:**
    *   `cart: CartType` (hoặc các giá trị subtotal, discount, shipping, tax, total riêng lẻ)
    *   `onApplyCoupon: (couponCode: string) => void`
    *   `onRemoveCoupon: () => void`
    *   `couponError: string` (optional)
    *   `checkoutButtonLink: string` (optional)
    *   `continueShoppingButtonLink: string` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <OrderSummaryCard
      cart={cart}
      onApplyCoupon={handleApplyCoupon}
      onRemoveCoupon={removeCoupon}
      couponError={couponError}
      checkoutButtonLink="/checkout"
    />
    ```
*   **Vị trí đề xuất:** `src/components/cart-checkout/OrderSummaryCard.tsx`

## 6. `AuthFormContainer` (hoặc `FormWithValidation`)

*   **Mục đích:** Cung cấp khung chung cho các form xác thực (đăng nhập, đăng ký) với tiêu đề, mô tả, thông báo lỗi chung và phần đăng nhập/đăng ký bằng mạng xã hội.
*   **Props cần thiết:**
    *   `title: string`
    *   `subtitle: string`
    *   `children: React.ReactNode` (các trường form cụ thể)
    *   `errorMessage: string` (optional)
    *   `socialLoginOptions: 'google' | 'facebook' | 'all'` (optional)
    *   `footerText: string`
    *   `footerLinkText: string`
    *   `footerLinkHref: string`
*   **Ví dụ sử dụng:**
    ```tsx
    <AuthFormContainer
      title="Welcome Back"
      subtitle="Sign in to your account to continue shopping"
      errorMessage={error}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/register"
    >
      {/* Form fields go here */}
    </AuthFormContainer>
    ```
*   **Vị trí đề xuất:** `src/components/auth/AuthFormContainer.tsx`

## 7. `InputWithIcon`

*   **Mục đích:** Trường input với một icon cố định bên trái và/hoặc nút toggle bên phải (ví dụ: password show/hide).
*   **Props cần thiết:**
    *   `icon: React.ReactNode`
    *   `type: string`
    *   `placeholder: string`
    *   `id: string`
    *   `register: any` (từ react-hook-form)
    *   `error: any` (từ react-hook-form)
    *   `showToggle: boolean` (optional, cho password)
    *   `onToggle: () => void` (optional)
    *   `isToggled: boolean` (optional)
*   **Vị trí đề xuất:** `src/components/common/InputWithIcon.tsx`

## 8. `ProductListContainer` (hoặc `CatalogPage`)

*   **Mục đích:** Cung cấp cấu trúc và logic chung cho các trang hiển thị danh sách sản phẩm (ví dụ: Products, CategoryPage, SubcategoryPage, ShopPage). Bao gồm header, bộ lọc/sắp xếp, lưới sản phẩm và phân trang.
*   **Props cần thiết:**
    *   `products: Product[]`
    *   `title: string`
    *   `subtitle: string` (optional)
    *   `enableFilters: boolean` (optional)
    *   `enableSorting: boolean` (optional)
    *   `enablePagination: boolean` (optional)
    *   `availableCategories: string[]` (cho bộ lọc)
    *   `onFilterChange: (filters: ProductFilters) => void`
    *   `onSortChange: (sortBy: string) => void`
    *   `onPageChange: (page: number) => void`
*   **Vị trí đề xuất:** `src/components/product/ProductListContainer.tsx`

## 9. `StatCard`

*   **Mục đích:** Hiển thị một số liệu thống kê quan trọng với tiêu đề và icon/biểu tượng.
*   **Props cần thiết:**
    *   `value: string | number`
    *   `label: string`
    *   `icon: React.ReactNode` (optional)
    *   `colorClass: string` (optional, ví dụ: "text-green-600")
*   **Ví dụ sử dụng:**
    ```tsx
    <StatCard value="50K+" label="Happy Customers" icon="📦" />
    ```
*   **Vị trí đề xuất:** `src/components/common/StatCard.tsx`

## 10. `ReviewCard`

*   **Mục đích:** Hiển thị một đánh giá sản phẩm riêng lẻ với tên người dùng, ngày, rating, tiêu đề và bình luận.
*   **Props cần thiết:**
    *   `userName: string`
    *   `date: string`
    *   `rating: number`
    *   `title: string`
    *   `comment: string`
    *   `verified: boolean` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <ReviewCard
      userName="Nguyễn Văn A"
      date="15/05/2023"
      rating={5}
      title="Sản phẩm tuyệt vời"
      comment="Giày rất đẹp và thoải mái. Đúng như mô tả và giao hàng nhanh chóng."
      verified={true}
    />
    ```
*   **Vị trí đề xuất:** `src/components/product/ReviewCard.tsx`

## 11. `PolicyInfoCard`

*   **Mục đích:** Hiển thị thông tin chính sách (đổi trả, vận chuyển, bảo mật) với icon, tiêu đề và mô tả.
*   **Props cần thiết:**
    *   `icon: React.ReactNode`
    *   `title: string`
    *   `description: string`
*   **Ví dụ sử dụng:**
    ```tsx
    <PolicyInfoCard
      icon="🔄"
      title="Chính sách đổi trả"
      description="Đổi trả trong 7 ngày nếu sản phẩm lỗi"
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/PolicyInfoCard.tsx`

## 12. `ContactInfoCard`

*   **Mục đích:** Hiển thị thông tin liên hệ (email, điện thoại, địa chỉ, giờ làm việc) với icon, tiêu đề và giá trị.
*   **Props cần thiết:**
    *   `icon: React.ReactNode`
    *   `title: string`
    *   `value: string | React.ReactNode`
    *   `description: string` (optional)
*   **Ví dụ sử dụng:**
    ```tsx
    <ContactInfoCard
      icon={<Mail className="h-6 w-6 text-white" />}
      title="Email Support"
      value="support@donekick.com"
      description="For general inquiries and support"
    />
    ```
*   **Vị trí đề xuất:** `src/components/common/ContactInfoCard.tsx`

## 13. `DataTable`

*   **Mục đích:** Hiển thị dữ liệu dạng bảng với các cột có thể tùy chỉnh và hàng dữ liệu.
*   **Props cần thiết:**
    *   `columns: Array<{ key: string; header: string; render?: (item: any) => React.ReactNode }>`
    *   `data: any[]`
    *   `emptyStateIcon: React.ReactNode`
    *   `emptyStateTitle: string`
    *   `emptyStateMessage: string`
    *   `emptyStateButtonText: string` (optional)
    *   `emptyStateButtonAction: () => void` (optional)
*   **Vị trí đề xuất:** `src/components/common/DataTable.tsx`

## 14. `PaginationControls`

*   **Mục đích:** Cung cấp các nút điều khiển phân trang (trước, số trang, sau).
*   **Props cần thiết:**
    *   `currentPage: number`
    *   `totalPages: number`
    *   `onPageChange: (page: number) => void`
*   **Vị trí đề xuất:** `src/components/common/PaginationControls.tsx`

## 15. `SearchAndFilterControls`

*   **Mục đích:** Cung cấp thanh tìm kiếm và các tùy chọn lọc (nút, select, checkbox).
*   **Props cần thiết:**
    *   `searchTerm: string`
    *   `onSearchChange: (term: string) => void`
    *   `filterOptions: Array<{ label: string; value: string }>` (cho select/buttons)
    *   `selectedFilter: string`
    *   `onFilterChange: (filter: string) => void`
    *   `clearFiltersAction: () => void` (optional)
    *   `showClearButton: boolean` (optional)
*   **Vị trí đề xuất:** `src/components/common/SearchAndFilterControls.tsx`

Tôi đã hoàn thành việc phân tích và đề xuất các component UI chung.
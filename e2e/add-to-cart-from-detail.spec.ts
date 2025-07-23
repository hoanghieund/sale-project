import { expect, test } from '@playwright/test';

test.describe('TC_ATC_002: Add product from product detail page', () => {
  test('should allow user to add product to cart from detail page', async ({ page }) => {
    // 1. Navigate to http://localhost:8080/products
    await page.goto('http://localhost:8080/products');

    // 2. Click on a product card to navigate to the product detail page
    // Sử dụng data-testid để dễ dàng chọn thẻ sản phẩm
    // Đảm bảo thẻ sản phẩm đầu tiên hiển thị và có thể nhấp được
    const firstProductCard = page.locator('.product-card').first();
    await expect(firstProductCard).toBeVisible();
    await expect(firstProductCard).toBeEnabled();
    await firstProductCard.click();

    // Chờ cho trang chi tiết sản phẩm tải, tăng thời gian chờ lên 60 giây
    // Sử dụng page.waitForNavigation thay vì page.waitForURL để đảm bảo điều hướng hoàn tất
    await page.waitForNavigation({ url: /product\/.*/, timeout: 60000 });

    // Tạm dừng để kiểm tra trạng thái trình duyệt thủ công
    await page.pause();

    // 3. On the product detail page, find and click the "Add to Cart" button.
    // Chọn kích thước và màu sắc nếu có
    // Kiểm tra xem có radio button cho kích thước không
    const sizeOptions = await page.locator('input[name="size"]');
    if (await sizeOptions.count() > 0) {
      await sizeOptions.first().check(); // Chọn kích thước đầu tiên
    }

    // Kiểm tra xem có radio button cho màu sắc không
    const colorOptions = await page.locator('input[name="color"]');
    if (await colorOptions.count() > 0) {
      await colorOptions.first().check(); // Chọn màu sắc đầu tiên
    }

    // Nhấp vào nút "Add to Cart"
    const addToCartButton = page.locator('button', { hasText: 'Add to Cart' });
    await expect(addToCartButton).toBeEnabled(); // Đảm bảo nút được kích hoạt trước khi nhấp
    await addToCartButton.click();

    // 4. Verify that the product quantity in the cart (e.g., cart icon in the header) is updated correctly.
    // Ví dụ: Kiểm tra số lượng trên biểu tượng giỏ hàng ở header
    // Giả sử có một element hiển thị số lượng sản phẩm trong giỏ hàng, ví dụ: span.cart-quantity hoặc tương tự
    // Cần kiểm tra HTML để biết selector chính xác
    const cartQuantity = page.locator('[data-testid="cart-quantity"]');
    await expect(cartQuantity).toHaveText('1'); // Giả sử ban đầu giỏ hàng trống và thêm 1 sản phẩm

    // 5. Verify that a "Successfully added to cart" message is displayed (if applicable).
    // Giả sử có một thông báo toast hoặc alert khi thêm vào giỏ hàng thành công
    // Cần kiểm tra HTML để biết selector chính xác
    const successMessage = page.locator('text=Product added to cart successfully!'); // Hoặc selector tương ứng
    await expect(successMessage).toBeVisible();
  });
});
// Import the necessary modules from Playwright
import { expect, test } from '@playwright/test';

// Define the test suite for product browsing
test.describe('TC_DP_001: Product Page Loading and Pagination', () => {
  /**
   * Test case: Verify that the product page loads successfully, displays products, and pagination works correctly.
   */
  test('should load product page successfully, display products, and pagination', async ({ page }) => {
    // Step 1: Navigate to the products page
    // Điều hướng đến trang sản phẩm
    await page.goto('http://localhost:8080/products');

    // Step 2: Verify that the page loads without errors
    // Xác minh rằng trang tải không có lỗi
    // We can check for a common element that indicates successful loading, like the page title or a main content area.
    // Đảm bảo không có lỗi console nghiêm trọng.
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Log console errors for debugging, but don't fail the test unless it's critical.
        console.error(`Browser console error: ${msg.text()}`);
      }
    });

    // Expect a title "Products" or similar to confirm the page loaded correctly.
    // Mong đợi tiêu đề trang là "Products" hoặc tương tự để xác nhận trang đã tải đúng.
    await expect(page).toHaveTitle(/Products/);

    // Step 3: Verify that at least one product is displayed
    // Xác minh rằng có ít nhất một sản phẩm được hiển thị
    // Look for a product card or a common product item selector.
    // Tìm kiếm một thẻ sản phẩm hoặc một bộ chọn mục sản phẩm chung.
    await page.waitForSelector('.product-card'); // Wait for at least one product card to be visible
    const productCards = await page.locator('.product-card').all();
    expect(productCards.length).toBeGreaterThan(0);
    console.log(`Found ${productCards.length} product cards.`);


    // Step 4: If there is pagination, verify that pagination buttons are displayed and clickable.
    // Nếu có phân trang, hãy xác minh rằng các nút phân trang hiển thị và có thể nhấp vào.
    // Check for the presence of pagination controls.
    // Kiểm tra sự hiện diện của các điều khiển phân trang.
    const paginationContainer = page.locator('.pagination-container');
    const paginationButtons = page.locator('.pagination-button');

    // If pagination container exists, then check its buttons
    // Nếu container phân trang tồn tại, hãy kiểm tra các nút của nó
    if (await paginationContainer.isVisible()) {
      await expect(paginationButtons.first()).toBeVisible();
      await expect(paginationButtons.first()).toBeEnabled();
      console.log('Pagination buttons are visible and enabled.');

      // Optional: Click on a pagination button to test its clickability (e.g., next page)
      // Tùy chọn: Nhấp vào một nút phân trang để kiểm tra khả năng nhấp của nó (ví dụ: trang tiếp theo)
      const nextPageButton = page.locator('.pagination-button:has-text("Next")');
      if (await nextPageButton.isVisible()) {
        await nextPageButton.click();
        // Add an assertion to verify that the page content has changed after clicking next.
        // Thêm một xác nhận để xác minh rằng nội dung trang đã thay đổi sau khi nhấp vào "Next".
        // For example, check if the URL changes or if different products are loaded.
        // Ví dụ: kiểm tra xem URL có thay đổi không hoặc liệu các sản phẩm khác có được tải không.
        await expect(page).not.toHaveURL('http://localhost:8080/products'); // Assuming URL changes for next page
        console.log('Clicked next page button and URL changed.');
      }
    } else {
      console.log('No pagination found on the page.');
    }
  });
});
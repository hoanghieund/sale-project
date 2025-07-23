import { expect, test } from '@playwright/test';

test.describe('TC_ATC_001: Thêm sản phẩm từ trang danh sách sản phẩm', () => {
  /**
   * @description Kiểm tra xem người dùng có thể thêm sản phẩm vào giỏ hàng trực tiếp từ trang danh sách sản phẩm.
   */
  test('Người dùng có thể thêm sản phẩm vào giỏ hàng từ trang danh sách sản phẩm', async ({ page }) => {
    // 1. Điều hướng đến http://localhost:8080/products.
    await page.goto('http://localhost:8080/products');
    await page.waitForLoadState('networkidle');

    // 2. Tìm một sản phẩm trên trang danh sách sản phẩm.
    // Lấy locator của nút "Thêm vào giỏ hàng" đầu tiên.
    const addToCartButton = page.locator('[data-testid="add-to-cart-button"]').first();
    // Lấy locator của biểu tượng giỏ hàng trên header.
    const cartIcon = page.locator('[data-testid="cart-icon"]'); // Giả định có data-testid cho biểu tượng giỏ hàng

    // Chờ cho biểu tượng giỏ hàng hiển thị trước khi đọc nội dung của nó.
    await cartIcon.waitFor({ state: 'visible' });
    // Lấy số lượng sản phẩm hiện tại trong giỏ hàng trước khi thêm.
    const initialCartCount = await cartIcon.textContent().then(text => parseInt(text || '0', 10));

    // 3. Nhấp vào nút "Thêm vào giỏ hàng" cho sản phẩm đó.
    await addToCartButton.click();

    // 4. Xác minh rằng số lượng sản phẩm trong giỏ hàng được cập nhật đúng.
    // Chờ cho số lượng giỏ hàng được cập nhật.
    await expect(cartIcon).not.toHaveText(String(initialCartCount)); // Đảm bảo số lượng đã thay đổi
    await expect(cartIcon).toHaveText(String(initialCartCount + 1)); // Kiểm tra số lượng tăng lên 1

    // 5. Xác minh rằng thông báo "Thêm vào giỏ hàng thành công" hiển thị (nếu có).
    // Giả định có một thông báo thành công xuất hiện sau khi thêm vào giỏ hàng.
    // Ví dụ: một toast notification hoặc một dòng chữ trên trang.
    // Bỏ qua xác minh thông báo "Thêm vào giỏ hàng thành công" vì không có thông báo rõ ràng nào được hiển thị.
    // Thay vào đó, chúng ta đã xác minh số lượng sản phẩm trong giỏ hàng đã được cập nhật.
  });
});
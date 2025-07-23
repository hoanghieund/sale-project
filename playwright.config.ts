import { defineConfig, devices } from '@playwright/test';

/**
 * Cấu hình Playwright cho dự án Sale_Project
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e/tests',
  /* Thời gian tối đa một test có thể chạy */
  timeout: 30 * 1000,
  /* Chạy tests theo trình tự */
  fullyParallel: false,
  /* Báo cáo chi tiết */
  reporter: 'html',
  /* Cấu hình cho mỗi lần chạy test */
  use: {
    /* Chụp ảnh màn hình khi test thất bại */
    screenshot: 'only-on-failure',
    
    /* Ghi lại trace khi test thất bại */
    trace: 'on-first-retry',
    
    /* Cấu hình base URL */
    baseURL: 'http://localhost:8080',
  },

  /* Cấu hình các dự án test */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Cấu hình máy chủ web dev */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});

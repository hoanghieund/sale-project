---
trigger: manual
---

# generate-test-rule.md

- Bạn là người tạo bài kiểm tra nhà viết kịch.
- Bạn được giao một kịch bản và cần tạo một bài kiểm tra nhà viết kịch cho kịch bản đó.
- KHÔNG tạo mã kiểm tra chỉ dựa trên kịch bản.
- NÊN chạy từng bước một bằng các công cụ được cung cấp bởi Playwright MCP.
- Chỉ sau khi hoàn thành tất cả các bước, hãy tạo một bài kiểm tra Playwright TypeScript sử dụng @playwright/test dựa trên lịch sử tin nhắn.
- Lưu tệp kiểm tra đã tạo vào thư mục e2e.
- Chạy tệp kiểm tra và lặp lại cho đến khi bài kiểm tra thành công.

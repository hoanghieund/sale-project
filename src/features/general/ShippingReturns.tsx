/**
 * Shipping & Returns page for Eulotus.
 *
 * - Sử dụng shadcn UI Card để đồng bộ với hệ thống thiết kế
 * - Nội dung chuẩn hóa, có ngày hiệu lực/cập nhật
 * - Liên hệ theo brand email đã dùng trong footer (contact.eulotus@gmail.com) và địa chỉ returns chuyên biệt khi cần
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Component hiển thị trang Shipping & Returns của Eulotus.
 *
 * Bao gồm 2 phần chính: Shipping Policy và Return & Refund Policy.
 * Ngày hiệu lực/cập nhật được giữ ở dạng placeholder để dễ chỉnh sửa về sau.
 */
const ShippingReturns = () => {
  // NOTE: Cập nhật ngày theo thời gian hiện tại của hệ thống/brand policy
  const effectiveDate = "August 12, 2023"; // ngày hiệu lực chính sách
  const lastUpdatedDate = "August 12, 2023"; // ngày cập nhật gần nhất

  // POLICY: Các tham số chính sách tập trung để dễ bảo trì/điều chỉnh
  // - processingDays: thời gian xử lý đơn
  // - standardDays, expressDays: khung thời gian giao hàng ước tính
  // - freeShippingThreshold: ngưỡng miễn phí vận chuyển
  // - returnWindowDays: thời hạn đổi trả
  // - issueReportDays: thời hạn báo cáo mất/hư hỏng
  // - refundDays: thời gian hoàn tiền ước tính
  const POLICY = {
    processingDays: "1–2",
    standardDays: "3–7",
    expressDays: "1–3",
    freeShippingThreshold: "$75",
    returnWindowDays: 14,
    issueReportDays: 7,
    refundDays: "5–7",
  } as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            Shipping & Returns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {/* Dates section for effective and last updated times */}
          <div className="text-xs text-center space-y-1">
            <p>Effective Date: {effectiveDate}</p>
            <p>Last Updated: {lastUpdatedDate}</p>
          </div>

          {/* Shipping Policy */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Shipping Policy</h2>

            <div>
              <h3 className="font-medium text-sm">1. Processing Time</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  {/* Sử dụng POLICY.processingDays để dễ thay đổi theo thực tế vận hành */}
                  Orders are processed within {POLICY.processingDays} business
                  days after payment is confirmed (excluding weekends and
                  holidays).
                </li>
                <li>
                  During peak seasons or promotions, processing times may be
                  slightly longer.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                2. Shipping Methods & Delivery Time
              </h3>
              <p className="mb-2 text-sm">
                We offer the following shipping options:
              </p>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  <span className="font-medium">Standard Shipping:</span>{" "}
                  {/* ước tính giao hàng chuẩn */}
                  Estimated delivery in {POLICY.standardDays} business days.
                </li>
                <li>
                  <span className="font-medium">Express Shipping:</span>{" "}
                  {/* ước tính giao hàng nhanh */}
                  Estimated delivery in {POLICY.expressDays} business days.
                </li>
              </ul>
              <p className="mt-2 text-xs">
                Delivery times are estimates and may vary depending on your
                location and carrier delays.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-sm">3. Shipping Costs</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  Shipping costs are calculated at checkout based on weight,
                  destination, and selected shipping method.
                </li>
                <li>
                  Free shipping may be available for orders over{" "}
                  {POLICY.freeShippingThreshold}.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">4. Order Tracking</h3>
              <p className="text-sm">
                Once your order is shipped, you will receive a tracking number
                via email.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                5. Customs, Duties & Taxes
              </h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  International shipments may be subject to customs duties and
                  taxes, which are the buyer's responsibility.
                </li>
                <li>We are not responsible for delays caused by customs.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                6. Incorrect Shipping Information
              </h3>
              <p className="text-sm">
                Please ensure your shipping address is correct before placing
                the order. We are not responsible for lost packages due to
                incorrect addresses.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                7. Lost or Damaged Packages
              </h3>
              <p className="text-sm">
                If your package is lost or arrives damaged, please contact us
                within {POLICY.issueReportDays} days of delivery at{" "}
                <a
                  href="mailto:contact.eulotus@gmail.com"
                  className="text-primary hover:underline"
                >
                  contact.eulotus@gmail.com
                </a>{" "}
                with your order number and photos of the damage.
              </p>
            </div>
          </section>

          {/* Return & Refund Policy */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Return & Refund Policy</h2>

            <div className="text-xs">
              <p>Effective Date: {effectiveDate}</p>
              <p>Last Updated: {lastUpdatedDate}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                1. Eligibility for Returns
              </h3>
              <p className="text-sm">
                We accept returns within {POLICY.returnWindowDays} days of
                delivery if:
              </p>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  The item is unused, in original packaging, and in the same
                  condition you received it.
                </li>
                <li>The item is defective or damaged upon arrival.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">2. Non-Returnable Items</h3>
              <p className="text-sm">The following items cannot be returned:</p>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Perishable goods (e.g., food, flowers).</li>
                <li>Personalized or custom-made products.</li>
                <li>Gift cards and downloadable digital products.</li>
                <li>Items marked as "Final Sale."</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">3. Return Process</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  Contact us at{" "}
                  <a
                    href="mailto:contact.eulotus@gmail.com"
                    className="text-primary hover:underline"
                  >
                    contact.eulotus@gmail.com
                  </a>{" "}
                  with your order number and reason for return.
                </li>
                <li>
                  We will provide instructions and a return shipping address.
                </li>
                <li>Ship the item back using a trackable method.</li>
              </ul>
              <p className="mt-2 text-xs">
                Note: Customers are responsible for return shipping costs unless
                the item is defective or we made an error.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-sm">4. Refunds</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>
                  Refunds are issued to your original payment method within{" "}
                  {POLICY.refundDays}
                  business days after we receive and inspect the returned item.
                </li>
                <li>Shipping fees are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm">5. Exchanges</h3>
              <p className="text-sm">
                If you need an exchange for a different size, color, or item,
                contact us at{" "}
                <a
                  href="mailto:contact.eulotus@gmail.com"
                  className="text-primary hover:underline"
                >
                  contact.eulotus@gmail.com
                </a>
                . Exchanges are processed once we receive the original item.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-sm">
                6. Damaged or Defective Items
              </h3>
              <p className="text-sm">
                If you receive a damaged or defective product, please contact us
                within {POLICY.issueReportDays} days of delivery with photos for
                a replacement or refund.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingReturns;

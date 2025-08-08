/**
 * Shipping & Returns page for Eulotus.
 *
 * - Sử dụng shadcn UI Card để đồng bộ với hệ thống thiết kế
 * - Nội dung chuẩn hóa, có ngày hiệu lực/cập nhật
 * - Liên hệ theo brand email đã dùng trong footer (support@eulotus.com) và địa chỉ returns chuyên biệt khi cần
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
  const effectiveDate = "August 8, 2025";
  const lastUpdatedDate = "August 8, 2025";

  return (
    <div className="container mx-auto my-12">
      <Card className="bg-white border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Shipping & Returns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Dates section for effective and last updated times */}
          <div className="text-sm text-muted-foreground text-center space-y-1">
            <p>Effective Date: {effectiveDate}</p>
            <p>Last Updated: {lastUpdatedDate}</p>
          </div>

          {/* Shipping Policy */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Policy</h2>

            <div>
              <h3 className="font-medium">1. Processing Time</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Orders are processed within [X] business days after payment is
                  confirmed (excluding weekends and holidays).
                </li>
                <li>
                  During peak seasons or promotions, processing times may be
                  slightly longer.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">
                2. Shipping Methods & Delivery Time
              </h3>
              <p className="mb-2">We offer the following shipping options:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <span className="font-medium">Standard Shipping:</span>{" "}
                  Estimated delivery in [X–X] business days.
                </li>
                <li>
                  <span className="font-medium">Express Shipping:</span>{" "}
                  Estimated delivery in [X–X] business days.
                </li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Delivery times are estimates and may vary depending on your
                location and carrier delays.
              </p>
            </div>

            <div>
              <h3 className="font-medium">3. Shipping Costs</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Shipping costs are calculated at checkout based on weight,
                  destination, and selected shipping method.
                </li>
                <li>
                  Free shipping may be available for orders over [X amount].
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">4. Order Tracking</h3>
              <p>
                Once your order is shipped, you will receive a tracking number
                via email.
              </p>
            </div>

            <div>
              <h3 className="font-medium">5. Customs, Duties & Taxes</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  International shipments may be subject to customs duties and
                  taxes, which are the buyer’s responsibility.
                </li>
                <li>We are not responsible for delays caused by customs.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">6. Incorrect Shipping Information</h3>
              <p>
                Please ensure your shipping address is correct before placing
                the order. We are not responsible for lost packages due to
                incorrect addresses.
              </p>
            </div>

            <div>
              <h3 className="font-medium">7. Lost or Damaged Packages</h3>
              <p>
                If your package is lost or arrives damaged, please contact us
                within [X] days of delivery at{" "}
                <a
                  href="mailto:support@eulotus.com"
                  className="text-blue-600 hover:underline"
                >
                  support@eulotus.com
                </a>{" "}
                with your order number and photos of the damage.
              </p>
            </div>
          </section>

          {/* Return & Refund Policy */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Return & Refund Policy</h2>

            <div className="text-sm text-muted-foreground">
              <p>Effective Date: {effectiveDate}</p>
              <p>Last Updated: {lastUpdatedDate}</p>
            </div>

            <div>
              <h3 className="font-medium">1. Eligibility for Returns</h3>
              <p>We accept returns within [X] days of delivery if:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  The item is unused, in original packaging, and in the same
                  condition you received it.
                </li>
                <li>The item is defective or damaged upon arrival.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">2. Non-Returnable Items</h3>
              <p>The following items cannot be returned:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Perishable goods (e.g., food, flowers).</li>
                <li>Personalized or custom-made products.</li>
                <li>Gift cards and downloadable digital products.</li>
                <li>Items marked as “Final Sale.”</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">3. Return Process</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Contact us at{" "}
                  <a
                    href="mailto:returns@eulotus.com"
                    className="text-blue-600 hover:underline"
                  >
                    returns@eulotus.com
                  </a>{" "}
                  with your order number and reason for return.
                </li>
                <li>
                  We will provide instructions and a return shipping address.
                </li>
                <li>Ship the item back using a trackable method.</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Note: Customers are responsible for return shipping costs unless
                the item is defective or we made an error.
              </p>
            </div>

            <div>
              <h3 className="font-medium">4. Refunds</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Refunds are issued to your original payment method within [X]
                  business days after we receive and inspect the returned item.
                </li>
                <li>Shipping fees are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">5. Exchanges</h3>
              <p>
                If you need an exchange for a different size, color, or item,
                contact us at{" "}
                <a
                  href="mailto:returns@eulotus.com"
                  className="text-blue-600 hover:underline"
                >
                  returns@eulotus.com
                </a>
                . Exchanges are processed once we receive the original item.
              </p>
            </div>

            <div>
              <h3 className="font-medium">6. Damaged or Defective Items</h3>
              <p>
                If you receive a damaged or defective product, please contact us
                within [X] days of delivery with photos for a replacement or
                refund.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingReturns;

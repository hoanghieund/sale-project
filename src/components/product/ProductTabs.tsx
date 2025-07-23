import { Product } from "../../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

/**
 * Component displays product information in tabs
 * Includes tabs: Description, Specifications, Reviews, Shipping & Returns
 */
const ProductTabs = ({ product }: ProductTabsProps) => {
  // Tạo mẫu thông số kỹ thuật cho demo
  const specifications = [
    { name: "Brand", value: product.brand },
    { name: "Category", value: product.category },
    { name: "Subcategory", value: product.subcategory || "N/A" },
    { name: "Material", value: "Cao su, vải dệt, da tổng hợp" },
    { name: "Origin", value: "Nhập khẩu chính hãng" },
    { name: "Warranty", value: "12 tháng" },
  ];

  // Tạo mẫu đánh giá cho demo
  const reviews = [
    {
      id: "review1",
      userName: "Nguyễn Văn A",
      rating: 5,
      date: "15/05/2023",
      title: "Sản phẩm tuyệt vời",
      comment: "Giày rất đẹp và thoải mái. Đúng như mô tả và giao hàng nhanh chóng.",
      verified: true,
    },
    {
      id: "review2",
      userName: "Trần Thị B",
      rating: 4,
      date: "20/04/2023",
      title: "Chất lượng tốt",
      comment: "Giày đẹp, đúng size nhưng hơi chật một chút ở phần mũi. Sau vài ngày đi thì đã thoải mái hơn.",
      verified: true,
    },
    {
      id: "review3",
      userName: "Lê Văn C",
      rating: 3,
      date: "10/03/2023",
      title: "Tạm được",
      comment: "Sản phẩm ok nhưng không đúng màu như trong hình. Dịch vụ giao hàng tốt.",
      verified: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        
        {/* Tab Mô tả */}
        <TabsContent value="description" className="text-base leading-relaxed">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Được thiết kế với công nghệ tiên tiến và chất liệu cao cấp, {product.name} mang đến trải nghiệm tuyệt vời cho người dùng. 
              Sản phẩm này không chỉ đáp ứng nhu cầu về thẩm mỹ mà còn đảm bảo độ bền và thoải mái khi sử dụng.
            </p>
            <p>
              Với thiết kế hiện đại và công nghệ tiên tiến, sản phẩm này là lựa chọn hoàn hảo cho những ai đang tìm kiếm sự kết hợp giữa phong cách và hiệu suất.
              Được làm từ chất liệu cao cấp, {product.name} không chỉ bền bỉ mà còn mang lại cảm giác thoải mái khi sử dụng.
            </p>
          </div>
        </TabsContent>
        
        {/* Tab Thông số kỹ thuật */}
        <TabsContent value="specifications">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <th className="text-left py-2 px-4 bg-muted/50">Property</th>
                  <th className="text-left py-2 px-4 bg-muted/50">Value</th>
                </tr>
                {specifications.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                    <td className="py-3 px-4 font-medium">{spec.name}</td>
                    <td className="py-3 px-4">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        {/* Tab Đánh giá */}
        <TabsContent value="reviews">
          <div className="space-y-8">
            {/* Tổng quan đánh giá */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-muted/30 p-6 rounded-lg text-center md:w-1/3">
                <div className="text-4xl font-bold mb-2">{product.rating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">{review.title}</h4>
                      <p className="text-sm">{review.comment}</p>
                      {review.verified && (
                        <div className="mt-2 text-xs text-green-600 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified Purchase
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Tab Vận chuyển & Đổi trả */}
        <TabsContent value="shipping">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Shipping & Returns Policy</h3>
              <p>
                We offer various shipping options to meet your needs:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Standard Shipping: 3-5 business days (free for orders over 500,000đ)</li>
                <li>Express Shipping: 1-2 business days (additional 30,000đ)</li>
                <li>Same-Day Shipping: Only applicable for inner-city areas (additional 50,000đ)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Return Policy</h3>
              <p>
                We guarantee customer satisfaction with our flexible return policy:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Size/Color Exchange: Within 30 days of receiving the product</li>
                <li>Full Refund: Within 14 days of receiving the product</li>
                <li>Defective Product: Exchange or full refund within 90 days</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Note: Returned products must be in their original condition, with tags attached and packaging intact.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;

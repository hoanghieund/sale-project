import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (rating: number, comment: string) => void;
}

export const ProductReviews = ({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onAddReview,
}: ProductReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;

    setIsSubmitting(true);
    onAddReview?.(rating, comment.trim());
    // Reset form
    setRating(0);
    setComment("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({totalReviews} đánh giá)
            </span>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Đánh giá của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hover || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating > 0 ? `${rating} sao` : "Chọn số sao"}
                  </span>
                </div>
                <Textarea
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || !comment.trim()}
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={review.user.avatar}
                      alt={review.user.name}
                    />
                    <AvatarFallback>
                      {review.user.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{review.user.name}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Hình ảnh đánh giá ${idx + 1}`}
                            className="h-20 w-20 rounded-md object-cover border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">
            Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh
            giá!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;

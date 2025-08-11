import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import FileDropzone from "@/components/common/FileDropzone";
import { productDetailService } from "../services/productDetailService";

interface Review {
  id: number;
  content: string;
  file: string | null;
  image: string | null;
  userDTO: User;
  parent: Review;
  idParent: number | null;
  timeComment: string;
  totalLike: number | null;
  child: Review[] | null;
  active: number | null;
  star: number;
}

/**
 * Component to display a review and its child reviews recursively.
 * @param {Object} props - Component props.
 * @param {Review} props.review - The review object to display.
 */
const ReviewItem = ({ review }: { review: Review }) => {
  // State để quản lý dialog xem media toàn màn hình
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  return (
    <Card key={review.id} className="shadow-sm bg-white">
      <CardContent className="p-3">
        <div className="flex gap-2 items-start">
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarImage
              src={review.userDTO.avatar || undefined}
              alt={review.userDTO.username}
            />
            <AvatarFallback>
              {review.userDTO.username
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-y-1">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {review.userDTO.username}
                </h4>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= review.star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground ml-auto">
                {review.timeComment}
              </span>
            </div>
            <p className="mt-1 text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
              {review.content}
            </p>
            {review.image && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {review.image.split(",").map((media, index) => {
                  // Kiểm tra nếu là video (định dạng mp4, mov, etc.)
                  const isVideoFile = /\.(mp4|mov|avi|wmv|flv|mkv|webm)$/i.test(
                    media
                  );
                  const trimmedMedia = media.trim();

                  // Hàm mở dialog xem media toàn màn hình
                  const openMediaDialog = () => {
                    setSelectedMedia(trimmedMedia);
                    setIsVideo(isVideoFile);
                  };

                  return isVideoFile ? (
                    <video
                      key={index}
                      src={trimmedMedia}
                      className="h-24 w-24 rounded-sm object-cover cursor-pointer"
                      onClick={openMediaDialog}
                    />
                  ) : (
                    <img
                      key={index}
                      src={trimmedMedia}
                      alt={`Review image ${index + 1}`}
                      className="h-24 w-24 rounded-sm object-cover cursor-pointer"
                      loading="lazy"
                      onClick={openMediaDialog}
                    />
                  );
                })}
              </div>
            )}

            {/* Dialog xem media toàn màn hình */}
            <Dialog
              open={!!selectedMedia}
              onOpenChange={open => !open && setSelectedMedia(null)}
            >
              <DialogContent className="max-w-4xl w-fit p-0 overflow-hidden">
                <div className="flex items-center justify-center w-full h-full max-h-[80vh]">
                  {selectedMedia && isVideo ? (
                    <video
                      src={selectedMedia}
                      className="max-w-full max-h-[80vh] object-contain"
                      controls
                      autoPlay
                    />
                  ) : (
                    selectedMedia && (
                      <img
                        src={selectedMedia}
                        alt="Full size image"
                        className="max-w-full max-h-[80vh] object-contain"
                      />
                    )
                  )}
                </div>
              </DialogContent>
            </Dialog>
            {review.child && review.child.length > 0 && (
              <div className="ml-8 mt-4 space-y-3">
                {review.child.map(childReview => (
                  <ReviewItem key={childReview.id} review={childReview} />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
interface ProductReviewsProps {
  averageRating: number;
  totalReviews: number;
  productId: number;
  reloadProduct: () => void;
}

export const ProductReviews = ({
  averageRating = 0,
  totalReviews = 0,
  productId,
  reloadProduct,
}: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State files chọn để upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useUser(); // Use useUser hook
  

  /**
   * Fetches product reviews from the API.
   * @async
   * @function fetchReviews
   * @returns {Promise<void>}
   */
  const fetchReviews = async () => {
    if (!productId) return;
    try {
      const response = await productDetailService.getReviewsByProductId(
        productId
      );
      setReviews(response.content);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Error",
        description: "Failed to load product reviews.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  /**
   * Handles the submission of a new review.
   * @async
   * @function handleSubmit
   * @param {React.FormEvent} e - The form event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !productId) {
      toast({
        title: "Error",
        description: "Please select a star rating and enter review content.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("star", rating.toString());
      payload.append("content", comment);
      payload.append("productId", productId.toString());

      // Append all selected files
      selectedFiles.forEach(file => {
        payload.append("files", file);
      });

      await productDetailService.submitReview(payload);
      toast({
        title: "Success",
        description: "Your review has been submitted successfully!",
      });
      setRating(0);
      setComment("");
      setSelectedFiles([]); // Reset files after submission
      fetchReviews(); // Reload review list after successful submission
      reloadProduct();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between items-start gap-3">
        <div className="flex-shrink-0 flex items-start gap-4">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Product Reviews
          </h2>
          <div className="flex items-center gap-1">
            <div className="flex items-baseline">
              <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                {averageRating}
              </span>
              <span className="text-xs text-muted-foreground">/5</span>
            </div>
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(averageRating)
                      ? "fill-current text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 rounded-md">
          <p className="text-muted-foreground text-sm">
            No reviews yet for this product. Be the first to review!
          </p>
        </div>
      )}

      {isAuthenticated && (
        <div className="w-full">
          <Card className="shadow-sm">
            <CardHeader className="p-2">
              <CardTitle className="text-sm text-gray-800 dark:text-gray-200">
                Write Your Review
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-4 h-4 transition-colors duration-200 ${
                          (hover || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-0.5 text-xs text-muted-foreground">
                    {rating > 0 ? `${rating} stars` : "Select stars"}
                  </span>
                </div>
                <Textarea
                  placeholder="Share your thoughts about the product..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="min-h-[80px] text-xs focus-visible:ring-offset-0 focus-visible:ring-blue-400"
                />

                {/* Drag & Drop + Preview (Reusable) */}
                <FileDropzone
                  files={selectedFiles}
                  onFilesChange={setSelectedFiles}
                  maxFiles={5}
                  maxSizeMB={10}
                  accept="image/*,video/*"
                />

                {/* Error messages được hiển thị trực tiếp trong FileDropzone */}

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || !comment.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-md transition-colors duration-200 text-xs"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;

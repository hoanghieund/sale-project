import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";
import { FileText, Star, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
                <img
                  src={review.image}
                  alt={`Review image`}
                  className="h-24 w-24 rounded-sm object-cover"
                />
              </div>
            )}
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State to store selected files
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useUser(); // Use useUser hook

  /**
   * Handles file selection for upload.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // Limit to a maximum of 5 files
      if (selectedFiles.length + filesArray.length <= 5) {
        setSelectedFiles(prev => [...prev, ...filesArray]);
        setErrors([]);
      } else {
        setErrors(["Maximum 5 files allowed."]);
      }
    }
  };

  const validateFile = (file: File): string | null => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxFileSize) {
      return `File "${file.name}" is too large. Maximum size is ${
        maxFileSize / (1024 * 1024)
      }MB.`;
    }

    const acceptedTypes = ["image/*", "video/*"];
    const isValidType = acceptedTypes.some(type => {
      if (type.includes("*")) {
        return file.type.startsWith(type.replace("*", ""));
      }
      return file.name.toLowerCase().endsWith(type);
    });

    if (!isValidType) {
      return `File "${file.name}" is not a supported format.`;
    }

    return null;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const filesArray = Array.from(e.dataTransfer.files);
        const newErrors: string[] = [];
        const validFiles: File[] = [];

        // Check file validity
        filesArray.forEach(file => {
          const error = validateFile(file);
          if (error) {
            newErrors.push(error);
          } else {
            validFiles.push(file);
          }
        });

        if (newErrors.length > 0) {
          setErrors(newErrors);
          return;
        }

        // Limit to a maximum of 5 files
        if (selectedFiles.length + validFiles.length <= 5) {
          setSelectedFiles(prev => [...prev, ...validFiles]);
          setErrors([]);
        } else {
          setErrors(["Maximum 5 files allowed."]);
        }
      }
    },
    [selectedFiles.length]
  );

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
        payload.append("file", file);
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

                {/* Drag and Drop File Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-md p-2 transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="text-center space-y-2">
                    <Upload className="w-5 h-5 mx-auto text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-foreground">
                        Drop files here or click to browse
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Support images and videos up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* File Previews */}
                {selectedFiles.length > 0 && (
                  <div className="flex">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative group border border-border rounded-sm overflow-hidden bg-background"
                      >
                        {file.type.startsWith("image/") ? (
                          <div className="aspect-square w-24 h-24">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : file.type.startsWith("video/") ? (
                          <div className="aspect-square w-24 h-24 relative cursor-pointer group">
                            <video
                              src={URL.createObjectURL(file)}
                              className="w-full h-full object-cover"
                              controlsList="nodownload nofullscreen"
                              preload="metadata"
                              onClick={e => e.currentTarget.play()}
                            />
                          </div>
                        ) : (
                          <div className="aspect-square flex flex-col items-center justify-center p-1.5 bg-muted/30">
                            <FileText className="w-2.5 h-2.5 text-muted-foreground" />
                            <span className="text-[9px] text-center mt-0.5 text-muted-foreground truncate w-full">
                              {file.name}
                            </span>
                          </div>
                        )}

                        <button
                          onClick={() =>
                            setSelectedFiles(prev =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute top-1 right-1 p-0.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                        >
                          <X className="w-1.5 h-1.5" />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] p-0.5 truncate">
                          {file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error Messages */}
                {errors.length > 0 && (
                  <div className="space-y-0.5">
                    {errors.map((error, index) => (
                      <p key={index} className="text-xs text-destructive">
                        {error}
                      </p>
                    ))}
                  </div>
                )}

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

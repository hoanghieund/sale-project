import { Button } from "@/components/ui/button";
import ProductBreadcrumb from "@/features/users/product-detail/components/ProductBreadcrumb";
import ProductReviews from "@/features/users/product-detail/components/ProductReviews";
import QuantitySelector from "@/features/users/product-detail/components/QuantitySelector";
import { productDetailService } from "@/features/users/product-detail/services/productDetailService";
import { Product, Shop } from "@/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

/**
 * ProductDetailPage - Trang chi tiết sản phẩm C2C Marketplace
 * Hiển thị thông tin sản phẩm, shop bán hàng và các sản phẩm liên quan
 */

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // Lưu trữ các giá trị biến thể đã chọn theo variantId
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    Record<number, number>
  >({});
  // Lưu trữ SKU được chọn dựa trên tổ hợp các biến thể
  const [selectedSku, setSelectedSku] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Không tìm thấy ID sản phẩm.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const productData: Product = await productDetailService.getProductById(
          id
        );
        setProduct(productData);
        setSelectedImage(0); // Reset selected image when product changes

        // Khởi tạo giá trị mặc định cho các biến thể
        if (
          productData.variantsDTOList &&
          productData.variantsDTOList.length > 0 &&
          productData.productSkusDTOList &&
          productData.productSkusDTOList.length > 0
        ) {
          const initialVariantValues: Record<number, number> = {};

          // Chọn giá trị đầu tiên cho mỗi loại biến thể
          productData.variantsDTOList.forEach(variant => {
            if (
              variant.variantValueDTOList &&
              variant.variantValueDTOList.length > 0
            ) {
              initialVariantValues[variant.id] =
                variant.variantValueDTOList[0].id;
            }
          });

          setSelectedVariantValues(initialVariantValues);

          // Tìm SKU phù hợp với các giá trị biến thể đã chọn
          const matchingSku = findMatchingSku(
            productData,
            initialVariantValues
          );
          if (matchingSku) {
            setSelectedSku(matchingSku.id);
          }
        }

        // Lấy thông tin shop từ dữ liệu API
        if (productData.shop) {
          setShop(productData.shop);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin sản phẩm hoặc cửa hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Added ${quantity} items to cart`);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log(`Buy now ${quantity} items`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product || !shop) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-background min-h-screen">
      <ProductBreadcrumb product={product} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
              {product.imagesDTOList && product.imagesDTOList[selectedImage] ? (
                <img
                  src={product.imagesDTOList[selectedImage].path || ""}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">📦</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.imagesDTOList?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {image.path ? (
                    <img
                      src={image.path}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl text-gray-400">📦</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-lg font-medium ml-1">
                    {product.star || 0}
                  </span>
                  <span className="text-gray-500 ml-1">
                    ({product.totalReview || 0} đánh giá)
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  Đã bán {product.totalProductSold || 0}
                </span>
                {product.isNew && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                      Mới
                    </span>
                  </>
                )}
                {product.isFlashSale && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm font-medium">
                      Flash Sale
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                {selectedSku && product.productSkusDTOList ? (
                  <>
                    <span className="text-3xl font-bold text-emerald-600">
                      {product.productSkusDTOList
                        .find(sku => sku.id === selectedSku)
                        ?.price.toLocaleString() || 0}
                      đ
                    </span>
                    {product.discount && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          {Math.round(
                            product.productSkusDTOList.find(
                              sku => sku.id === selectedSku
                            )?.price /
                              (1 - product.discount.discount_percent / 100)
                          ).toLocaleString()}
                          đ
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                          -{product.discount.discount_percent}%
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold text-emerald-600">
                    {product.amount?.toLocaleString() || 0}đ
                  </span>
                )}
              </div>
            </div>

            {/* Shop Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin cửa hàng</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={shop.avatar}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    to={`/shop/${shop.id}`}
                    className="text-lg font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    {shop.name}
                  </Link>
                  <div className="flex flex-col gap-4 text-sm text-gray-600 mt-1">
                    {shop.description && <span>{shop.description}</span>}
                    {shop.totalQuantity !== null && (
                      <div>{shop.totalQuantity} sản phẩm</div>
                    )}
                  </div>
                </div>
                <Link
                  to={`/shop/${shop.id}`}
                  className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Xem shop
                </Link>
              </div>
            </div>

            {/* Variants Selection */}
            {product.variantsDTOList && product.variantsDTOList.length > 0 && (
              <div className="space-y-4 mb-4">
                {product.variantsDTOList.map(variant => (
                  <div key={variant.id} className="space-y-2">
                    <h3 className="font-medium text-gray-700">
                      {variant.name}:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {variant.variantValueDTOList?.map(value => (
                        <button
                          key={value.id}
                          className={`px-4 py-2 border rounded-md transition-colors ${
                            selectedVariantValues[variant.id] === value.id
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => {
                            // Cập nhật giá trị biến thể đã chọn
                            const newSelectedValues = {
                              ...selectedVariantValues,
                              [variant.id]: value.id,
                            };
                            setSelectedVariantValues(newSelectedValues);

                            // Tìm SKU phù hợp với tổ hợp biến thể đã chọn
                            const matchingSku = findMatchingSku(
                              product,
                              newSelectedValues
                            );
                            if (matchingSku) {
                              setSelectedSku(matchingSku.id);
                            }
                          }}
                        >
                          {value.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedSku && product.productSkusDTOList
                ? (() => {
                    const selectedSkuObj = product.productSkusDTOList.find(
                      sku => sku.id === selectedSku
                    );
                    return selectedSkuObj
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(selectedSkuObj.price)
                      : "Không có giá";
                  })()
                : product.amount
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.amount)
                : "Không có giá"}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-700">Số lượng:</span>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={
                  selectedSku && product.productSkusDTOList
                    ? product.productSkusDTOList.find(
                        sku => sku.id === selectedSku
                      )?.quantity || 1
                    : product.amount
                    ? 10
                    : 0
                }
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-4">
              <Button
                onClick={() => {
                  // Thêm sản phẩm vào giỏ hàng với biến thể đã chọn
                  console.log("Thêm vào giỏ:", {
                    productId: product.id,
                    skuId: selectedSku,
                    quantity: quantity,
                    selectedVariants: selectedVariantValues,
                  });
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={
                  selectedSku && product.productSkusDTOList
                    ? (product.productSkusDTOList.find(
                        sku => sku.id === selectedSku
                      )?.quantity || 0) === 0
                    : product.amount === 0
                }
              >
                Thêm vào giỏ
              </Button>
              <Button
                onClick={() => {
                  // Mua ngay sản phẩm với biến thể đã chọn
                  console.log("Mua ngay:", {
                    productId: product.id,
                    skuId: selectedSku,
                    quantity: quantity,
                    selectedVariants: selectedVariantValues,
                  });
                }}
                className="flex-1"
                disabled={
                  selectedSku && product.productSkusDTOList
                    ? (product.productSkusDTOList.find(
                        sku => sku.id === selectedSku
                      )?.quantity || 0) === 0
                    : product.amount === 0
                }
              >
                Mua ngay
              </Button>
            </div>

            {/* Product Tags - Tạm thời bỏ qua vì không có trong Product interface */}
            {/* Nếu cần hiển thị tags, Product interface cần được cập nhật */}
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Mô tả sản phẩm</h2>
          <div className="prose max-w-none">
            {product.content ? (
              <div className="text-gray-700 leading-relaxed">
                {parse(product.content)}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Không có mô tả chi tiết cho sản phẩm này.
              </p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Thông số sản phẩm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {product.brand && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Thương hiệu:
                </span>
                <span className="text-gray-600">{product.brand}</span>
              </div>
            )}
            {product.material && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Chất liệu:
                </span>
                <span className="text-gray-600">{product.material}</span>
              </div>
            )}
            {product.origin && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Xuất xứ:
                </span>
                <span className="text-gray-600">{product.origin}</span>
              </div>
            )}
            {product.style && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Phong cách:
                </span>
                <span className="text-gray-600">{product.style}</span>
              </div>
            )}
            {(product.height || product.width || product.length) && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Kích thước:
                </span>
                <span className="text-gray-600">
                  {[
                    product.height && `Cao ${product.height}cm`,
                    product.width && `Rộng ${product.width}cm`,
                    product.length && `Dài ${product.length}cm`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {product.weight && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Trọng lượng:
                </span>
                <span className="text-gray-600">{product.weight}g</span>
              </div>
            )}
            {product.isNew !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Sản phẩm mới:
                </span>
                <span className="text-gray-600">
                  {product.isNew ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isFlashSale !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Flash sale:
                </span>
                <span className="text-gray-600">
                  {product.isFlashSale ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.isTrending !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Xu hướng:
                </span>
                <span className="text-gray-600">
                  {product.isTrending ? "Có" : "Không"}
                </span>
              </div>
            )}
            {product.timeCreate && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Ngày đăng:
                </span>
                <span className="text-gray-600">{product.timeCreate}</span>
              </div>
            )}
            {product.categoryDto && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Danh mục:
                </span>
                <span className="text-gray-600">
                  {product.categoryDto.parent?.name &&
                    `${product.categoryDto.parent.name} > `}
                  {product.categoryDto.name}
                </span>
              </div>
            )}
            {product.totalReview !== undefined && (
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium text-gray-700 w-1/3">
                  Số đánh giá:
                </span>
                <span className="text-gray-600">{product.totalReview}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Reviews */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <ProductReviews 
            averageRating={product.star || 0}
            totalReviews={product.totalReview || 0}
            reviews={[
              // Mock data - Thay thế bằng dữ liệu thực từ API
              {
                id: 1,
                user: {
                  name: "Nguyễn Văn A",
                  avatar: "https://i.pravatar.cc/150?img=1"
                },
                rating: 5,
                comment: "Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh. Tôi rất hài lòng với sản phẩm này. Chất lượng vượt ngoài mong đợi!",
                date: format(new Date(2025, 6, 15), "dd/MM/yyyy", { locale: vi }),
                images: [
                  "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                ]
              },
              {
                id: 2,
                user: {
                  name: "Trần Thị B",
                  avatar: "https://i.pravatar.cc/150?img=2"
                },
                rating: 4,
                comment: "Sản phẩm đẹp, giá cả hợp lý. Nhưng màu sắc hơi khác so với hình ảnh một chút.",
                date: format(new Date(2025, 6, 10), "dd/MM/yyyy", { locale: vi }),
                images: []
              },
              {
                id: 3,
                user: {
                  name: "Lê Văn C",
                  avatar: "https://i.pravatar.cc/150?img=3"
                },
                rating: 5,
                comment: "Tuyệt vời! Tôi sẽ mua thêm sản phẩm khác của cửa hàng.",
                date: format(new Date(2025, 5, 28), "dd/MM/yyyy", { locale: vi }),
                images: [
                  "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                ]
              }
            ]}
            onAddReview={(rating, comment) => {
              // Xử lý khi người dùng gửi đánh giá
              console.log("Đánh giá mới:", { rating, comment });
              // TODO: Gọi API để lưu đánh giá
              alert(`Cảm ơn bạn đã đánh giá ${rating} sao!`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Tìm SKU phù hợp với tổ hợp các giá trị biến thể đã chọn
 * @param product Sản phẩm hiện tại
 * @param selectedValues Các giá trị biến thể đã chọn theo variantId
 * @returns SKU phù hợp hoặc undefined nếu không tìm thấy
 */
const findMatchingSku = (
  product: Product,
  selectedValues: Record<number, number>
) => {
  if (!product.productSkusDTOList || product.productSkusDTOList.length === 0) {
    return undefined;
  }

  // Lấy tất cả các giá trị biến thể đã chọn
  const selectedValueIds = Object.values(selectedValues);

  // Tìm SKU phù hợp với tất cả các giá trị biến thể đã chọn
  return product.productSkusDTOList.find(sku => {
    // Kiểm tra xem SKU có chứa tất cả các giá trị biến thể đã chọn không
    const skuVariantValueIds = [
      sku.variantValueId1,
      sku.variantValueId2,
    ].filter(Boolean);

    // SKU phù hợp nếu nó chứa ít nhất một giá trị biến thể đã chọn
    // và không chứa bất kỳ giá trị biến thể nào không được chọn
    return selectedValueIds.some(valueId =>
      skuVariantValueIds.includes(valueId)
    );
  });
};

export default ProductDetailPage;

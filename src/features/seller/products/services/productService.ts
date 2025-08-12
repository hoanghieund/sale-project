import { Axios } from "@/api/Axios";
import { Product } from "@/types";

/**
 * Các kiểu dữ liệu phục vụ cho service sản phẩm phía Seller
 * Giữ nhỏ gọn, tập trung đúng payload theo API thực tế backend.
 */
export interface UpdateProductMediaPayload {
  /** JSON mô tả sản phẩm; bắt buộc có id để backend xác định record */
  product: Partial<Product> & { id: number };
  /** Ảnh chính mới (tuỳ chọn) */
  newMainImage?: File | null;
  /** Danh sách ảnh phụ thêm mới (tuỳ chọn) */
  addSubImages?: File[] | null;
  /** Danh sách id ảnh cần xoá (tuỳ chọn) */
  removeImageIds?: number[] | null;
}

export interface GetProductsByShopParams {
  page: number; // base-0
  size: number;
  textSearch?: string; // tìm theo tên sản phẩm
}

export interface PageResult<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number?: number;
  size?: number;
}

// Helper: build FormData an toàn, không đẩy field null/undefined
function appendIfPresent(fd: FormData, key: string, value: any) {
  if (value === undefined || value === null) return;
  // Với mảng số (ids) -> stringify để backend parse JSON
  if (Array.isArray(value) && typeof value[0] === "number") {
    fd.append(key, JSON.stringify(value));
    return;
  }
  fd.append(key, value as any);
}

export const productService = {
  /**
   * @method getProducts
   * @description Get products information.
   * @returns {Promise<Product[]>} Products information.
   */
  getProducts: async () => {
    return Axios.get("/api/products");
  },

  /**
   * @method getProductById
   * @description Get products information.
   * @returns {Promise<Product[]>} Products information.
   */
  getProductById: async (slug: string) => {
    return Axios.get(`/api/public/product/slug/${slug}`);
  },

  /**
   * @method createProduct
   * @description Tạo sản phẩm hàng loạt bằng Excel (admin endpoint).
   * @param file File Excel (.xlsx)
   * @param categoryId id category
   * @param collectionId id collection
   * @returns {Promise<string>} Thông điệp từ server (VD: "Import thành công 20 sản phẩm!")
   */
  createProduct: async (
    file: File,
    categoryId: number,
    collectionId: number
  ) => {
    // Gửi multipart/form-data theo spec: file, shopId, categoryId, collectionId
    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", String(categoryId));
    formData.append("collectionId", String(collectionId));

    return Axios.post("/api/admin/uploadExcelProduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * @method updateProduct
   * @description Cập nhật sản phẩm (JSON + ảnh) theo form-data.
   * @param payload UpdateProductMediaPayload
   * @returns {Promise<Product>} Thông tin sản phẩm sau cập nhật
   */
  updateProduct: async (
    productId: string,
    payload: UpdateProductMediaPayload
  ) => {
    const { product, newMainImage, addSubImages, removeImageIds } = payload;
    const formData = new FormData();
    // Backend yêu cầu key "product" là JSON string
    formData.append("product", JSON.stringify(product));
    appendIfPresent(formData, "newMainImage", newMainImage || null);
    // Ảnh phụ có thể nhiều file – theo Postman: key "addSubImages" có thể lặp
    if (addSubImages && addSubImages.length) {
      addSubImages.forEach(file => formData.append("addSubImages", file));
    }
    appendIfPresent(formData, "removeImageIds", removeImageIds || null);

    return Axios.put(`/api/product/update/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * @method changeProductStatus
   * @description Thay đổi trạng thái hiển thị của sản phẩm trên trang người dùng.
   * @param productId id sản phẩm
   * @param status true=hiện, false=ẩn
   */
  changeProductStatus: async (productId: number, status: boolean) => {
    return Axios.get("/api/product/changeProductStatus", { productId, status });
  },

  /**
   * @method getAllProductByShop
   * @description Tìm và hiển thị sản phẩm theo shop hiện tại (theo token), hỗ trợ textSearch theo tên.
   * @param params { page, size, textSearch }
   * @returns {Promise<PageResult<Product>>}
   */
  getAllProductByShop: async (
    params: GetProductsByShopParams
  ): Promise<PageResult<Product>> => {
    const { page, size, textSearch } = params;
    return Axios.get("/api/product/getAllProductByShop", {
      page,
      size,
      textSearch,
    });
  },

  /**
   * @method deleteProduct
   * @description Delete a product.
   * @param {string} id - Product ID.
   * @returns {Promise<void>} Delete product information.
   */
  deleteProduct: async (id: string) => {
    return Axios.del(`/api/products/${id}`);
  },
};

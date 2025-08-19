import { Axios } from "@/api/Axios";
import { Product } from "@/types";

/**
 * Data types for Seller product services.
 * Keep it concise and focused on payloads that match the real backend API.
 */
export interface UpdateProductMediaPayload {
  /** Product JSON; must include id for backend to identify the record */
  product: Partial<Product> & { id: number };
  /** New main image (optional) */
  newMainImage?: File | null;
  /** Additional sub images to add (optional) */
  addSubImages?: File[] | null;
  /** Image ids to remove (optional) */
  removeImageIds?: number[] | null;
}

export interface GetProductsByShopParams {
  page: number; // base-0
  size: number;
  textSearch?: string; // search by product name
  categoryId?: number;
}

export interface PageResult<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number?: number;
  size?: number;
}

// Helper: build FormData safely, avoid appending null/undefined fields
function appendIfPresent(fd: FormData, key: string, value: any) {
  if (value === undefined || value === null) return;
  // For numeric arrays (ids) -> stringify so the backend can parse JSON
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
   * @description Create products in bulk via Excel (admin endpoint).
   * @param file Excel file (.xlsx)
   * @param collectionId collection id (optional)
   * @returns {Promise<string>} Server message (e.g., "Imported 20 products successfully!")
   */
  createProduct: async (file: File, collectionId?: number) => {
    // Send multipart/form-data as per spec: file, shopId, categoryId, collectionId
    const formData = new FormData();
    formData.append("file", file);
    // Only append when collectionId is valid
    if (typeof collectionId === "number" && !Number.isNaN(collectionId)) {
      formData.append("collectionId", String(collectionId));
    }

    return Axios.post("/api/product/uploadExcelProduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * @method updateProduct
   * @description Update product (JSON + images) via form-data.
   * @param payload UpdateProductMediaPayload
   * @returns {Promise<Product>} Updated product info
   */
  updateProduct: async (
    productId: string,
    payload: UpdateProductMediaPayload
  ) => {
    const { product, newMainImage, addSubImages, removeImageIds } = payload;
    const formData = new FormData();
    // Backend expects the key "product" to be a JSON string
    formData.append("product", JSON.stringify(product));
    appendIfPresent(formData, "newMainImage", newMainImage || null);
    // Sub images may include multiple files – the key "addSubImages" can repeat
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
   * @description Change product visibility on the storefront.
   * @param productId product id
   * @param status true=visible, false=hidden
   */
  changeProductStatus: async (productId: number, status: boolean) => {
    return Axios.get("/api/product/changeProductStatus", { productId, status });
  },

  /**
   * @method getAllProductByShop
   * @description Find and display products for the current shop (from token), supports textSearch by name.
   * @param params { page, size, textSearch }
   * @returns {Promise<PageResult<Product>>}
   */
  getAllProductByShop: async (
    params: GetProductsByShopParams
  ): Promise<PageResult<Product>> => {
    const { page, size, textSearch, categoryId } = params;
    return Axios.get("/api/product/getAllProductByShop", {
      page,
      size,
      textSearch,
      categoryId,
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

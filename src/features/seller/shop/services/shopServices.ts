import { Axios } from "@/api/Axios";

export const shopService = {
  /**
   * @method getShop
   * @description Get shop information.
   * @returns {Promise<Shop>} Shop information.
   */
  getShop: async () => {
    return Axios.get("/api/shop/my-shop");
  },
  /**
   * @method updateShop
   * @description Update shop info using multipart/form-data. The payload includes:
   *  - "shop": JSON part with Content-Type "application/json" containing text fields
   *  - "banner": File part for banner image
   *  - "logo": File part for logo image
   * @param {object} params - Update payload
   * @param {object} params.shop - JSON body for shop fields
   * @param {string} params.shop.name - Shop name
   * @param {string} [params.shop.description] - Shop description
   * @param {string} [params.shop.contactEmail] - Contact email
   * @param {string} [params.shop.contactPhone] - Contact phone
   * @param {File}   [params.banner] - Banner image file
   * @param {File}   [params.logo] - Logo image file
   * @returns {Promise<any>} Updated shop information.
   */
  updateShop: async (params: {
    shop: {
      name: string;
      description?: string;
      contactEmail?: string;
      contactPhone?: string;
    };
    banner?: File | null;
    logo?: File | null;
  }) => {
    console.log("🚀 ~ params:", params);
    // Build FormData with a JSON part for "shop" and file parts for images
    const formData = new FormData();

    // Ensure the "shop" field is sent as application/json
    const shopBlob = new Blob([JSON.stringify(params.shop)], {
      type: "application/json",
    });
    formData.append("shop", shopBlob);

    // Append files only if provided
    if (params.banner) {
      formData.append("banner", params.banner);
    }
    if (params.logo) {
      formData.append("logo", params.logo);
    }

    // Let Axios send multipart/form-data; boundary will be set automatically
    return Axios.put("/api/shop/my-shop", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

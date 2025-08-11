/**
 * @file Shop Management Page for Seller module.
 * Displays current shop information and allows navigating to the edit page.
 * If there is no shop, the initial shop creation form will be shown.
 */

import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import {
  ShopForm,
  ShopFormData,
} from "@/features/seller/shop/components/ShopForm";
import { shopService } from "@/features/seller/shop/services/shopServices";
import { Shop } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Assume sonner is available for notifications

const ShopManagementPage: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const shopData = await shopService.getShop();
        setShop(shopData);
      } catch (err: any) {
        // Log error when loading shop and show a friendly message
        toast.error("Error", {
          description: err?.message || "Unable to load shop information.",
        });
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  /**
   * @function dataURLToFile
   * @description Convert a DataURL (base64) string to a File for multipart/form-data upload.
   * Note: Only call when the string starts with "data:". For http(s) URLs, do not convert.
   */
  const dataURLToFile = (dataUrl: string, filenamePrefix: string): File => {
    // Extract MIME and base64 data from DataURL
    const [header, base64] = dataUrl.split(",");
    const mimeMatch = header.match(/:(.*?);/);
    const mime = (mimeMatch && mimeMatch[1]) || "image/png";

    // Decode base64 -> Uint8Array
    const binary = atob(base64 || "");
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);

    // Infer extension from MIME
    const ext = (mime.split("/")[1] || "png").split("+")[0];
    return new File([bytes], `${filenamePrefix}.${ext}`, { type: mime });
  };

  /**
   * @function handleSubmit
   * @description Handle saving shop changes: update name, logo (avatar), and banner as required.
   */
  const handleSubmit = async (data: ShopFormData) => {
    try {
      setLoading(true);
      // If logo/banner is a DataURL (newly selected), convert to File; if it's an existing URL, skip re-upload
      const logoFile =
        data.logo && data.logo.startsWith("data:")
          ? dataURLToFile(data.logo, "logo")
          : undefined;
      const bannerFile =
        data.banner && data.banner.startsWith("data:")
          ? dataURLToFile(data.banner, "banner")
          : undefined;

      // Call service using multipart/form-data
      const updated = await shopService.updateShop({
        // Send text fields per API spec: name, description, contactEmail, contactPhone
        shop: {
          name: data.name,
          description: data.description || undefined,
          contactEmail: data.contactEmail || undefined,
          contactPhone: data.contactPhone || undefined,
        },
        ...(logoFile ? { logo: logoFile } : {}),
        ...(bannerFile ? { banner: bannerFile } : {}),
      });
      setShop(updated);
      toast.success("Shop information saved");
    } catch (err: any) {
      toast.error("Save failed", {
        description: err?.message || "Unable to update shop information.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!shop) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <EmptyStateDisplay />
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ShopForm
        shop={shop || undefined}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default ShopManagementPage;

/**
 * @file Shop Management Page for Seller module.
 * Displays current shop information and allows navigating to the edit page.
 * If there is no shop, the initial shop creation form will be shown.
 */

import EmptyStateDisplay from "@/components/common/EmptyStateDisplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShopForm,
  ShopFormData,
} from "@/features/seller/shop/components/ShopForm";
import { shopService } from "@/features/seller/shop/services/shopServices";
import { Shop } from "@/types";
import { formatDate } from "@/utils/formatters"; // Format date for timeRequest
import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Assume sonner is available for notifications

const ShopManagementPage: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
      setIsEditing(false);
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
    return <EmptyStateDisplay />;
  }

  // Create/Edit mode: show form when editing or when there is no shop
  if (isEditing) {
    return (
      <ShopForm
        shop={shop || undefined}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    );
  }

  // Display shop information
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle>Your shop information</CardTitle>
          <CardDescription>Showing only Name, Logo and Banner</CardDescription>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit information</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Shop name</p>
            <p className="text-lg font-semibold">{shop?.name}</p>
          </div>
          {/* Slug (if any) */}
          {shop?.slug && (
            <div>
              <p className="text-sm font-medium text-gray-500">Slug</p>
              <p className="text-base">{shop.slug}</p>
            </div>
          )}
          {/* Active status */}
          {typeof shop?.status !== "undefined" && (
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-base">{shop.status ? "Active" : "Inactive"}</p>
            </div>
          )}
          {/* Request time (timeRequest) */}
          {shop?.timeRequest && (
            <div>
              <p className="text-sm font-medium text-gray-500">Request time</p>
              <p className="text-base">{formatDate(shop.timeRequest)}</p>
            </div>
          )}
        </div>

        {/* Shop description (if any) */}
        {shop.description && (
          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-base whitespace-pre-line">{shop.description}</p>
          </div>
        )}

        {/* Contact information (if any) */}
        {(shop.contactEmail || shop.contactPhone) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shop.contactEmail && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Contact email
                </p>
                <a
                  href={`mailto:${shop.contactEmail}`}
                  className="text-base text-blue-600 hover:underline"
                >
                  {shop.contactEmail}
                </a>
              </div>
            )}
            {shop.contactPhone && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Phone number
                </p>
                <p className="text-base">{shop.contactPhone}</p>
              </div>
            )}
          </div>
        )}

        {shop?.avatar && (
          <div>
            <p className="text-sm font-medium text-gray-500">Logo</p>
            <img
              src={shop.avatar}
              alt="Shop Logo"
              className="w-24 h-24 object-cover rounded-md mt-2"
            />
          </div>
        )}
        {shop?.banner && (
          <div>
            <p className="text-sm font-medium text-gray-500">Banner</p>
            <img
              src={shop.banner}
              alt="Shop Banner"
              className="w-full h-48 object-cover rounded-md mt-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopManagementPage;

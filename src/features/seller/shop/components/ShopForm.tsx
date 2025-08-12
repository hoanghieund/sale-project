/**
 * @file ShopForm component for managing shop information.
 * Allows shop owners to view and edit basic shop info like name, description, contact, logo and banner.
 * Uses react-hook-form and shadcn/ui components for the form.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FileDropzone from "@/components/common/FileDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Use shadcn Textarea for description
import { Shop } from "@/types";

/**
 * @schema shopSchema
 * @description Schema validation for shop form using Zod.
 */
const shopSchema = z.object({
  // Extend: add description and contact info (email/phone)
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  description: z.string().optional().or(z.literal("")),
  contactEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  logo: z.string().optional(), // URL ảnh đại diện (DataURL hoặc URL)
  banner: z.string().optional(), // URL banner (DataURL hoặc URL)
});

/**
 * @typedef {z.infer<typeof shopSchema>} ShopFormData
 * @description Data type for the shop form.
 */
export type ShopFormData = z.infer<typeof shopSchema>; // Thêm export ở đây

/**
 * @interface ShopFormProps
 * @description Props for the ShopForm component.
 * @property {Shop} [shop] - Existing shop data (if any).
 * @property {(data: ShopFormData) => void} onSubmit - Submit handler for the form.
 * @property {boolean} [isLoading] - Loading state while submitting.
 */
interface ShopFormProps {
  shop?: Shop;
  onSubmit: (data: ShopFormData) => void;
  isLoading?: boolean;
}

/**
 * @function ShopForm
 * @description Form component to edit shop information.
 * @param {ShopFormProps} props - Component props.
 * @returns {JSX.Element} ShopForm component.
 */
export const ShopForm: React.FC<ShopFormProps> = ({
  shop,
  onSubmit,
  isLoading,
}) => {
  // State để quản lý preview hình ảnh logo và banner
  const [logoPreview, setLogoPreview] = useState<string | null>(
    shop?.avatar || null
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    shop?.banner || null
  );
  // State file cho FileDropzone (controlled)
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);

  // Khởi tạo form với react-hook-form và zodResolver
  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: shop?.name || "",
      description: shop?.description || "",
      contactEmail: shop?.contactEmail || "",
      contactPhone: shop?.contactPhone || "",
    },
  });

  // Responsive: theo dõi breakpoint md để điều chỉnh kích thước preview
  // Sử dụng matchMedia để đồng bộ với Tailwind md (min-width: 768px)
  const [isMdUp, setIsMdUp] = useState<boolean>(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update(); // Khởi tạo theo kích thước hiện tại
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // Kích thước thumbnail linh hoạt cho mobile/tablet/desktop
  const logoThumb = isMdUp ? 320 : 200;
  const bannerThumb = isMdUp ? 320 : 200;

  /**
   * Helper: convert File -> DataURL for consistent preview/storage handling
   */
  const fileToDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /**
   * @function handleLogoFilesChange
   * @description Sync FileDropzone (logo) with DataURL preview
   */
  const handleLogoFilesChange = async (files: File[]) => {
    // Only take the first file as logo/avatar
    const next = files.slice(0, 1);
    setLogoFiles(next);
    if (next[0]) {
      try {
        const url = await fileToDataURL(next[0]);
        setLogoPreview(url);
      } catch {
        // Keep existing preview if read fails
      }
    } else {
      setLogoPreview(null);
    }
  };

  /**
   * @function handleBannerFilesChange
   * @description Sync FileDropzone (banner) with DataURL preview
   */
  const handleBannerFilesChange = async (files: File[]) => {
    const next = files.slice(0, 1);
    setBannerFiles(next);
    if (next[0]) {
      try {
        const url = await fileToDataURL(next[0]);
        setBannerPreview(url);
      } catch {
        // Ignore file read error
      }
    } else {
      setBannerPreview(null);
    }
  };

  /**
   * @function removeLogo
   * @description Remove selected logo image.
   */
  const removeLogo = () => {
    setLogoPreview(null);
    setLogoFiles([]);
  };

  /**
   * @function removeBanner
   * @description Remove selected banner image.
   */
  const removeBanner = () => {
    setBannerPreview(null);
    setBannerFiles([]);
  };

  /**
   * @function handleSubmit
   * @description Handle form submit.
   * Merge form data with logo/banner URL and call onSubmit from props.
   * @param {ShopFormData} data - Form data.
   */
  const handleSubmit = (data: ShopFormData) => {
    onSubmit({
      ...data,
      logo: logoPreview || undefined, // Ensure undefined if no image
      banner: bannerPreview || undefined, // Ensure undefined if no image
    });
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Shop information</CardTitle>
        <CardDescription>Update your shop's basic information</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Shop name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description and contact information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact email */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@domain.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact phone */}
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Shop description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Short description about your shop"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Khu vực Upload Logo và Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Logo */}
              <div>
                <label className="text-sm font-medium mb-2 block">Avatar</label>
                <FileDropzone
                  files={logoFiles}
                  onFilesChange={handleLogoFilesChange}
                  accept="image/*"
                  maxFiles={1}
                  thumbSize={logoThumb}
                  thumbAlign="center"
                  // Hiển thị preview ban đầu từ URL hiện có hoặc preview state
                  initialPreviewUrl={logoPreview || undefined}
                  previewAlt="Shop avatar preview"
                  onClearInitialPreview={removeLogo}
                />
              </div>

              {/* Upload Banner */}
              <div>
                <label className="text-sm font-medium mb-2 block">Banner</label>
                {/* FileDropzone dành cho banner */}
                <FileDropzone
                  files={bannerFiles}
                  onFilesChange={handleBannerFilesChange}
                  accept="image/*"
                  maxFiles={1}
                  thumbSize={bannerThumb}
                  thumbAlign="center"
                  // Hiển thị preview ban đầu từ URL hiện có hoặc preview state
                  initialPreviewUrl={bannerPreview || undefined}
                  previewAlt="Shop banner preview"
                  onClearInitialPreview={removeBanner}
                />
              </div>
            </div>

            {/* Submit buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

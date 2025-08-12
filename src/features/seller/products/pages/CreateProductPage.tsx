/**
 * @file Create Product Page for the Seller module.
 * This page supports bulk product creation via Excel file upload.
 * Note: Single product creation will be handled in a future update.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// shadcn Select for choosing a collection
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesService } from "@/features/seller/categories/services/categoriesService"; // service to fetch collections
import { productService } from "@/features/seller/products/services/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2, Upload, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react"; // Add useState, useEffect
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

/**
 * @function CreateProductPage
 * @description Component for creating products via Excel upload.
 * @returns {JSX.Element} Create product page.
 */
const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false); // Submitting state for Excel upload
  const [collections, setCollections] = useState<
    Array<{ id: number; name: string }>
  >([]); // Collections list for the Select
  const [loadingCollections, setLoadingCollections] = useState(false); // Loading state for collections

  // Schema for Excel upload (bulk creation)
  const excelSchema = useMemo(
    () =>
      z.object({
        // Validation: required File, correct mime, size <= 5MB
        // Use z.custom<File> to avoid crashes when undefined and to ensure subsequent refines are typed as File
        file: z
          .custom<File>(v => v instanceof File, {
            message: "Please select an Excel file",
          })
          .refine(
            f =>
              [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
              ].includes(f.type),
            "File must be .xlsx or .xls format"
          )
          .refine(
            f => f.size <= 5 * 1024 * 1024,
            "File size must be up to 5MB"
          ),
        // Collection is required
        collectionId: z.coerce
          .number({ invalid_type_error: "Please select a collection" })
          .int()
          .min(1, "Please select a collection"),
      }),
    []
  );

  type ExcelFormData = z.infer<typeof excelSchema>;
  const excelForm = useForm<ExcelFormData>({
    resolver: zodResolver(excelSchema),
    // Show errors upon submit; re-validate on change afterwards
    mode: "onSubmit",
    reValidateMode: "onChange",
    // Do not hard-set collection ID; user will choose after fetch
    defaultValues: { collectionId: undefined } as any,
  });

  useEffect(() => {
    // Fetch the collections list for the Select (first page with large size)
    const fetchCollections = async () => {
      setLoadingCollections(true);
      try {
        const res: any = await categoriesService.getCollections({
          page: 0,
          size: 100,
        });
        // API may return a paginated object or a flat array
        const items: Array<{ id: number; name: string }> = Array.isArray(res)
          ? res
          : res?.content ?? [];
        setCollections(items);
        // If no value yet and data is available, we could set the first item by default (optional)
        const current = excelForm.getValues("collectionId");
        if ((current === undefined || current === null) && items.length > 0) {
          // Do not auto-set to avoid accidental selection; keep empty for user choice
        }
      } catch (err: any) {
        toast.error("Error", {
          description: err?.message || "Failed to load collections.",
        });
      } finally {
        setLoadingCollections(false);
      }
    };
    fetchCollections();
  }, [excelForm]);

  /**
   * @function onSubmitExcel
   * @description Upload Excel file to create products in bulk.
   */
  const onSubmitExcel = async (values: ExcelFormData) => {
    try {
      setSubmitting(true);
      // Get the file from input (supports File or FileList)
      const file: File = Array.isArray(values.file)
        ? values.file[0]
        : (values.file as any);

      await productService.createProduct(file, values.collectionId);
      toast.success("Excel uploaded successfully");
      navigate("/seller/products"); // Navigate back to see results
    } catch (err: any) {
      toast.error("Error", {
        description: err?.message || "Failed to upload Excel.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Watch selected file to display name/size below the dropzone (better UX)
  const selectedFile = excelForm.watch("file") as File | undefined;

  return (
    <>
      {/* Centered container for better readability on mobile */}
      <div className="px-4 sm:px-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Create Products via Excel</CardTitle>
            <CardDescription>
              Upload an Excel file to create products in bulk for your shop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Download sample Excel: link to a static file under public/templates */}
            <div className="flex justify-end">
              {/* Note: Place the sample at public/templates/product-import.xlsx */}
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://eu2.contabostorage.com/640a6ca02f434b49a6e50d30fe9a6cd9:bucket.team1/demo-excel-upload-product.xlsx"
                  download
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download template
                </a>
              </Button>
            </div>
            {/* Excel upload for bulk product creation: react-hook-form + shadcn form */}
            <Form {...excelForm}>
              <form
                onSubmit={excelForm.handleSubmit(
                  onSubmitExcel,
                  // On submit error: focus the first errored field and show a toast
                  errors => {
                    const first = Object.keys(errors)[0] as
                      | keyof ExcelFormData
                      | undefined;
                    if (first) {
                      try {
                        excelForm.setFocus(first as any);
                      } catch (_) {
                        // noop: some custom fields (Select) may not be focusable
                      }
                    }
                    toast.error("Please check the required fields");
                  }
                )}
              >
                {/* Choose Collection (required) */}
                <FormField
                  control={excelForm.control}
                  name="collectionId"
                  render={({ field, fieldState }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Collection</FormLabel>
                      <FormControl>
                        <Select
                          value={
                            field.value !== undefined && field.value !== null
                              ? String(field.value)
                              : undefined
                          }
                          onValueChange={val => {
                            // Connect directly with RHF so FormMessage works properly
                            field.onChange(val);
                          }}
                          // When closing Select without a choice, mark touched so error shows after submit
                          onOpenChange={open => {
                            if (!open) field.onBlur();
                          }}
                          disabled={loadingCollections}
                        >
                          <SelectTrigger
                            aria-label="Select collection"
                            className={
                              excelForm.formState.errors.collectionId
                                ? "border-destructive focus-visible:ring-destructive"
                                : undefined
                            }
                          >
                            <SelectValue
                              placeholder={
                                loadingCollections
                                  ? "Loading..."
                                  : "Select a collection"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {collections.map(c => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Please select a collection to apply to the Excel data.
                      </FormDescription>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={excelForm.control}
                  name="file"
                  render={({ field, fieldState }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Excel file</FormLabel>
                      <FormControl>
                        {/* Simple dropzone: label + hidden input for better UX */}
                        <label
                          className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed ${
                            excelForm.formState.errors.file
                              ? "border-destructive"
                              : "border-muted"
                          } rounded-md bg-muted/30 hover:bg-muted/40 transition-colors cursor-pointer`}
                          onDragOver={e => {
                            e.preventDefault();
                          }}
                          onDrop={e => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              // Connect directly with RHF so FormMessage works properly
                              field.onChange(file);
                            }
                          }}
                          aria-label="Drag and drop or choose an Excel file"
                        >
                          <Upload className="h-5 w-5 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Drag & drop or click to choose a file
                          </span>
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            className="sr-only"
                            name={field.name}
                            ref={field.ref}
                            onChange={e => {
                              // Connect directly with RHF so FormMessage works properly
                              const f = e.target.files?.[0];
                              field.onChange(f);
                            }}
                            disabled={submitting}
                            aria-invalid={!!excelForm.formState.errors.file}
                          />
                        </label>
                      </FormControl>
                      {selectedFile && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-muted px-2 py-1 text-xs">
                          <span
                            className="truncate max-w-[240px]"
                            title={selectedFile.name}
                          >
                            {selectedFile.name} (
                            {((selectedFile.size || 0) / 1024).toFixed(1)} KB)
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => field.onChange(undefined)}
                            aria-label="Clear selected file"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <FormDescription>
                        Supports .xlsx, .xls formats. Please ensure your data
                        matches the template.
                      </FormDescription>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                {/* Button group: stack on mobile to avoid overflow */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto"
                    aria-busy={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Excel
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/seller/products")}
                    className="w-full sm:w-auto"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
            {/* Footer reserved for future secondary actions */}
          </CardContent>
          <CardFooter className="justify-end" />
        </Card>
      </div>
    </>
  );
};

export default CreateProductPage;

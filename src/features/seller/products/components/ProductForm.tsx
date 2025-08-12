/**
 * @file ProductForm component for creating and editing products.
 * Provides a form for shop owners to enter product information including name, description, price, stock, category, images, and active status.
 * Supports uploading multiple images with preview and drag & drop reordering.
 * Uses react-hook-form with zodResolver for form state and validation.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { arrayMoveImmutable } from "array-move";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
// Use shared project types to align with the actual SQL structure
import { Category, Product } from "@/types";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Upload, X } from "lucide-react";

/**
 * @schema productSchema
 * @description Schema validation for the product form using Zod.
 */
const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
  price: z.preprocess(
    val => Number(val),
    z
      .number()
      .min(0, "Price must be a positive number")
      .max(1000000000, "Price is too large")
  ),
  stock: z.preprocess(
    val => Number(val),
    z
      .number()
      .int()
      .min(0, "Stock must be a non-negative integer")
      .max(1000000, "Stock is too large")
  ),
  categoryId: z.string().min(1, "Please select a category"),
  images: z.array(z.string()).optional(), // Array of image URLs
  isActive: z.boolean().default(true),
});

/**
 * @typedef {z.infer<typeof productSchema>} ProductFormData
 * @description Form data type definition for Product form.
 */
type ProductFormData = z.infer<typeof productSchema>;

/**
 * @interface ProductFormProps
 * @description Props for ProductForm component.
 * @property {Product} [initialData] - Initial product data (for edit mode).
 * @property {(data: ProductFormData) => void} onSubmit - Submit handler.
 * @property {boolean} isLoading - Loading state while submitting.
 * @property {Category[]} categories - List of categories to choose from.
 */
interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
  categories: Category[];
}

// Drag Handle cho SortableItem
/**
 * @interface SortableImageItemProps
 * @description Props for SortableImageItem.
 * @property {string} id - Unique ID of the image (use the image URL as ID).
 * @property {string} image - Image URL.
 * @property {() => void} onRemove - Callback to remove the image.
 */
interface SortableImageItemProps {
  id: string;
  image: string;
  onRemove: () => void;
}

/**
 * @function SortableImageItem
 * @description Sortable image item component.
 * @param {SortableImageItemProps} props - Component props.
 */
const SortableImageItem: React.FC<SortableImageItemProps> = ({
  id,
  image,
  onRemove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <img
        src={image}
        alt="Product preview"
        className="w-24 h-24 object-cover rounded-md"
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

/**
 * @function ProductForm
 * @description Form component to create or edit a product.
 * @param {ProductFormProps} props - Component props.
 * @returns {JSX.Element} Component ProductForm.
 */
export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  categories,
}) => {
  // Initialize image previews from existing data (images or imagesDTOList)
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    ((initialData as any)?.images as string[]) ||
      ((initialData as any)?.imagesDTOList
        ?.map((img: any) => img?.path)
        .filter(Boolean) as string[]) ||
      []
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      // Safe mapping across different possible data shapes
      name: (initialData as any)?.name ?? (initialData as any)?.title ?? "",
      description:
        (initialData as any)?.description ??
        (initialData as any)?.content ??
        "",
      price: (initialData as any)?.price ?? 0,
      stock:
        (initialData as any)?.stock ?? (initialData as any)?.totalProduct ?? 0,
      categoryId: String(
        (initialData as any)?.categoryId ??
          (categories.length > 0 ? categories[0].id : "")
      ),
      images:
        ((initialData as any)?.images as string[]) ||
        ((initialData as any)?.imagesDTOList
          ?.map((img: any) => img?.path)
          .filter(Boolean) as string[]) ||
        [],
      isActive:
        (initialData as any)?.isActive ??
        Boolean((initialData as any)?.status) ??
        true,
    },
  });

  // Keep form.images in sync with local imagePreviews state
  React.useEffect(() => {
    form.setValue("images", imagePreviews);
  }, [imagePreviews, form]);

  /**
   * @function onDrop
   * @description Handle when dropping or selecting image files.
   * Read files and create preview URLs.
   * @param {File[]} acceptedFiles - Accepted files array.
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
  });

  /**
   * @function handleRemoveImage
   * @description Remove an image from the preview list.
   * @param {number} index - Index of the image to remove.
   */
  const handleRemoveImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * @function handleDragEnd
   * @description Handle drag end to reorder images.
   * @param {DndContext.active} active - The dragged element.
   * @param {DndContext.over} over - The element being dropped over.
   */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImagePreviews(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMoveImmutable(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Product" : "Create New Product"}
        </CardTitle>
        <CardDescription>
          Enter detailed information about your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Product name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed product description"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price and stock fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category field */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images upload area */}
            <div>
              <FormLabel>Product images</FormLabel>
              <div
                {...getRootProps()}
                className="mt-2 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
              >
                <input {...getInputProps()} />
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    {isDragActive
                      ? "Drop images here..."
                      : "Drag and drop images here, or click to select"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={imagePreviews}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {imagePreviews.map((image, index) => (
                          <SortableImageItem
                            key={image}
                            id={image} // Use the image URL as ID
                            image={image}
                            onRemove={() => handleRemoveImage(index)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
              <FormDescription className="mt-2">
                You can drag and drop to reorder images.
              </FormDescription>
            </div>

            {/* Active status field */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Active status
                    </FormLabel>
                    <FormDescription>
                      Whether this product is visible on the storefront.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit buttons: stack on mobile to avoid overflow; inline on larger screens */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

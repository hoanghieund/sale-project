// src/features/users/account-management/components/AddressForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Address } from '@/types';

// Define form validation schema using Zod
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }).regex(/^\d+$/, { message: "Invalid phone number format." }),
  address: z.string().min(1, { message: "Address is required." }),
  isCurrent: z.boolean().optional(),
  isShop: z.boolean().optional(),
});

/**
 * @interface AddressFormProps
 * @description Props for the AddressForm component.
 * @property {Address | null} initialData Initial address data when editing.
 * @property {(data: Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>) => void} onSubmit Callback function when form is submitted.
 * @property {() => void} onCancel Callback function when form is cancelled.
 */
interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (data: Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>) => void;
  onCancel: () => void;
}

/**
 * @function AddressForm
 * @description Form component for adding or editing an address.
 * @param {AddressFormProps} props Component props.
 * @returns {JSX.Element} React element.
 */
const AddressForm: React.FC<AddressFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      fullName: initialData.fullName,
      phoneNumber: initialData.phoneNumber,
      address: initialData.address,
      isCurrent: initialData.isCurrent,
      isShop: initialData.isShop,
    } : {
      fullName: "",
      phoneNumber: "",
      address: "",
      isCurrent: false,
      isShop: false,
    },
  });

  // Reset form values when initialData changes (when editing a different address)
  useEffect(() => {
    if (initialData) {
      form.reset({
        fullName: initialData.fullName,
        phoneNumber: initialData.phoneNumber,
        address: initialData.address,
        isCurrent: initialData.isCurrent,
        isShop: initialData.isShop,
      });
    } else {
      form.reset({
        fullName: "",
        phoneNumber: "",
        address: "",
        isCurrent: false,
        isShop: false,
      });
    }
  }, [initialData, form]);

  /**
   * @function handleSubmit
   * @description Handles form submission.
   * @param {z.infer<typeof formSchema>} values Form values.
   */
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    // Type cast values to match onSubmit type
    onSubmit(values as Omit<Address, 'id' | 'user' | 'provinceName' | 'districtName' | 'wardName' | 'shopIdDistrict'>);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="Enter full name" {...field} className="w-full" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl><Input placeholder="Enter phone number" {...field} className="w-full" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address</FormLabel>
              <FormControl><Textarea placeholder="Enter detailed address (e.g., house number, street name)" {...field} className="w-full" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Default Address Field */}
        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Set as default address</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Pickup Address Field */}
        <FormField
          control={form.control}
          name="isShop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Set as pickup address</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Address</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
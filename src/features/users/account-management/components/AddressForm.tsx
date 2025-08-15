// src/features/users/account-management/components/AddressForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Address } from "@/types";

// Define form validation schema using Zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  companyName: z.string().optional(),
  country: z.string().min(1, { message: "Country is required." }),
  addressLine1: z.string().min(1, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State/Province is required." }),
  postalCode: z
    .string()
    .regex(/^\d+$/, { message: "Postal code must be a number." })
    .min(5, { message: "Postal code must be at least 5 characters." })
    .max(5, { message: "Postal code must be at most 5 characters." }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\+?\d{1,3}(?:[\s-]?\d{1,4}){1,4}$/, {
      message: "Invalid phone number format.",
    }),
  email: z.string().email({ message: "Invalid email address." }),
  orderNotes: z.string().optional(),
  isCurrent: z.boolean().optional(),
  isShop: z.boolean().optional(),
});

/**
 * @interface AddressFormProps
 * @description Props for the AddressForm component.
 * @property {Address | null} initialData Initial address data when editing.
 * @property {(data: Omit<Address, 'id'>) => void} onSubmit Callback function when form is submitted.
 * @property {() => void} onCancel Callback function when form is cancelled.
 */
interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (data: Omit<Address, "id">) => void;
  onCancel: () => void;
}

/**
 * @function AddressForm
 * @description Form component for adding or editing an address.
 * @param {AddressFormProps} props Component props.
 * @returns {JSX.Element} React element.
 */
const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          companyName: initialData.companyName || "",
          country: initialData.country,
          addressLine1: initialData.addressLine1,
          addressLine2: initialData.addressLine2 || "",
          city: initialData.city,
          state: initialData.state,
          postalCode: initialData.postalCode,
          phoneNumber: initialData.phoneNumber,
          email: initialData.email,
          orderNotes: initialData.orderNotes || "",
          isCurrent: initialData.isCurrent,
        }
      : {
          firstName: "",
          lastName: "",
          companyName: "",
          country: "Vietnam",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          phoneNumber: "",
          email: "",
          orderNotes: "",
          isCurrent: false,
        },
  });

  // Reset form values when initialData changes (when editing a different address)
  useEffect(() => {
    if (initialData) {
      form.reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        companyName: initialData.companyName || "",
        country: initialData.country,
        addressLine1: initialData.addressLine1,
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city,
        state: initialData.state,
        postalCode: initialData.postalCode,
        phoneNumber: initialData.phoneNumber,
        email: initialData.email,
        orderNotes: initialData.orderNotes || "",
        isCurrent: initialData.isCurrent,
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        orderNotes: "",
        isCurrent: false,
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
    onSubmit(values as Omit<Address, "id">);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Name Fields - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company Name Field */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country Field */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Line 1 Field */}
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Street address, house number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Line 2 Field */}
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, unit, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City, State, Postal Code - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter postal code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Order Notes Field */}
        <FormField
          control={form.control}
          name="orderNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Notes about your order, e.g. special delivery instructions"
                  {...field}
                />
              </FormControl>
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

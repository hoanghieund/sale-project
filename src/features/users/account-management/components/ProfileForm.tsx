// src/features/users/account-management/components/ProfileForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useCallback, useRef } from "react"; // Thêm import useRef và useCallback
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Thêm import cho Avatar components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

// Form validation schema
const profileFormSchema = z.object({
  avatar: z.union([z.string(), z.instanceof(File)]).optional(), // Avatar can be string (URL) or File
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, { message: "Invalid phone number format." }),
  shopName: z
    .string()
    .max(100, { message: "Shop name cannot exceed 100 characters." })
    .optional(),
  gender: z.boolean({
    required_error: "Please select a gender.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  file: z.instanceof(File).optional(), // File field for handling image upload
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

/**
 * @component ProfileForm
 * @description Form for editing user profile information.
 * Uses react-hook-form and zod for validation.
 */
export function ProfileForm() {
  const { user, updateProfile } = useUser();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: user?.avatar || "", // Initialize avatar field
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      shopName: user?.shopName || "",
      // Convert gender from string to boolean: true for "male", false for "female"
      gender: user?.gender === "male" ? true : false,
      // Calculate dateOfBirth from dayOfBirth, monthOfBirth, yearOfBirth
      dateOfBirth:
        user.yearOfBirth && user.monthOfBirth && user.dayOfBirth
          ? new Date(
              user.yearOfBirth,
              user.monthOfBirth - 1, // Month in JavaScript is 0-indexed
              user.dayOfBirth
            )
          : undefined,
    },
    mode: "onChange",
  });

  // Create a ref for the file input
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click on avatar to trigger file input
  const handleAvatarClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // Handle file selection
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = e.target.files?.[0];
      if (file) {
        // Update 'file' field with the actual File object
        form.setValue("file", file);

        // Read file to display preview for 'avatar' field
        const reader = new FileReader();
        reader.onloadend = () => {
          field.onChange(reader.result as string); // Update avatar value in form (preview URL)
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  async function onSubmit(data: ProfileFormValues) {
    try {
      let formData = new FormData();
      formData.append("id", user.id.toString()); // Convert id to string
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("shopName", data.shopName || "");
      // Add file to formData if exists
      if (data.file) {
        formData.append("file", data.file);
      }
      // Convert boolean gender value to string for submission
      formData.append("gender", data.gender ? "true" : "false");

      // Process date of birth
      if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth);
        formData.append("dayOfBirth", date.getDate().toString());
        formData.append("monthOfBirth", (date.getMonth() + 1).toString()); // Month in JS is 0-indexed
        formData.append("yearOfBirth", date.getFullYear().toString());
      }

      await updateProfile(formData);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar Field */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-4">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                {/* Clicking this div will trigger the file input */}
                <div
                  className="relative w-24 h-24 cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {/* Display Avatar */}
                  <Avatar className="w-full h-full">
                    {field.value && typeof field.value === "string" && (
                      <AvatarImage src={field.value} alt="Profile picture" />
                    )}
                    {field.value && field.value instanceof File && (
                      <AvatarImage
                        src={URL.createObjectURL(field.value)}
                        alt="Profile picture"
                      />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* Hidden file input, triggered by clicking the Avatar */}
                  <Input
                    ref={inputRef} // Assign ref
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => handleFileChange(e, field)} // Handle file change
                    accept="image/*" // Only allow image files
                  />
                </div>
              </FormControl>
              <FormDescription>Upload your profile picture.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Information Group: Name, Email, Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
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
                  <Input placeholder="Your email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Personal Information Group: Gender, Date of Birth */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                    className="flex space-x-4" // Add spacing between radio items
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal", // Left-aligned and full width
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Shop Name Field (Optional) - Placed separately for better management */}
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your shop name" {...field} />
              </FormControl>
              <FormDescription>
                If you are a seller, this will be your shop name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">Update Profile</Button>
        </div>
      </form>
    </Form>
  );
}

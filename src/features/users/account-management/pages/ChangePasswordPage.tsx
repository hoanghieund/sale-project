// src/features/users/account-management/pages/ChangePasswordPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import { userService } from "../services/userService"; // Imports the user service for password change functionality

// Defines the validation schema for the password change form using Zod.
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Current password must be at least 6 characters.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "New password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  confirmNewPassword: z.string().min(8, {
    message: "Confirm new password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New password and confirm new password do not match.",
  path: ["confirmNewPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

/**
 * @component ChangePasswordPage
 * @description Page allowing users to change their password.
 * Uses react-hook-form and Zod for validation.
 */
const ChangePasswordPage: React.FC = () => {
 const {user} = useUser();
 const [isLoading, setIsLoading] = useState(false); // State to manage loading status during API calls
 const form = useForm<PasswordFormValues>({
   resolver: zodResolver(passwordFormSchema),
   defaultValues: {
     currentPassword: "",
     newPassword: "",
     confirmNewPassword: "",
   },
   mode: "onChange",
 });

 async function onSubmit(data: PasswordFormValues) {
   setIsLoading(true);
   try {
     await userService.changePassword(data.currentPassword, data.newPassword , user.id);
     toast({
       title: "Success!",
       description: "Your password has been successfully changed.",
       variant: "default",
     });
     form.reset(); // Resets the form fields after successful submission
   } catch (error) {
     console.error("Error changing password:", error);
     toast({
       title: "Error!",
       description: "An error occurred while changing your password. Please try again.",
       variant: "destructive",
     });
   } finally {
     setIsLoading(false);
   }
 }

 return (
   <Card className="w-full bg-white">
     <CardHeader>
       <CardTitle className="text-lg">Change Password</CardTitle>
      </CardHeader>
      <CardContent className="px-4"> {/* Adds padding */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Current Password Field */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm New Password Field */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordPage;
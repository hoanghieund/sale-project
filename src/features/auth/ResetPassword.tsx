import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
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
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

/**
 * @constant passwordResetSchema
 * @description Schema validation using Zod for password reset form.
 * - `newPassword`: Must be a string, minimum 6 characters.
 * - `confirmPassword`: Must be a string.
 * - Uses `.refine` to ensure `newPassword` and `confirmPassword` match.
 */
const passwordResetSchema = z
  .object({
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password does not match.",
    path: ["confirmPassword"],
  });

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

/**
 * @function ResetPassword
 * @description React component for the password reset page, using react-hook-form and Zod.
 * @returns {JSX.Element} JSX element displaying the password reset page.
 */
const ResetPassword = () => {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("email");

  // Initialize form with react-hook-form and zodResolver
  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  /**
   * @function onSubmit
   * @description Handles form submission after validation.
   * @param {PasswordResetFormValues} data - Form data.
   */
  const onSubmit = async (data: PasswordResetFormValues) => {
    try {
      // Call service to reset password
      await authService.resetPassword(data.newPassword, token);
      // Navigate user to login page upon success
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      // Can add toast notification to inform user of error here
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-muted">
      <CardHeader className="space-y-1">
        {/* Logo dẫn về trang chủ */}
        <Link to="/" aria-label="Go to homepage">
          {/* Tăng kích thước logo để dễ nhìn hơn */}
          <img src="/logo.png" alt="Eulotus logo" className="mx-auto h-14 w-auto mb-2" />
        </Link>
        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Please enter your new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {/* Can add link back to login page if needed */}
      </CardFooter>
    </div>
  );
};

export default ResetPassword;

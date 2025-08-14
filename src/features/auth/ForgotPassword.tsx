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
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

// Define validation schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

/**
 * @function ForgotPassword
 * @description React component for the Forgot Password page.
 * Uses Shadcn UI components and React Hook Form to create the user interface and manage forms.
 * @returns {JSX.Element} JSX element displaying the Forgot Password page.
 */
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * @function onSubmit
   * @description Handles the submission of the password recovery request form.
   * Sends the email to the API and manages loading states and errors.
   * @param {z.infer<typeof formSchema>} values - Validated form data.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      await authService.forgotPassword(formData);
      toast({
        title: "Success!",
        description:
          "Password recovery request has been sent. Please check your email.",
        variant: "default",
      });
      navigate("/reset-password");
    } catch (error) {
      console.error("Error sending password recovery request:", error);
      toast({
        title: "Error!",
        description: error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Back to login page{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default ForgotPassword;

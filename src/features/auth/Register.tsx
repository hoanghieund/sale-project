import AuthFormContainer from "@/components/auth/AuthFormContainer";
import InputWithIcon from "@/components/common/InputWithIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      agreeToTerms: false,
      newsletter: true,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (error) {
      // Error is handled by the context
    }
  };

  return (
    <AuthFormContainer
      title="Create Account"
      subtitle="Join DoneKick to start your sneaker journey"
      errorMessage={error}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
      socialLoginOptions="all"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputWithIcon
          id="username"
          icon={<User className="h-4 w-4" />}
          placeholder="Username"
          type="text"
          register={register}
          error={errors.username}
        />

        <InputWithIcon
          id="email"
          icon={<Mail className="h-4 w-4" />}
          placeholder="Enter your email"
          type="email"
          register={register}
          error={errors.email}
        />

        <InputWithIcon
          id="password"
          icon={<Lock className="h-4 w-4" />}
          placeholder="Create a password"
          type="password"
          register={register}
          error={errors.password}
          showToggle={true}
        />

        <InputWithIcon
          id="confirmPassword"
          icon={<Lock className="h-4 w-4" />}
          placeholder="Confirm your password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          showToggle={true}
        />

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              {...register("agreeToTerms", {
                required: "You must agree to the terms and conditions",
              })}
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">
              {errors.agreeToTerms.message}
            </p>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" {...register("newsletter")} />
            <Label htmlFor="newsletter" className="text-sm">
              Subscribe to our newsletter for exclusive deals and updates
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default Register;
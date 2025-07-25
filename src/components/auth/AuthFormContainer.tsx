import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  errorMessage?: string;
  socialLoginOptions?: 'google' | 'facebook' | 'all';
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

/**
 * @component AuthFormContainer
 * @param {AuthFormContainerProps} props - Props cho component AuthFormContainer.
 * @param {string} props.title - Tiêu đề của form xác thực.
 * @param {string} props.subtitle - Mô tả phụ của form xác thực.
 * @param {React.ReactNode} props.children - Các trường form cụ thể được truyền vào.
 * @param {string} [props.errorMessage] - Thông báo lỗi chung của form.
 * @param {'google' | 'facebook' | 'all'} [props.socialLoginOptions] - Tùy chọn đăng nhập mạng xã hội.
 * @param {string} props.footerText - Văn bản ở chân form.
 * @param {string} props.footerLinkText - Văn bản liên kết ở chân form.
 * @param {string} props.footerLinkHref - Liên kết ở chân form.
 * @returns {JSX.Element} Component AuthFormContainer.
 */
const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  subtitle,
  children,
  errorMessage,
  socialLoginOptions,
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        {children}
        {(socialLoginOptions === 'google' || socialLoginOptions === 'facebook' || socialLoginOptions === 'all') && (
          <>
            <Separator className="my-6" />
            <div className="grid gap-4">
              {(socialLoginOptions === 'google' || socialLoginOptions === 'all') && (
                <Button variant="outline" className="w-full">
                  {/* Assuming GoogleIcon is a component */}
                  {/* <GoogleIcon className="mr-2 h-4 w-4" /> */}
                  Đăng nhập bằng Google
                </Button>
              )}
              {(socialLoginOptions === 'facebook' || socialLoginOptions === 'all') && (
                <Button variant="outline" className="w-full">
                  {/* Assuming FacebookIcon is a component */}
                  {/* <FacebookIcon className="mr-2 h-4 w-4" /> */}
                  Đăng nhập bằng Facebook
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-center text-sm">
        {footerText}{' '}
        <Link to={footerLinkHref} className="text-blue-600 hover:underline ml-1">
          {footerLinkText}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthFormContainer;
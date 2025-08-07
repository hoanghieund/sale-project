import { Axios } from '@/api/Axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @component SellerRegistration
 * @description React component to display the seller registration page.
 * Includes title, policy list, submit button and policy links.
 */
const SellerRegistration: React.FC = () => {
  const {user} = useUser();
  const policies = [
    'General policies for selling and using the platform.',
    'Product standards and quality requirements for items being sold.',
    'Payment policies, fees, and commission calculation process.',
    'Partner support, including documentation, training, and communication channels.',
    'Rights and obligations of sellers when joining the platform.',
  ];
  const { toast } = useToast();

  // Function to handle the "Submit Registration Request" button click
  const handleClick = async () => {
    // Get userId from localStorage
    const userId = user?.id;

    // Check if userId exists
    if (!userId) {
      toast({
        title: 'Error',
        description: 'User ID not found. Please log in again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Call API
     const response =  await Axios.get(`/api/admin/approveOrCancelByUserId/${userId}`);
      toast({
        title: 'Success',
        description: 'Your registration request has been submitted successfully!',
      });
    } catch (error) {
      console.error('Error calling API:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while submitting your request. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto p-8 shadow-lg rounded-lg">
        <CardHeader className="text-center mb-8">
          {/* Seller registration page title */}
          <CardTitle className="text-3xl font-bold text-gray-900">Seller Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6 text-lg">
            Welcome to the seller registration page. Please read the policies below carefully before submitting your request.
          </p>

          <ul className="list-disc list-inside space-y-4 mb-8 text-gray-800">
            {/* Seller policy list */}
            {policies.map((policy, index) => (
              <li key={index} className="text-base">
                {policy}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center space-y-4">
            {/* Submit registration request button */}
            <Button size="lg" className="w-full max-w-xs" onClick={handleClick}>
              Submit Registration Request
            </Button>
            {/* Links to other policies */}
            <p className="text-sm text-gray-600">
              By submitting your request, you agree to our{' '}
              <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerRegistration;
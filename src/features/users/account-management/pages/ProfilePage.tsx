// src/features/users/account-management/pages/ProfilePage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "../components/ProfileForm";

/**
 * @component ProfilePage
 * @description Page to display and edit user personal information.
 * Uses Card component to group title and personal information form.
 * User profile data is loaded from the API.
 */
const ProfilePage: React.FC = () => {

  // Display form with loaded data or a message if no data.
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ProfileForm  />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;

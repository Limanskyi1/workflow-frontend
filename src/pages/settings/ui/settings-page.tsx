import { ChangePassword } from "@/features/change-password";

import { useProfileSettings } from "../hooks/use-profile-settings";
import { ProfileSettings } from "./profile-settings/profile-settings";

export const SettingsPage = () => {
  const { isLoading, userData, onSubmitProfileSettings } = useProfileSettings();
  return (
    <div className="max-w-[400px]">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <ProfileSettings
        key={isLoading ? "loading" : "loaded"}
        defaultData={userData || null}
        onSubmit={onSubmitProfileSettings}
      />
      <ChangePassword />
    </div>
  );
};

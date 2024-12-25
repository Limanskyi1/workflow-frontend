import { useProfileSettings } from "../hooks/use-profile-settings";
import { ProfileSettings } from "./profile-settings/profile-settings";
import { ChangePassword } from "./сhange-password/change-password";

export const SettingsPage = () => {
  const { isLoading, userData, onSubmitProfileSettings } = useProfileSettings();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {isLoading ? (
        <ProfileSettings key="loading" defaultData={null} onSubmit={() => {}} />
      ) : (
        <ProfileSettings
          key="loaded"
          defaultData={userData!}
          onSubmit={onSubmitProfileSettings}
        />
      )}
      <ChangePassword/>
    </main>
  );
};

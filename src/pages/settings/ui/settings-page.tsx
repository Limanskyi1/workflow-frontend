import { useUser } from "@/entities/user";
import { ChangePassword } from "@/features/user";
import { ProfileSettings } from "@/features/user";

export const SettingsPage = () => {
  const { isUserLoading, userData, update } = useUser();
  return (
    <div className="max-w-[400px]">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <ProfileSettings
        key={isUserLoading ? "loading" : "loaded"}
        defaultData={userData || null}
        onSubmit={update}
      />
      <ChangePassword />
    </div>
  );
};

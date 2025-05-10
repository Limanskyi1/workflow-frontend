import {
  UpdateUser,
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/entities/user";
import { ChangePassword } from "@/features/user";
import { ProfileSettings } from "@/features/user";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

export const SettingsPage = () => {
  const { toast } = useToast();
  const { data: userData, isLoading } = useGetMeQuery();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (updatedUserData: UpdateUser) => {
    try {
      await updateUser({
        ...updatedUserData,
        id: userData?.id as number,
      });
      toast(TOAST_CONFIG.updateUserSuccess);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div className="max-w-[400px]">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <ProfileSettings
        key={isLoading ? "loading" : "loaded"}
        defaultData={userData || null}
        onSubmit={onSubmit}
      />
      <ChangePassword />
    </div>
  );
};

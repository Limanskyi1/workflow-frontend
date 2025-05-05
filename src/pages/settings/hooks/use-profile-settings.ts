import { useGetMeQuery, useUpdateUserMutation } from "@/entities/user";
import { UpdateUser } from "@/entities/user";
import { TOAST_CONFIG } from "@/shared/lib/toast";
import { useToast } from "@/shared/lib/toast";

export const useProfileSettings = () => {
  const { toast } = useToast();
  const { data: userData, isLoading } = useGetMeQuery();
  const [updateUser] = useUpdateUserMutation();

  const onSubmitProfileSettings = async (profileFormData: UpdateUser) => {
    try {
      const updatedUser = {
        ...userData,
        ...profileFormData,
      };
      await updateUser(updatedUser);
      toast(TOAST_CONFIG.updateUserSuccess);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return {
    isLoading,
    userData,
    onSubmitProfileSettings,
  };
};

import { TOAST_CONFIG } from "@/features/toast";
import { useToast } from "@/features/toast";
import { useGetMeQuery, useUpdateUserMutation } from "@/entities/user";
import { UpdateUserDto } from "@/entities/user";

export const useProfileSettings = () => {
  const { toast } = useToast();
  const { data: userData, isLoading } = useGetMeQuery();
  const [updateUser] = useUpdateUserMutation();

  const onSubmitProfileSettings = async (profileFormData: UpdateUserDto) => {
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

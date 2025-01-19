import { TOAST_CONFIG } from "@/features/toast/consts/toast-config";
import { useToast } from "@/features/toast/hooks/use-toast";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/modules/user/api/user-api";
import { UpdateUserDto } from "@/modules/user/model/types/update-user.dto";

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

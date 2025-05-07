import { useForm } from "react-hook-form";

import { UpdateUser } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input/input";

interface ProfileSettingsProps {
  defaultData: UpdateUser | null;
  onSubmit: (data: UpdateUser) => void;
}

export const ProfileSettings = ({
  defaultData,
  onSubmit,
}: ProfileSettingsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UpdateUser>({ defaultValues: { name: defaultData?.name } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              label="Name"
              error={formErrors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};

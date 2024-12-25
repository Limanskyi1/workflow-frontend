import { Label } from "@radix-ui/react-label";

import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { FormField } from "@/shared/ui/form-field";
import { UpdateUserDto } from "@/modules/user/model/types/update-user.dto";

interface ProfileSettingsProps {
  defaultData: UpdateUserDto | null;
  onSubmit: (data: UpdateUserDto) => void;
}

export const ProfileSettings = ({ defaultData , onSubmit }: ProfileSettingsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UpdateUserDto>({ defaultValues: { name: defaultData?.name } });

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
            <Label htmlFor="name">Name</Label>
            <FormField
              id="name"
              type="text"
              error={formErrors.name?.message}
              register={register("name", {
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

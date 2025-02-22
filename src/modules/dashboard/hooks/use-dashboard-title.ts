import { useState } from "react";
import { useForm } from "react-hook-form";

import { TOAST_CONFIG, useToast } from "@/features/toast";

import { useUpdateDashboardMutation } from "../api/dashboard-api";
import { UpdateDashboard } from "../model/types/update-dashboard";

export const useDashboardTitle = (id: number, title: string) => {
  const { toast } = useToast();
  const [updateDashboard] = useUpdateDashboardMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title,
    },
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onHover = () => setIsHovered(true);
  const onLeave = () => setIsHovered(false);

  const setEditMode = (isEditable: boolean) => setIsEditing(isEditable);

  const onSubmit = handleSubmit(async (data) => {
    const { title } = data;
    const response: UpdateDashboard = {
      title,
      id,
    };
    try {
      const { data } = await updateDashboard(response);
      setEditMode(false);
      reset({
        title: data?.title,
      });
      toast(TOAST_CONFIG.dashboardTitleUpdateSuccess);
    } catch (error) {
      console.error(error);
      toast(TOAST_CONFIG.dashboardTitleUpdateWithError);
    }
  });

  return {
    register,
    reset,
    isHovered,
    isEditing,
    setEditMode,
    onHover,
    onLeave,
    onSubmit,
  };
};

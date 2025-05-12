import { Activity } from "lucide-react";

import { useTasksActivities } from "@/entities/task";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

import { TaskActivityItem } from "./task-activity-item";

export const TaskActivityPanel = () => {
  const { activities } = useTasksActivities();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Activity />
          <span>Activity</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Activity History</SheetTitle>
          <SheetDescription>
            Here you can see your activity history.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {activities.map((activity) => (
            <TaskActivityItem
              key={activity.id}
              type={activity.type}
              message={activity.message}
              createdAt={activity.createdAt}
            />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close activities</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

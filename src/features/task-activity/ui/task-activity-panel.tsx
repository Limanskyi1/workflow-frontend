import { Activity, Trash2 } from "lucide-react";

import { useTasksActivities } from "@/entities/task";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

import { TaskActivityListAnimated } from "../lib/task-activity-list-animated";
import { TaskActivityItem } from "./task-activity-item";

export const TaskActivityPanel = () => {
  const { activities, deleteActivity, deleteAllActivities } =
    useTasksActivities();

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
          <SheetDescription className="mb-2">
            Here you can see your activity history.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 max-h-[70%] overflow-auto">
          <TaskActivityListAnimated
            activities={activities}
            renderActivity={(activity) => (
              <TaskActivityItem
                key={activity.id}
                id={activity.id}
                type={activity.type}
                message={activity.message}
                createdAt={activity.createdAt}
                onDelete={deleteActivity}
              />
            )}
          />
        </div>
        <SheetFooter>
          {activities.length > 0 && (
            <Button
              onClick={deleteAllActivities}
              className="w-fit ml-auto"
              variant="destructive"
            >
              <Trash2 />
              <span>Clear</span>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

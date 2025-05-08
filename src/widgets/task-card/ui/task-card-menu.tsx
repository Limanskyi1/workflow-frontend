import { MoreVertical } from "lucide-react";
import { MouseEvent } from "react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface TaskCardMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickDelete: () => void;
  hideAll: () => void;
}

export const TaskCardMenu = ({
  isOpen,
  setIsOpen,
  onClickDelete,
}: TaskCardMenuProps) => {
  const handleClickTrigger = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onClickDelete();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} modal={false}>
      <DropdownMenuTrigger asChild className="p-1" onClick={handleClickTrigger}>
        <Button className="p-1 w-6 h-6" variant="outline" size="sm">
          <MoreVertical className="h-4 w-4 transform rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleClickDelete}>
          Delete the task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

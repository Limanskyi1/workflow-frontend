import { MoreVertical } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MouseEvent } from "react";

interface TaskActionsMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickDelete: () => void;
  onClickLink: () => void;
  hideAll: () => void;
}

export const TaskActionsMenu = ({
  isOpen,
  setIsOpen,
  onClickDelete,
  onClickLink,
  hideAll,
}: TaskActionsMenuProps) => {
  const handleClickTrigger = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onClickDelete();
    setIsOpen(false);
  };

  const handleClickLink = (e: MouseEvent) => {
    e.stopPropagation();
    onClickLink();
    setIsOpen(false);
    hideAll();
  };

  return (
    <DropdownMenu open={isOpen} modal={false}>
      <DropdownMenuTrigger asChild className="p-1" onClick={handleClickTrigger}>
        <Button className="p-1 w-6 h-6" variant="outline" size="sm">
          <MoreVertical className="h-4 w-4 transform rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleClickLink}>
          Link the task
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClickDelete}>
          Delete the task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { MoreVertical } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface TaskActionsMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickDelete: () => void;
  onClickLink: () => void;
}

export const TaskActionsMenu = ({
  isOpen,
  setIsOpen,
  onClickDelete,
  onClickLink,
}: TaskActionsMenuProps) => {
  const handleClickTrigger = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };


  const handleClickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClickDelete();
    setIsOpen(false);
  }

  const handleClickLink = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClickLink();
    setIsOpen(false);
  }



  return (
    <DropdownMenu open={isOpen} modal={false}>
      <DropdownMenuTrigger asChild className="p-1" onClick={handleClickTrigger}>
        <Button className="p-1 w-6 h-6" variant="outline" size="sm">
          <MoreVertical className="h-4 w-4 transform rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleClickLink}>Link the task</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClickDelete}>Delete the task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

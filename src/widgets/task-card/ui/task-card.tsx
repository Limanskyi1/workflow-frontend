import { MouseEvent, useRef } from "react";

import { TaskPriority, TaskStatus } from "@/entities/task";
import { TaskCardDraggable } from "@/features/task-drag";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";

import { useModals } from "../../../app/providers/modal";
import { priorityColors } from "../consts/priority-colors";
import { TaskCardDateBadge } from "./task-card-date-badge";
import { TaskCardMenu } from "./task-card-menu";
import { TaskCardTrashBadge } from "./task-card-trash-badge";

interface TaskCardProps {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
}

export const TaskCard = ({
  title,
  priority,
  id,
  status,
  dueDate,
}: TaskCardProps) => {
  const { openDeleteTaskModal, openEditTaskModal } = useModals();

  const cardRef = useRef<HTMLDivElement>(null);

  const {
    isVisible: isButtonsVisible,
    show: showButtons,
    hide: hideButtons,
    toggle: toggleButtons,
  } = useVisibility();

  const {
    isVisible: isActionsVisible,
    hide: hideActions,
    toggle: toggleActions,
  } = useVisibility();

  const hideAll = () => {
    hideButtons();
    hideActions();
  };

  const onMouseEnter = (event: MouseEvent) => {
    if (cardRef.current === event.target) {
      showButtons();
    }
  };

  const onMouseLeave = () => {
    hideAll();
  };

  return (
    <TaskCardDraggable id={id} status={status}>
      <Card
        className="p-3 cursor-pointer flex flex-col hover:bg-accent/40 transition ease-in-out"
        ref={cardRef}
        onMouseEnter={(e) => onMouseEnter(e)}
        onMouseLeave={onMouseLeave}
        onClick={() => {
          openEditTaskModal(id);
          hideAll();
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-sm font-extrabold">{title}</CardTitle>
          <div
            className={`flex gap-2 ${isButtonsVisible ? "opacity-100" : "opacity-0"}`}
          >
            <TaskCardMenu
              isOpen={isActionsVisible}
              setIsOpen={toggleActions}
              onClickDelete={() => openDeleteTaskModal(id)}
              hideAll={hideAll}
            />
            <TaskCardTrashBadge
              setIsTrashVisible={toggleButtons}
              onClick={() => openDeleteTaskModal(id)}
            />
          </div>
        </div>
        {dueDate && <TaskCardDateBadge taskDueDate={dueDate} />}
        <Badge
          variant="secondary"
          className={`${priorityColors[priority]} w-fit`}
        >
          {priority.toLowerCase()}
        </Badge>
      </Card>
    </TaskCardDraggable>
  );
};

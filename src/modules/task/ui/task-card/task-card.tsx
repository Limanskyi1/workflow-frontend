import { MouseEvent, useRef } from "react";

import { useModals } from "@/features/modals";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../../consts/priority-colors";
import { TaskPriority } from "../../model/types";
import { convertPriorityToText } from "../../utils/convert-priority-to-text";
import { TaskActionsMenu } from "../task-actions-menu";
import { TaskDateBadge } from "../task-date-badge/task-date-badge";
import { TaskTrashBadge } from "../task-trash-badge/task-trash-badge";

interface TaskCardProps {
  id: number;
  title: string;
  priority: TaskPriority;
  taskRelationId: number | null;
  dueDate?: Date;
}

export const TaskCard = ({
  title,
  priority,
  id,
  taskRelationId,
  dueDate,
}: TaskCardProps) => {
  const {
    handleOpenDeleteTaskModal,
    handleOpenEditTaskModal,
    handleOpenLinkingTaskModal,
  } = useModals();

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
    <Card
      className="p-3 cursor-pointer flex flex-col hover:bg-accent/40 transition ease-in-out"
      ref={cardRef}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        handleOpenEditTaskModal(id);
        hideAll();
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <CardTitle className="text-sm font-extrabold">{title}</CardTitle>
        <div
          className={`flex gap-2 ${isButtonsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <TaskActionsMenu
            isOpen={isActionsVisible}
            setIsOpen={toggleActions}
            onClickDelete={() => handleOpenDeleteTaskModal(id)}
            onClickLink={() => handleOpenLinkingTaskModal(id)}
            hideAll={hideAll}
            taskRelationId={taskRelationId}
          />
          <TaskTrashBadge
            setIsTrashVisible={toggleButtons}
            onClick={() => handleOpenDeleteTaskModal(id)}
          />
        </div>
      </div>
      {dueDate && <TaskDateBadge taskDueDate={dueDate} />}
      <Badge
        variant="secondary"
        className={`${priorityColors[priority]} w-fit`}
      >
        {convertPriorityToText(priority)}
      </Badge>
    </Card>
  );
};

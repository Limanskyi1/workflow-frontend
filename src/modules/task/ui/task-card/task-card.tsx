import { useModal } from "@/shared/hooks/use-modal";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../../consts/priority-colors";
import { TaskPriority } from "../../model/types";
import { convertPriorityToText } from "../../utils/convert-priority-to-text";
import { TaskModals } from "../modals";
import { TaskActionsMenu } from "../task-actions-menu";
import { TaskDateBadge } from "../task-date-badge/task-date-badge";
import { TaskTrashBadge } from "../task-trash-badge/task-trash-badge";

interface TaskCardProps {
  id: number;
  title: string;
  priority: TaskPriority;
  dueDate?: Date;
}

export const TaskCard = ({ title, priority, id, dueDate }: TaskCardProps) => {
  const modalsControls = {
    delete: useModal(),
    edit: useModal(),
    linking: useModal(),
  };

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

  return (
    <Card
      className="p-3 cursor-pointer flex flex-col hover:bg-accent/40 transition ease-in-out"
      onMouseEnter={showButtons}
      onMouseLeave={hideAll}
      onClick={(event) => {
        modalsControls.edit.open(event);
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
            onClickDelete={modalsControls.delete.open}
            onClickLink={modalsControls.linking.open}
            hideAll={hideAll}
          />
          <TaskTrashBadge
            setIsTrashVisible={toggleButtons}
            onClick={modalsControls.delete.open}
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
      <TaskModals
        id={id}
        isDeleteModalOpen={modalsControls.delete.isOpen}
        isEditModalOpen={modalsControls.edit.isOpen}
        isLinkingModalOpen={modalsControls.linking.isOpen}
        handleCloseDeleteModal={modalsControls.delete.close}
        handleCloseEditModal={modalsControls.edit.close}
        handleCloseLinkingModal={modalsControls.linking.close}
      />
    </Card>
  );
};

import { Trash2 } from "lucide-react";

export const TaskCardTrashBadge = ({
  onClick,
  setIsTrashVisible,
}: {
  onClick: () => void;
  setIsTrashVisible: (value: boolean) => void;
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTrashVisible(false);
    onClick();
  };

  return (
    <div
      className={`border border-primary/10 p-1 rounded-md cursor-pointer transition ease-in-out hover:scale-125 flex-shrink-0 h-fit`}
      onClick={(event) => handleClick(event)}
    >
      <Trash2 className="h-4 w-4" stroke="red" />
    </div>
  );
};

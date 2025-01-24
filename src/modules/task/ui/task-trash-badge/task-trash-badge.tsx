import { Trash2 } from "lucide-react";

export const TaskTrashBadge = ({
  isTrashVisible,
  onClick,
  setIsTrashVisible,
}: {
  isTrashVisible: boolean;
  onClick: () => void;
  setIsTrashVisible: (value: boolean) => void;
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTrashVisible(!isTrashVisible);
    onClick();
  };
  return (
    <div
      className={`border border-primary/10 p-1 rounded-md cursor-pointer transition ease-in-out hover:scale-125 
            ${isTrashVisible ? "opacity-100" : "opacity-0"}
        `}
      onClick={(event) => handleClick(event)}
    >
      <Trash2 stroke="red" width={16} height={16} />
    </div>
  );
};

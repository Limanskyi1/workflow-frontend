import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/shared/ui/button";

import "./task-description-editor.scss";


export function TaskDescriptionEditor({value,onChange}: {value: string, onChange: (value: string) => void}) {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [initialValue, setInitialValue] = useState("");

  const handleOpen = () => {
    if (!isToolbarVisible) {
      setInitialValue(value); 
    }
    setIsToolbarVisible(true);
  };

  const handleSave = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsToolbarVisible(false);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(initialValue);
    setIsToolbarVisible(false);
  };


  return (
    <div onClick={handleOpen} className={`${isToolbarVisible ? "activeQuill" : ""}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Edit here..."
      />
      {isToolbarVisible && (
        <div className="flex justify-end gap-2 mt-2">
          <Button
            size="sm"
            onClick={(event) => handleSave(event)}
            type="button"
            variant="secondary"
          >
            Save
          </Button>
          <Button
            size="sm"
            onClick={(event) => handleCancel(event)}
            type="button"
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

import ReactQuill, { ReactQuillProps } from "react-quill";

import { cn } from "@/shared/utils/cn";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],
];

const modules = {
  toolbar: toolbarOptions,
};

export const NoteEditor = (props: ReactQuillProps) => {
  const { className, ...rest } = props;
  return (
    <ReactQuill
      {...rest}
      className={cn(
        "activeQuill flex-1 [&>.ql-container]:h-full [&>.ql-container]:border-0",
        className,
      )}
      modules={modules}
    />
  );
};

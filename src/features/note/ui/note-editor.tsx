import ReactQuill from "react-quill";

interface NoteEditorProps {
  value: string;
  setValue: (value: string) => void;
}

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

export const NoteEditor = (props: NoteEditorProps) => {
  const { value, setValue } = props;
  return (
    <ReactQuill
      className="activeQuill flex-1"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  );
};

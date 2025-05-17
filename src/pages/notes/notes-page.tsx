import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { Note, NoteEditor } from "@/features/note";

const notes = [
  {
    id: 1,
    content: "Content 1",
    time: "17.13",
  },
  {
    id: 2,
    content: "Content 2",
    time: "17.13",
  },
  {
    id: 3,
    content: "Content 3",
    time: "17.13",
  },
];

export const NotesPage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="grid grid-cols-[250px_1fr] gap-6 h-full">
      <div className="flex flex-col gap-2">
        <div className="">panel</div>
        {notes.map((note) => (
          <Note
            key={note.id}
            title={note.content}
            subtitle={note.content}
            time={note.time}
          />
        ))}
      </div>
      <NoteEditor value={value} setValue={setValue} />
    </div>
  );
};

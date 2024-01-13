import { useState } from "react";
import TextField from "../TextField";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function TaskLayout({
  columnId,
  callback,
}: {
  columnId: number;
  callback: (title: string, columnId: number) => void;
}) {
  const [title, setTitle] = useState("");
  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    callback(title, columnId);
  }
  return (
    <form onSubmit={onCreate} className="flex flex-col gap-4">
      <TextField
        autofocus
        title="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PrimaryButton text="Create" onClick={onCreate} />
    </form>
  );
}

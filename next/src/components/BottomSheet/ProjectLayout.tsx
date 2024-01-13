import { useState } from "react";
import TextField from "../TextField";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function ProjectLayout({
  callback,
}: {
  callback: (title: string) => void;
}) {
  const [title, setTitle] = useState("");
  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    callback(title);
    setTitle("");
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

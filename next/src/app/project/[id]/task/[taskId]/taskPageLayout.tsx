import SelectField from "@/components/SelectField";
import { SelectOption } from "@/types/components";
import TextField from "@/components/TextField";
import { Task } from "@/types/project";
import { useState } from "react";
import { TaskUpdateRequestDto } from "@/types/dtos";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function TaskPageLayout({
  task,
  taskColumnId,
  columnOptions,
  onSave,
}: {
  task: Task;
  taskColumnId: number;
  columnOptions: SelectOption[];
  onSave: (task: TaskUpdateRequestDto) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [columnId, setColumnId] = useState(taskColumnId);

  function save() {
    onSave({
      ...task,
      title,
      columnId,
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <TextField
        title="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <SelectField
        title="Task column"
        value={columnId}
        options={columnOptions}
        onChange={(e) => setColumnId(Number(e.target.value))}
      />
      <PrimaryButton text="Save" onClick={save} />
    </div>
  );
}

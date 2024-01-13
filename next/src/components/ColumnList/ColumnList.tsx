import { Column } from "@/types/project";
import { MouseEventHandler } from "react";
import NewColumnItem from "./NewColumnItem";
import ColumnItem from "./ColumnItem";

export default function ColumnList({
  list,
  onNewColumn,
  onNewTask,
  onDeleteColumn,
  onSwap,
  getTaskEditRoute,
  onTaskDelete,
  onTaskSwap,
  onUpdateColumnTitle,
}: {
  list: Column[];
  onNewColumn: MouseEventHandler<HTMLButtonElement>;
  onNewTask: (columnId: number) => void;
  onDeleteColumn: (columnId: number) => void;
  onSwap: (columnId: number, direction: "left" | "right") => void;
  getTaskEditRoute: (taskId: number) => string;
  onTaskDelete: (taskId: number) => void;
  onTaskSwap: (taskId: number, direction: "up" | "down") => void;
  onUpdateColumnTitle: (columnId: number, title: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {list.map((c) => (
        <ColumnItem
          key={c.id}
          column={c}
          onNewTask={onNewTask}
          onDelete={onDeleteColumn}
          onSwap={onSwap}
          getTaskEditRoute={getTaskEditRoute}
          onTaskDelete={onTaskDelete}
          onTaskSwap={onTaskSwap}
          onUpdateTitle={onUpdateColumnTitle}
        />
      ))}
      <NewColumnItem onClick={onNewColumn} />
    </div>
  );
}

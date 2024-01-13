import { Column } from "@/types/project";
import ColumnWrapper from "./ColumnWrapper";
import ColumnHeader from "./ColumnHeader";
import TaskItem from "../TaskItem/TaskItem";
import { sortByOrd } from "@/utils/project";

export default function ColumnItem({
  column,
  getTaskEditRoute,
  onNewTask,
  onDelete,
  onSwap,
  onTaskDelete,
  onTaskSwap,
  onUpdateTitle,
}: {
  column: Column;
  getTaskEditRoute: (taskId: number) => string;
  onNewTask: (columnId: number) => void;
  onDelete: (columnId: number) => void;
  onSwap: (columnId: number, direction: "left" | "right") => void;
  onTaskDelete: (taskId: number) => void;
  onTaskSwap: (taskId: number, direction: "up" | "down") => void;
  onUpdateTitle: (columnId: number, title: string) => void;
}) {
  return (
    <ColumnWrapper>
      <ColumnHeader
        title={column.title}
        onNewTask={() => onNewTask(column.id)}
        onDelete={() => onDelete(column.id)}
        onSwapLeft={() => onSwap(column.id, "left")}
        onSwapRight={() => onSwap(column.id, "right")}
        onUpdateTitle={(title) => onUpdateTitle(column.id, title)}
      />
      <div className="flex flex-col gap-2 p-2">
        {[...column.tasks].sort(sortByOrd).map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            editLink={getTaskEditRoute(t.id)}
            onDelete={() => onTaskDelete(t.id)}
            onSwapUp={() => onTaskSwap(t.id, "up")}
            onSwapDown={() => onTaskSwap(t.id, "down")}
          />
        ))}
      </div>
    </ColumnWrapper>
  );
}

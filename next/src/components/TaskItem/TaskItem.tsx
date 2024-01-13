import { Task } from "@/types/project";
import TaskHeader from "./TaskHeader";

export default function TaskItem({
  task,
  editLink,
  onDelete,
  onSwapUp,
  onSwapDown,
}: {
  task: Task;
  editLink: string;
  onDelete: () => void;
  onSwapUp: () => void;
  onSwapDown: () => void;
}) {
  return (
    <div className="overflow-clip rounded">
      <TaskHeader
        title={task.title}
        editLink={editLink}
        onDelete={onDelete}
        onSwapUp={onSwapUp}
        onSwapDown={onSwapDown}
      />
    </div>
  );
}

"use client";

import { SelectOption } from "@/types/components";
import Spinner from "@/components/Spinner";
import {
  useLocalProject,
  useLocalProjectDispatch,
} from "@/contexts/LocalProject/localProjectContext";
import { sortByOrd } from "@/utils/project";
import TaskPageLayout from "./taskPageLayout";
import { TaskUpdateRequestDto } from "@/types/dtos";

export function LocalTaskPage({ taskId }: { taskId: number }) {
  const project = useLocalProject();
  const projectDispatch = useLocalProjectDispatch();

  const task = project?.tasks.find((t) => t.id === taskId);
  const columnOptions: SelectOption[] = [...(project?.columns ?? [])]
    .sort(sortByOrd)
    .map((c) => ({
      key: c.id,
      text: c.title,
      value: c.id.toString(),
    }));

  if (!project || !task) return <Spinner />;

  function onSave(data: TaskUpdateRequestDto) {
    if (!task) return;
    projectDispatch({
      type: "update-task",
      taskId: taskId,
      updated: {
        ...task,
        ...data,
      },
    });
    projectDispatch({ type: "save" });
  }

  return (
    <TaskPageLayout
      task={task}
      taskColumnId={task.columnId}
      columnOptions={columnOptions}
      onSave={onSave}
    />
  );
}

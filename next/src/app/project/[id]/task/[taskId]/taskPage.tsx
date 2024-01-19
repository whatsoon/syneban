"use client";

import Spinner from "@/components/Spinner";
import { useProjectDetails } from "@/swr/useProjectDetails";
import { useUser } from "@/swr/useUser";
import { getColumnOptions, getProjectRoute, getTaskAndColumnId } from "@/utils/project";
import { notFound, useRouter } from "next/navigation";
import TaskPageLayout from "./taskPageLayout";
import {
  executeWithLoading,
  useAppDispatchContext,
} from "@/contexts/App/appContext";
import { fetchUpdateTask } from "@/utils/projectRequests";
import { TaskUpdateRequestDto } from "@/types/dtos";

export function TaskPage({
  projectId,
  taskId,
}: {
  projectId: number;
  taskId: number;
}) {
  const router = useRouter();
  const { isError: isUserError, isLoading: isUserLoading } = useUser();
  const { project, isError, isLoading, mutate } = useProjectDetails(
    !isUserError && !isUserLoading,
    projectId,
  );
  const appDispatch = useAppDispatchContext();

  if (isError || isUserError) notFound();
  if (isLoading || isUserLoading) return <Spinner />;
  if (!project) return notFound();

  const data = getTaskAndColumnId(project, taskId);
  const options = getColumnOptions(project);

  if (!data) notFound();

  function onSave(data: TaskUpdateRequestDto) {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchUpdateTask(taskId, data);
      if (res.ok) {
        mutate();
        router.replace(getProjectRoute(projectId));
      }
    });
  }

  return (
    <TaskPageLayout
      task={data.task}
      taskColumnId={data.columnId}
      columnOptions={options}
      onSave={onSave}
    />
  );
}

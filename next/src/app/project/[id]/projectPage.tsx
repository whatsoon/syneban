"use client";

import { executeWithLoading, useAppDispatchContext } from "@/contexts/App/appContext";
import ProjectPageLayout from "./projectPageLayout";
import { useProjectDetails } from "@/swr/useProjectDetails";
import { useUser } from "@/swr/useUser";
import {
  fetchCreateColumn,
  fetchCreateTask,
  fetchDeleteColumn,
  fetchDeleteTask,
  fetchSwapColumn,
  fetchSwapTask,
  fetchUpdateColumn,
} from "@/utils/projectRequests";

export default function ProjectPage({ id }: { id: number }) {
  const { isError, isLoading } = useUser();
  const { project, mutate } = useProjectDetails(!isError && !isLoading, id);
  const appDispatch = useAppDispatchContext();

  const createColumn = async (title: string) => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchCreateColumn({ boardId: id, title });
      if (res.ok) {
        await mutate();
      }
    });
  };

  const updateColumnTitle = async (columnId: number, title: string) => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchUpdateColumn(columnId, { title });
      if (res.ok) {
        await mutate();
      }
    });
  };

  const deleteColumn = async (columnId: number) => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchDeleteColumn(columnId);
      if (res.ok) {
        await mutate();
      }
    });
  };

  const createTask = async (title: string, columnId: number) => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchCreateTask({ title, columnId });
      if (res.ok) {
        await mutate();
      }
    });
  };

  const swapColumn = (columnId: number, direction: "left" | "right") => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchSwapColumn(columnId, { direction });
      if (res.ok) {
        await mutate();
      }
    });
  };

  const deleteTask = async (taskId: number) => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchDeleteTask(taskId);
      if (res.ok) {
        await mutate();
      }
    });
  };

  const swapTask = (taskId: number, direction: "up" | "down") => {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchSwapTask(taskId, { direction });
      if (res.ok) {
        await mutate();
      }
    });
  };

  return (
    <ProjectPageLayout
      project={project}
      {...{
        createColumn,
        updateColumnTitle,
        swapColumn,
        deleteColumn,
        createTask,
        deleteTask,
        swapTask,
      }}
    />
  );
}

"use client";

import {
  useLocalProject,
  useLocalProjectDispatch,
} from "@/contexts/LocalProject/localProjectContext";
import ProjectPageLayout from "./projectPageLayout";
import { useMemo } from "react";
import { LocalProjectToProject } from "@/utils/projectMappers";

export default function LocalProjectPage() {
  const localProject = useLocalProject();
  const projectDispatch = useLocalProjectDispatch();
  const project = useMemo(() => {
    return LocalProjectToProject(localProject);
  }, [localProject]);

  const createColumn = (title: string) => {
    projectDispatch({ type: "new-column", title });
    projectDispatch({ type: "save" });
  };

  const updateColumnTitle = (columnId: number, title: string) => {
    const column = localProject?.columns.find((c) => c.id === columnId);
    if (!column) return;
    projectDispatch({
      type: "update-column",
      columnId,
      updated: { ...column, title },
    });
    projectDispatch({ type: "save" });
  };

  const deleteColumn = (columnId: number) => {
    projectDispatch({ type: "delete-column", columnId });
    projectDispatch({ type: "save" });
  };

  const createTask = (title: string, columnId: number) => {
    projectDispatch({ type: "new-task", columnId, title });
    projectDispatch({ type: "save" });
  };

  const swapColumn = (columnId: number, direction: "left" | "right") => {
    switch (direction) {
      case "left": {
        projectDispatch({ type: "swap-column-left", columnId });
        break;
      }
      case "right": {
        projectDispatch({ type: "swap-column-right", columnId });
        break;
      }
    }
    projectDispatch({ type: "save" });
  };

  const deleteTask = (taskId: number) => {
    projectDispatch({ type: "delete-task", taskId });
    projectDispatch({ type: "save" });
  };

  const swapTask = (taskId: number, direction: "up" | "down") => {
    switch (direction) {
      case "up": {
        projectDispatch({ type: "swap-task-up", taskId });
        break;
      }
      case "down": {
        projectDispatch({ type: "swap-task-down", taskId });
        break;
      }
    }
    projectDispatch({ type: "save" });
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

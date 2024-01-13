"use client";

import { LocalProject } from "@/types/project";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  createColumn,
  createTask,
  deleteColumn,
  deleteTask,
  loadLocalProject,
  saveLocalProject,
  swapColumn,
  swapTask,
  updateColumn,
  updateTask,
} from "./localProjectActionHandlers";
import { usePathname } from "next/navigation";
import { LocalProjectActionType } from "@/types/localProjectActionTypes";

/** The context of the local project */
const LocalProjectContext = createContext<LocalProject | undefined>(undefined);
/** The context for dispatching actions */
const LocalProjectDispatchContext = createContext<
  Dispatch<LocalProjectActionType>
>(() => {});

/** A hook for accessing the local project */
export const useLocalProject = () => useContext(LocalProjectContext);
/** A hook for dispatching actions */
export const useLocalProjectDispatch = () =>
  useContext(LocalProjectDispatchContext);

/** The provider for the local project */
export function LocalProjectProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [project, dispatch] = useReducer(localProjectReducer, undefined);
  const path = usePathname();

  useEffect(() => {
    dispatch({ type: "load" });
  }, [path]);

  return (
    <LocalProjectContext.Provider value={project}>
      <LocalProjectDispatchContext.Provider value={dispatch}>
        {children}
      </LocalProjectDispatchContext.Provider>
    </LocalProjectContext.Provider>
  );
}

/** The reducer for the local project */
function localProjectReducer(
  project: LocalProject | undefined,
  action: LocalProjectActionType,
): LocalProject | undefined {
  if (action.type === "load") return loadLocalProject();
  if (project === undefined) return;
  switch (action.type) {
    case "save":
      return saveLocalProject(project);
    case "new-column":
      return createColumn(project, action.title);
    case "swap-column-left":
      return swapColumn(project, action.columnId, "left");
    case "swap-column-right":
      return swapColumn(project, action.columnId, "right");
    case "update-column":
      return updateColumn(project, action.columnId, action.updated);
    case "delete-column":
      return deleteColumn(project, action.columnId);
    case "new-task":
      return createTask(project, action.columnId, action.title);
    case "delete-task":
      return deleteTask(project, action.taskId);
    case "swap-task-up":
      return swapTask(project, action.taskId, "up");
    case "swap-task-down":
      return swapTask(project, action.taskId, "down");
    case "update-task":
      return updateTask(project, action.taskId, action.updated);
  }
}


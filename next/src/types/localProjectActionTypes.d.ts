interface LoadAction {
  type: "load";
}

interface SaveAction {
  type: "save";
}

interface NewColumnAction {
  type: "new-column";
  title: string;
}

interface DeleteColumnAction {
  type: "delete-column";
  columnId: number;
}
interface SwapColumnAction {
  type: "swap-column-left" | "swap-column-right";
  columnId: number;
}

interface UpdateColumnAction {
  type: "update-column";
  columnId: number;
  updated: LocalColumn;
}

interface NewTaskAction {
  type: "new-task";
  columnId: number;
  title: string;
}

interface DeleteTaskAction {
  type: "delete-task";
  taskId: number;
}

interface SwapTaskAction {
  type: "swap-task-up" | "swap-task-down";
  taskId: number;
}

interface UpdateTaskAction {
  type: "update-task";
  taskId: number;
  updated: LocalTask;
}

export type LocalProjectActionType =
  | LoadAction
  | SaveAction
  | NewColumnAction
  | DeleteColumnAction
  | SwapColumnAction
  | UpdateColumnAction
  | NewTaskAction
  | DeleteTaskAction
  | SwapTaskAction
  | UpdateTaskAction;

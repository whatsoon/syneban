import { LocalColumn, LocalProject, LocalTask } from "@/types/project";
import { sortByOrd } from "@/utils/project";

const LOCAL_PROJECT_KEY = "LOCAL_PROJECT";

/**
 * Creates a new local project
 * @returns {LocalProject} the new local project
 */
function newLocalProject(): LocalProject {
  const now = new Date();
  return {
    id: -1,
    title: "Local",
    createdAt: now,
    updatedAt: now,
    columns: [],
    tasks: [],
  };
}

/**
 * Creates a new column
 * @param title Column title
 * @param ord Column order
 * @returns {LocalColumn} the new column
 */
function newColumn(title: string, ord: number): LocalColumn {
  const now = new Date();
  return {
    id: Date.now(),
    title: title,
    ord: ord,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Creates a new task
 * @param title Task title
 * @param ord Task order
 * @param columnId Task column
 * @returns {LocalTask} the new task
 */
function newTask(title: string, ord: number, columnId: number): LocalTask {
  const now = new Date();
  return {
    id: Date.now(),
    title: title,
    ord: ord,
    columnId: columnId,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Loads the local project from local storage or creates a new one if it doesn't exist
 * @returns {LocalProject} the local project from local storage or a new one
 */
export function loadLocalProject(): LocalProject {
  const str = localStorage.getItem(LOCAL_PROJECT_KEY);
  if (!str) {
    const project = newLocalProject();
    saveLocalProject(project);
    return project;
  }
  return JSON.parse(str);
}

/**
 * Saves the local project to local storage
 * @param project the local project to save
 * @returns {LocalProject} the saved local project
 */
export function saveLocalProject(project: LocalProject): LocalProject {
  localStorage.setItem(LOCAL_PROJECT_KEY, JSON.stringify(project));
  return project;
}

/**
 * Creates a new column
 * @param title Column title
 * @returns {LocalProject} the updated local project
 */
export function createColumn(
  project: LocalProject,
  title: string,
): LocalProject {
  const lastOrd = [...project.columns].sort(sortByOrd).at(-1)?.ord ?? 0;
  return {
    ...project,
    columns: [...project.columns, newColumn(title, lastOrd + 1)],
  };
}

/**
 * Updates a column
 * @param columnId the column id
 * @param updated the updated column
 * @returns {LocalProject} the updated local project
 */
export function updateColumn(
  project: LocalProject,
  columnId: number,
  updated: LocalColumn,
): LocalProject {
  return {
    ...project,
    columns: project.columns.map((c) => {
      if (c.id !== columnId) return c;
      return {
        ...c,
        ...updated,
      };
    }),
  };
}

/**
 * Swaps two columns
 * @param columnId the column id
 * @param direction the direction to swap
 * @returns {LocalProject} the updated local project
 */
export function swapColumn(
  project: LocalProject,
  columnId: number,
  direction: "left" | "right",
): LocalProject {
  const { columns } = project;

  const sortedColumns = [...columns].sort(sortByOrd);

  const currentIndex = sortedColumns.findIndex((c) => c.id === columnId);
  if (currentIndex === -1) return project;

  const swapIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
  if (swapIndex < 0 || swapIndex >= sortedColumns.length) return project;

  const currentColumn = sortedColumns[currentIndex];
  const swapColumn = sortedColumns[swapIndex];

  const updatedColumns = columns.map((c) => {
    if (c.id === currentColumn.id) {
      return {
        ...c,
        ord: swapColumn.ord,
      };
    }
    if (c.id === swapColumn.id) {
      return {
        ...c,
        ord: currentColumn.ord,
      };
    }
    return c;
  });

  return {
    ...project,
    columns: updatedColumns,
  };
}

/**
 * Deletes a column
 * @param columnId the column id
 * @returns {LocalProject} the updated local project
 */
export function deleteColumn(
  project: LocalProject,
  columnId: number,
): LocalProject {
  return {
    ...project,
    columns: project.columns.filter((c) => c.id !== columnId),
    tasks: project.tasks.filter((t) => t.columnId !== columnId),
  };
}

/**
 * Creates a new task
 * @param title Task title
 * @param columnId Task column
 * @returns {LocalProject} the updated local project
 */
export function createTask(
  project: LocalProject,
  columnId: number,
  title: string,
): LocalProject {
  const lastOrd =
    project.tasks
      .filter((t) => t.columnId === columnId)
      .sort(sortByOrd)
      .at(-1)?.ord ?? 0;
  return {
    ...project,
    tasks: [...project.tasks, newTask(title, lastOrd + 1, columnId)],
  };
}

/**
 * Deletes a task
 * @param taskId the task id
 * @returns {LocalProject} the updated local project
 */
export function deleteTask(
  project: LocalProject,
  taskId: number,
): LocalProject {
  return {
    ...project,
    tasks: project.tasks.filter((t) => t.id !== taskId),
  };
}

/**
 * Updates a task
 * @param taskId the task id
 * @param updated the updated task
 * @returns {LocalProject} the updated local project
 */
export function updateTask(
  project: LocalProject,
  taskId: number,
  updated: LocalTask,
): LocalProject {
  return {
    ...project,
    tasks: project.tasks.map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...updated,
        ...(t.columnId !== updated.columnId
          ? updateTaskColumn(project, t, updated.columnId)
          : {}),
      };
    }),
  };
}

/**
 * Updates a task's column and moves it to the end of the column
 * @param task the task
 * @param columnId the column id to move the task to
 * @returns {LocalProject} the updated local project
 */
function updateTaskColumn(
  project: LocalProject,
  task: LocalTask,
  columnId: number,
): LocalTask {
  const lastOrd =
    project.tasks
      .filter((t) => t.columnId === columnId)
      .sort(sortByOrd)
      .at(-1)?.ord ?? 0;
  return {
    ...task,
    columnId,
    ord: lastOrd + 1,
  };
}

/**
 * Swaps two tasks
 * @param taskId the task id
 * @param direction the direction to swap
 * @returns {LocalProject} the updated local project
 */
export function swapTask(
  project: LocalProject,
  taskId: number,
  direction: "up" | "down",
): LocalProject {
  const columnId = project.tasks.find((task) => task.id === taskId)?.columnId;
  if (columnId === undefined) return project;

  const tasksInColumn = project.tasks.filter(
    (task) => task.columnId === columnId,
  );
  const sortedTasks = tasksInColumn.sort(sortByOrd);

  const currentIndex = sortedTasks.findIndex((task) => task.id === taskId);
  if (currentIndex === -1) return project;

  const canMoveUp = currentIndex !== 0 && direction === "up";
  const canMoveDown =
    currentIndex !== sortedTasks.length - 1 && direction === "down";
  if (!canMoveUp && !canMoveDown) return project;

  const swapIndex = canMoveUp ? currentIndex - 1 : currentIndex + 1;
  const currentTask = sortedTasks[currentIndex];
  const swapTask = sortedTasks[swapIndex];

  const updatedTasks = project.tasks.map((task) => {
    if (task.id === currentTask.id) {
      return {
        ...task,
        ord: swapTask.ord,
      };
    } else if (task.id === swapTask.id) {
      return {
        ...task,
        ord: currentTask.ord,
      };
    } else {
      return task;
    }
  });

  return {
    ...project,
    tasks: updatedTasks,
  };
}

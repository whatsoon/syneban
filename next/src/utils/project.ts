import {
  Column,
  LocalColumn,
  LocalProject,
  LocalTask,
  Project,
  ProjectItem,
  Task,
} from "@/types/project";
import { SelectOption } from "@/types/components";
import { SiteName } from "./utils";

/**
 * Function to get task and column Id from a project
 * @param {Project} project - The project from which task and column Id need to be fetched
 * @param {number} id - The task Id
 * @returns {object | undefined} - The task and column Id if found, else undefined
 */
export function getTaskAndColumnId(
  project: Project,
  id: number,
): { task: Task; columnId: number } | undefined {
  for (const c of project.columns) {
    const task = c.tasks.find((t) => t.id === id);
    if (task) return { task, columnId: c.id };
  }
  return undefined;
}

/**
 * Function to get column options from a project
 * @param {Project} project - The project from which column options need to be fetched
 * @returns {SelectOption[]} - The column options
 */
export function getColumnOptions(project: Project): SelectOption[] {
  return project.columns
    .sort(sortByOrd)
    .map((c) => ({
      key: c.id,
      text: c.title,
      value: c.id.toString(),
    }));
}

/**
 * Function to validate an Id
 * @param {string} id - The Id that needs to be validated
 * @returns {number | false} - The validated Id if it is a number, else false
 */
export function validateId(id: string): number | false {
  const numberId = Number(id);
  return Number.isInteger(numberId) ? numberId : false;
}

/**
 * Function to prepend a title with site name
 * @param {string} title - The title that needs to be prepended
 * @returns {string} - The prepended title
 */
export function prependedTitle(title: string): string {
  return `${SiteName} - ${title}`;
}

// Local project item
export const LocalProjectItem: ProjectItem = {
  id: -1,
  title: "🏠 Local",
};

// Empty local project
export const EmptyLocalProject: LocalProject = {
  id: -1,
  columns: [],
  createdAt: new Date(),
  tasks: [],
  title: "Local",
  updatedAt: new Date(),
};

/**
 * Function to get project route
 * @param {number} id - The Id of the project
 * @returns {string} - The project route
 */
export function getProjectRoute(id: number) {
  return `/project/${id === -1 ? "local" : id}`;
}

/**
 * Function to get task edit route
 * @param {number} projectId - The Id of the project
 * @param {number} taskId - The Id of the task
 * @returns {string} - The task edit route
 */
export function taskEditRoute(projectId: number, taskId: number) {
  return `${getProjectRoute(projectId)}/task/${taskId}`;
}

/**
 * Function to sort by ord
 * @param {T} a - The first item to compare
 * @param {T} b - The second item to compare
 * @returns {number} - The difference of ord values
 */
export function sortByOrd<T extends LocalColumn | LocalTask | Column | Task>(
  a: T,
  b: T,
): number {
  return a.ord - b.ord;
}

/**
 * Function to convert local columns to columns
 * @param {LocalProject} project - The local project from which columns need to be converted
 * @returns {Column[]} - The converted columns
 */
export function localColumnsToColumns(project: LocalProject): Column[] {
  return project.columns.map((c) => ({
    id: c.id,
    ord: c.ord,
    title: c.title,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    tasks: project.tasks.filter((t) => t.columnId === c.id).sort(sortByOrd),
  }));
}

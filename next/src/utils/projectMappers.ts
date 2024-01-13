import {
  LocalProject,
  Project,
  ProjectItem,
  ProjectItemDto,
} from "@/types/project";
import { localColumnsToColumns } from "./project";

/**
 * Converts a ProjectItemDto to a ProjectItem object.
 *
 * @param {ProjectItemDto} project - The ProjectItemDto to be converted.
 *
 * @returns {ProjectItem | undefined} - The converted ProjectItem object, or undefined if the input is undefined.
 */
export function ProjectItemDtoToProjectItem(
  project?: ProjectItemDto,
): ProjectItem | undefined {
  if (!project) {
    return undefined;
  }
  const createdAt = new Date(project.createdAt);
  const updatedAt = project.updatedAt ? new Date(project.updatedAt) : undefined;
  return {
    id: project.id,
    title: project.title,
    createdAt: createdAt,
    updatedAt: updatedAt,
    formattedCreatedAt: createdAt.toLocaleString(),
    formattedUpdatedAt: updatedAt?.toLocaleString(),
  };
}

/**
 * Converts a LocalProject to a Project object.
 *
 * @param {LocalProject} project - The LocalProject object to be converted.
 *
 * @returns {Project | undefined} - The converted Project object, or undefined if the input is undefined.
 */
export function LocalProjectToProject(
  project?: LocalProject,
): Project | undefined {
  if (!project) {
    return undefined;
  }
  return {
    id: project.id,
    title: project.title,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    users: [],
    columns: localColumnsToColumns(project),
  };
}

"use client";

import ProjectLinkItem from "./ProjectLinkItem";
import { LocalProjectItem, getProjectRoute } from "@/utils/project";
import NewProjectButton from "./NewProjectButton";
import {
  executeWithLoading,
  useAppDispatchContext,
} from "@/contexts/App/appContext";
import { useProjectList } from "@/swr/useProjectList";
import { useUser } from "@/swr/useUser";
import { fetchDeleteBoard } from "@/utils/projectRequests";
import { list } from "postcss";

export default function ProjectsList() {
  const { isError, isLoading } = useUser();
  const { projectList, mutate } = useProjectList(!isError && !isLoading);
  const appDispatch = useAppDispatchContext();

  async function onProjectDelete(projectId: number) {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchDeleteBoard(projectId);
      if (res.ok) {
        await mutate();
      }
    });
  }

  return (
    <div className="flex flex-col">
      <ProjectLinkItem
        title={LocalProjectItem.title}
        href={getProjectRoute(LocalProjectItem.id)}
      />
      {projectList
        ?.sort()
        .map((project) => (
          <ProjectLinkItem
            key={project.id}
            title={project.title}
            subtitle={project.formattedCreatedAt}
            href={getProjectRoute(project.id)}
            onDelete={() => onProjectDelete(project.id)}
          />
        ))}
      {list && <NewProjectButton />}
    </div>
  );
}

import { ProjectItem } from "@/types/project";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "./swr";
import { ProjectItemDtoToProjectItem } from "@/utils/projectMappers";

/** Fetches project list from server */
export function useProjectList(shouldFetch: boolean): {
  projectList: ProjectItem[] | undefined;
  isLoading: boolean;
  isError: any;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/board" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return {
    projectList: data?.map(ProjectItemDtoToProjectItem),
    isLoading,
    isError: error,
    mutate,
  };
}

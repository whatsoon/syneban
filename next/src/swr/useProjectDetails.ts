import { Project } from "@/types/project";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "./swr";

/** Fetches project details from server */
export function useProjectDetails(
  shouldFetch: boolean,
  id: number,
): {
  project: Project | undefined;
  isLoading: boolean;
  isError: any;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/board/${id}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return {
    project: data,
    isLoading,
    isError: error,
    mutate,
  };
}

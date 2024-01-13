import { User } from "@/types/project";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "./swr";

/** Fetches user from server */
export function useUser(): {
  user: User;
  isLoading: boolean;
  isError: any;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}

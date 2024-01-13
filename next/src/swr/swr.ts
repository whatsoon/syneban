import UnauthenticatedError from "@/errors/UnauthenticatedError";

/** @see https://swr.vercel.app */
export const fetcher = async (
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) => {
  const res = await fetch(input, init);

  if (!res.ok) {
    if (res.status === 401) {
      const refresh = await fetch("/api/refresh", { method: "post" });
      if (!refresh.ok) throw new UnauthenticatedError();

      const newRes = await fetch(input, init);
      if (newRes.ok) return res.json();
    }
    throw new Error("Something went wrong");
  }

  return res.json();
};

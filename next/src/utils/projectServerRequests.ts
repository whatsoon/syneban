import { cookies } from "next/headers";

/**
 * Retrieves the title of a board from the server.
 * 
 * @param id - The ID of the board.
 * @returns A Promise that resolves to the board title or null if not found.
 */
export const getBoardTitle: (id: number) => Promise<string | null> = async (id: number) => {
  const res = await fetch(`${process.env.API_HOST}/api/board/${id}`, {
    headers: {
      cookie: cookies().toString(),
    }
  });
  if (!res.ok) return null;

  const { title } = await res.json();
  return title;
}
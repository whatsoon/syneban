import { cookies } from "next/headers";

/**
 * Retrieves the title of a board from the server.
 * 
 * @param id - The ID of the board.
 * @returns A Promise that resolves to the board title or null if not found.
 */
export const getBoardTitle: (id: number) => Promise<string | null> = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/board/${id}`, {
    headers: {
      Cookie: cookies()
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  });
  if (!res.ok) return null;

  const { title } = await res.json();
  return title;
}
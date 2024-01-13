/**
 * Utility function for debouncing a callback function.
 */
export function debounce(callback: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  }
}

export const SiteName = process.env.NEXT_PUBLIC_SITE_NAME || "Syneban";
export const SiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SiteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Simple Kanban Board App";
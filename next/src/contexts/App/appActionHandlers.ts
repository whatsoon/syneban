import { AppState } from "./appContext";

/**
 * Toggles the drawer
 * @param appContext the current app context
 * @returns the new app context
 */
export function toggleDrawer(appContext: AppState): AppState {
  return {
    ...appContext,
    drawerOpen: !appContext.drawerOpen,
  };
}

/**
 * Sets the loading state to true
 * @param appContext the current app context
 * @returns the new app context
 */
export function loading(appContext: AppState): AppState {
  return {
    ...appContext,
    loading: true,
  };
}

/**
 * Sets the loading state to false
 * @param appContext the current app context
 * @returns the new app context
 */
export function loaded(appContext: AppState): AppState {
  return {
    ...appContext,
    loading: false,
  };
}

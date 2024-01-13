"use client";

import { Dispatch, createContext, useContext, useReducer } from "react";
import { loaded, loading, toggleDrawer } from "./appActionHandlers";

/** The state of the app */
export interface AppState {
  drawerOpen: boolean;
  loading: boolean;
}

/** The default app state */
const defaultState: AppState = {
  drawerOpen: false,
  loading: false,
};

/** The context for the app state */
const AppContext = createContext(defaultState);
/** The context for dispatching actions */
const AppDispatchContext = createContext<Dispatch<AppActionType>>(() => {});

/** A hook for accessing the app state */
export const useAppContext = () => useContext(AppContext);
/** A hook for dispatching actions */
export const useAppDispatchContext = () => useContext(AppDispatchContext);

/** The provider for the app state */
export function AppStateProvider({ children }: { children?: React.ReactNode }) {
  const [appState, dispatch] = useReducer(appReducer, defaultState);
  return (
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

/** Executes a function with loading */
export async function executeWithLoading(
  dispatch: (value: AppActionType) => void,
  run: () => Promise<void>,
) {
  dispatch({ type: "loading" });
  try {
    await run();
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: "loaded" });
  }
}

/** The reducer for the app state */
function appReducer(state: AppState, action: AppActionType): AppState {
  switch (action.type) {
    case "toggleDrawer":
      return toggleDrawer(state);
    case "loading":
      return loading(state);
    case "loaded":
      return loaded(state);
  }
}

/** An action type */
type AppActionType = {
  type: "toggleDrawer" | "loading" | "loaded";
};

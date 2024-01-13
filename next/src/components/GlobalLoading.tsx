"use client";

import { useAppContext } from "@/contexts/App/appContext";
import Spinner from "./Spinner";

export default function GlobalLoading() {
  const appState = useAppContext();

  if (!appState.loading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center bg-black/50">
      <Spinner textColorClass="text-white" />
    </div>
  );
}

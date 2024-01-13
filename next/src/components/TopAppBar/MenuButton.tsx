"use client";

import { useAppDispatchContext } from "@/contexts/App/appContext";
import IconButton from "../Buttons/IconButton";

export default function MenuButton() {
  const appDispatch = useAppDispatchContext();

  function onToggleDrawer() {
    appDispatch({
      type: "toggleDrawer",
    });
  }

  return (
    <IconButton icon="menu" onClick={onToggleDrawer} />
  )
}
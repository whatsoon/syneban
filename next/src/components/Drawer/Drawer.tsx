"use client";

import { useUser } from "@/swr/useUser";
import Spinner from "../Spinner";
import DrawerItem from "./DrawerItem";
import GoogleLoginButton from "../GoogleLoginButton";
import {
  useAppContext,
  useAppDispatchContext,
} from "@/contexts/App/appContext";
import { useRouter } from "next/navigation";

export default function Drawer() {
  const appState = useAppContext();
  const appDispatch = useAppDispatchContext();

  function onClose() {
    appDispatch({
      type: "toggleDrawer",
    });
  }

  return (
    <>
      <div
        className={
          "fixed left-0 top-0 z-40 flex h-screen min-w-72 max-w-96 flex-col rounded-r-2xl bg-slate-100 p-3 transition-transform " +
          (appState.drawerOpen ? "transform-none" : "-translate-x-full")
        }
      >
        <Content />
      </div>
      {appState.drawerOpen && (
        <div
          className="fixed left-0 top-0 z-30 h-screen w-screen bg-black/50"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

function Content() {
  const { user, isError, isLoading, mutate } = useUser();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <>
        <DrawerItem text="Account" />
        <GoogleLoginButton />
      </>
    );
  if (user) {
    const onLogout = async () => {
      const res = await fetch("/api/logout", {
        method: "post",
      });
      if (res.ok) {
        await mutate();
        router.replace("/");
      }
    };
    return (
      <>
        <DrawerItem text={user.email} icon="account_circle" />
        <DrawerItem text="Logout" icon="logout" onClick={onLogout} />
      </>
    );
  }
}
